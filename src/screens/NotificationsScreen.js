
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function NotificationsScreen({ notifications }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔔 Alertas</Text>
      <FlatList
        data={notifications}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.msg}>{item.mensaje}</Text>
            <Text style={styles.date}>{new Date(item.fecha || item.createdAt).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Sin alertas recientes</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117', padding: 16 },
  title:     { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  item:      { backgroundColor: '#1a1f2e', borderRadius: 12, padding: 14, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: '#f59e0b' },
  msg:       { color: '#fff', fontWeight: '600' },
  date:      { color: '#8892a4', fontSize: 11, marginTop: 4 },
  empty:     { color: '#8892a4', textAlign: 'center', marginTop: 40 },
});
