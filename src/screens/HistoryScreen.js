
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { LineChart } from 'victory-native';
import axios from 'axios';
import { API_URL } from '../config';

const RANGES = ['1h', '6h', '24h', '7d'];

export default function HistoryScreen() {
  const [range, setRange]   = useState('1h');
  const [data, setData]     = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/history?range=${range}&limit=100`)
      .then(r => setData(r.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [range]);

  const makePoints = (field) =>
    data.map((d, i) => ({ x: i, y: d[field] ?? 0 }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📈 Historial</Text>

      <View style={styles.rangePicker}>
        {RANGES.map(r => (
          <TouchableOpacity
            key={r}
            style={[styles.rangeBtn, range === r && styles.rangeBtnActive]}
            onPress={() => setRange(r)}
          >
            <Text style={{ color: range === r ? '#0d1117' : '#fff' }}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading
        ? <ActivityIndicator color="#00d4ff" style={{ marginTop: 40 }} />
        : <>
            <Text style={styles.chartLabel}>🌡️ Temperatura (°C)</Text>
            <LineChart
              data={makePoints('temperatura')}
              width={340} height={180}
              style={{ marginLeft: -20 }}
            />
            <Text style={styles.chartLabel}>🧪 pH</Text>
            <LineChart
              data={makePoints('ph')}
              width={340} height={180}
              style={{ marginLeft: -20 }}
            />
            <Text style={styles.chartLabel}>💧 Nivel (%)</Text>
            <LineChart
              data={makePoints('nivel')}
              width={340} height={180}
              style={{ marginLeft: -20 }}
            />
          </>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#0d1117', padding: 16 },
  title:          { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  rangePicker:    { flexDirection: 'row', gap: 8, marginBottom: 20 },
  rangeBtn:       { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#00d4ff' },
  rangeBtnActive: { backgroundColor: '#00d4ff' },
  chartLabel:     { color: '#8892a4', fontSize: 14, marginTop: 12, marginBottom: 4 },
});
