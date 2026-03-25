
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SensorCard({ label, value, unit, color = '#00d4ff', icon }) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>
        {value != null ? value : '—'}
        <Text style={styles.unit}> {unit}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, backgroundColor: '#1a1f2e', borderRadius: 16,
    padding: 16, margin: 6, borderLeftWidth: 4,
  },
  icon:  { fontSize: 24, marginBottom: 4 },
  label: { color: '#8892a4', fontSize: 12, marginBottom: 4 },
  value: { fontSize: 26, fontWeight: 'bold' },
  unit:  { fontSize: 14, color: '#8892a4' },
});
