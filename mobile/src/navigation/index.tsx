import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../context/authStore';
import { useNotificationStore } from '../context/notificationStore';

import { LoginScreen } from '../screens/LoginScreen';
import { DashboardGestor } from '../screens/DashboardGestor';
import { DashboardFiscal } from '../screens/DashboardFiscal';
import { DashboardTrabalhador } from '../screens/DashboardTrabalhador';
import { ListaTrechos } from '../screens/ListaTrechos';
import { TrechoDetalhe } from '../screens/TrechoDetalhe';
import { NotificacoesScreen } from '../screens/NotificacoesScreen';
import { NovaVistoria } from '../screens/NovaVistoria';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function getTabColor(role: string) {
  switch (role) {
    case 'gestor':
      return '#1976d2';
    case 'fiscal':
      return '#2196f3';
    case 'trabalhador':
      return '#2e7d32';
    default:
      return '#666';
  }
}

function AppTabsGestor() {
  const user = useAuthStore(state => state.user);
  const initializeNotificacoes = useNotificationStore(
    state => state.initializeNotificacoes
  );
  const unreadCount = useNotificationStore(state => state.unreadCount);

  React.useEffect(() => {
    if (user) {
      initializeNotificacoes(user.id);
    }
  }, [user]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8
        }
      }}
    >
      <Tab.Screen
        name="DashboardGestor"
        component={DashboardGestor}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard'
        }}
      />
      <Tab.Screen
        name="ListaTrechosTab"
        component={ListaTrechos}
        options={{
          title: 'Trechos',
          tabBarLabel: 'Trechos'
        }}
      />
      <Tab.Screen
        name="NotificacoesTab"
        component={() =>
          user ? (
            <NotificacoesScreen usuarioId={user.id} />
          ) : null
        }
        options={{
          title: 'Notificações',
          tabBarLabel: 'Notificações',
          tabBarBadge: unreadCount > 0 ? unreadCount : null
        }}
      />
    </Tab.Navigator>
  );
}

function AppTabsFiscal() {
  const user = useAuthStore(state => state.user);
  const initializeNotificacoes = useNotificationStore(
    state => state.initializeNotificacoes
  );
  const unreadCount = useNotificationStore(state => state.unreadCount);

  React.useEffect(() => {
    if (user) {
      initializeNotificacoes(user.id);
    }
  }, [user]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8
        }
      }}
    >
      <Tab.Screen
        name="DashboardFiscal"
        component={DashboardFiscal}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard'
        }}
      />
      <Tab.Screen
        name="ListaTrechosTab"
        component={ListaTrechos}
        options={{
          title: 'Trechos',
          tabBarLabel: 'Trechos'
        }}
      />
      <Tab.Screen
        name="NotificacoesTab"
        component={() =>
          user ? (
            <NotificacoesScreen usuarioId={user.id} />
          ) : null
        }
        options={{
          title: 'Notificações',
          tabBarLabel: 'Notificações',
          tabBarBadge: unreadCount > 0 ? unreadCount : null
        }}
      />
    </Tab.Navigator>
  );
}

function AppTabsTrabalhador() {
  const user = useAuthStore(state => state.user);
  const initializeNotificacoes = useNotificationStore(
    state => state.initializeNotificacoes
  );
  const unreadCount = useNotificationStore(state => state.unreadCount);

  React.useEffect(() => {
    if (user) {
      initializeNotificacoes(user.id);
    }
  }, [user]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8
        }
      }}
    >
      <Tab.Screen
        name="DashboardTrabalhador"
        component={DashboardTrabalhador}
        options={{
          title: 'Minhas Tarefas',
          tabBarLabel: 'Tarefas'
        }}
      />
      <Tab.Screen
        name="ListaTrechosTab"
        component={ListaTrechos}
        options={{
          title: 'Trechos',
          tabBarLabel: 'Trechos'
        }}
      />
      <Tab.Screen
        name="NotificacoesTab"
        component={() =>
          user ? (
            <NotificacoesScreen usuarioId={user.id} />
          ) : null
        }
        options={{
          title: 'Notificações',
          tabBarLabel: 'Notificações',
          tabBarBadge: unreadCount > 0 ? unreadCount : null
        }}
      />
    </Tab.Navigator>
  );
}

function AppStack() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  const getTabsComponent = () => {
    switch (user.role) {
      case 'gestor':
        return AppTabsGestor;
      case 'fiscal':
        return AppTabsFiscal;
      case 'trabalhador':
        return AppTabsTrabalhador;
      default:
        return AppTabsFiscal;
    }
  };

  const TabsComponent = getTabsComponent();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: '600' },
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: getTabColor(user.role) }
      }}
    >
      <Stack.Screen
        name="AppTabs"
        component={TabsComponent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrechoDetalhe"
        component={({ route }: any) => (
          <TrechoDetalhe trechoId={route.params.trechoId} />
        )}
        options={{
          title: 'Detalhes do Trecho'
        }}
      />
      <Stack.Screen
        name="NovaVistoria"
        component={NovaVistoria}
        options={{
          title: 'Registrar Vistoria',
          headerRight: () => (
            <TouchableOpacity
              onPress={logout}
              style={{ marginRight: 16 }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>Sair</Text>
            </TouchableOpacity>
          )
        }}
      />
    </Stack.Navigator>
  );
}

import { TouchableOpacity, Text } from 'react-native';

export function RootNavigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
