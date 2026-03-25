
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

export default function PumpButton({ bomba, onToggle }) {
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/cmd`, { bomba: !bomba });
      onToggle(data.bomba);
    } catch (e) {
      console.error('Error al cambiar bomba:', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.btn, bomba ? styles.on : styles.off]}
      onPress={toggle}
      disabled={loading}
    >
      {loading
        ? <ActivityIndicator color="#fff" />
        : <Text style={styles.txt}>{bomba ? '💧 Bomba ON' : '⏹ Bomba OFF'}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center', margin: 12 },
  on:  { backgroundColor: '#00c896' },
  off: { backgroundColor: '#ef4444' },
  txt: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
