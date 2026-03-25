
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';

import useWebSocket from './src/hooks/useWebSocket';
import DashboardScreen     from './src/screens/DashboardScreen';
import HistoryScreen       from './src/screens/HistoryScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const { sensores, bomba, setBomba, connected, notifications } = useWebSocket();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle:           { backgroundColor: '#1a1f2e', borderTopColor: '#2d3748' },
            tabBarActiveTintColor: '#00d4ff',
            tabBarInactiveTintColor:'#8892a4',
            headerStyle:           { backgroundColor: '#0d1117' },
            headerTintColor:       '#fff',
          }}
        >
          <Tab.Screen
            name="Dashboard"
            options={{ tabBarIcon: () => <Text>🏠</Text> }}
          >
            {() => <DashboardScreen sensores={sensores} bomba={bomba} setBomba={setBomba} connected={connected} />}
          </Tab.Screen>

          <Tab.Screen
            name="Historial"
            component={HistoryScreen}
            options={{ tabBarIcon: () => <Text>📈</Text> }}
          />

          <Tab.Screen
            name="Alertas"
            options={{ tabBarIcon: () => <Text>🔔</Text>, tabBarBadge: notifications.length || null }}
          >
            {() => <NotificationsScreen notifications={notifications} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
