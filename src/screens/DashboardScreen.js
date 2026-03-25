
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SensorCard from '../components/SensorCard';
import PumpButton from '../components/PumpButton';

export default function DashboardScreen({ sensores, bomba, setBomba, connected }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌊 AquaMonitor</Text>
      <Text style={[styles.status, { color: connected ? '#00c896' : '#ef4444' }]}>
        {connected ? '● Conectado' : '● Desconectado'}
      </Text>

      <View style={styles.row}>
        <SensorCard label="Temperatura" value={sensores.temperatura} unit="°C" color="#ff6b6b" icon="🌡️" />
        <SensorCard label="pH"          value={sensores.ph}          unit=""    color="#a78bfa" icon="🧪" />
      </View>
      <View style={styles.row}>
        <SensorCard label="Nivel"       value={sensores.nivel}       unit="%"   color="#00d4ff" icon="💧" />
        <SensorCard label="Bomba"       value={bomba ? 'ON' : 'OFF'} unit=""    color={bomba ? '#00c896' : '#ef4444'} icon="⚙️" />
      </View>

      <PumpButton bomba={bomba} onToggle={setBomba} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117', padding: 12 },
  title:     { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 12, textAlign: 'center' },
  status:    { textAlign: 'center', marginBottom: 16, fontSize: 13 },
  row:       { flexDirection: 'row' },
});
