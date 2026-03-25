import { useEffect, useRef, useState } from 'react';
import { WS_URL } from '../config';

export default function useWebSocket() {
  const ws = useRef(null);
  const [sensores, setSensores]       = useState({ temperatura: null, ph: null, nivel: null });
  const [bomba, setBomba]             = useState(false);
  const [connected, setConnected]     = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      setConnected(true);
      ws.current.send(JSON.stringify({ type: 'register', device: 'dashboard' }));
    };

    ws.current.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === 'sensor_data')  setSensores(msg.sensores);
      if (msg.type === 'state_sync')   { setBomba(msg.bomba); setSensores(msg.sensores); }
      if (msg.type === 'cmd')          setBomba(msg.bomba);
      if (msg.type === 'notification') setNotifications(p => [msg.data, ...p].slice(0, 50));
    };

    ws.current.onclose = () => setConnected(false);

    return () => ws.current?.close();
  }, []);

  return { sensores, bomba, setBomba, connected, notifications };
}
