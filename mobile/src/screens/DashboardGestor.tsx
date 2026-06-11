import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useDataStore } from '../context/dataStore';
import { useAuthStore } from '../context/authStore';
import { useNotificationStore } from '../context/notificationStore';

interface DashboardGestorProps {
  onNavigate?: (screen: string) => void;
}

export function DashboardGestor({ onNavigate }: DashboardGestorProps) {
  const user = useAuthStore(state => state.user);
  const trechos = useDataStore(state => state.trechos);
  const intervencoes = useDataStore(state => state.intervencoes);
  const unreadCount = useNotificationStore(state => state.unreadCount);

  const stats = useMemo(() => {
    const total = trechos.length;
    const ok = trechos.filter(t => t.status === 'ok').length;
    const atencao = trechos.filter(t => t.status === 'atencao').length;
    const critico = trechos.filter(t => t.status === 'critico').length;
    const conformidade = Math.round((ok / total) * 100);
    const pendentes = intervencoes.filter(i => i.status === 'pendente').length;
    const emProgresso = intervencoes.filter(i => i.status === 'em_progresso').length;

    return { total, ok, atencao, critico, conformidade, pendentes, emProgresso };
  }, [trechos, intervencoes]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Bem-vindo, {user?.nome}!</Text>
          <Text style={styles.role}>Perfil: Gestor</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visão Geral</Text>

          <View style={styles.statGrid}>
            <View style={[styles.statCard, { backgroundColor: '#4caf50' }]}>
              <Text style={styles.statValue}>{stats.ok}</Text>
              <Text style={styles.statLabel}>OK</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#ff9800' }]}>
              <Text style={styles.statValue}>{stats.atencao}</Text>
              <Text style={styles.statLabel}>Atenção</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#f44336' }]}>
              <Text style={styles.statValue}>{stats.critico}</Text>
              <Text style={styles.statLabel}>Crítico</Text>
            </View>
          </View>

          <View style={styles.conformanceCard}>
            <Text style={styles.conformanceLabel}>Taxa de Conformidade</Text>
            <View style={styles.conformanceBar}>
              <View
                style={[
                  styles.conformanceProgress,
                  { width: `${stats.conformidade}%` }
                ]}
              />
            </View>
            <Text style={styles.conformanceValue}>{stats.conformidade}%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intervenções</Text>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionHeader}>
              <Text style={styles.actionTitle}>Pendentes</Text>
              <Text style={[styles.actionCount, { color: '#f44336' }]}>
                {stats.pendentes}
              </Text>
            </View>
            <Text style={styles.actionDesc}>
              Aguardando execução por equipes de trabalho
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionHeader}>
              <Text style={styles.actionTitle}>Em Progresso</Text>
              <Text style={[styles.actionCount, { color: '#ff9800' }]}>
                {stats.emProgresso}
              </Text>
            </View>
            <Text style={styles.actionDesc}>
              Sendo executadas em campo
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alertas & Notificações</Text>

          <TouchableOpacity
            style={styles.notificationCard}
            onPress={() => onNavigate?.('notifications')}
          >
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>{unreadCount}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.notificationTitle}>
                {unreadCount > 0
                  ? `${unreadCount} notificação${unreadCount !== 1 ? 's' : ''} não lida${unreadCount !== 1 ? 's' : ''}`
                  : 'Todas as notificações lidas'}
              </Text>
              <Text style={styles.notificationDesc}>
                Gerencie alertas e atualizações
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => onNavigate?.('trechos')}
          >
            <Text style={styles.quickActionText}>Ver Todos os Trechos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => onNavigate?.('report')}
          >
            <Text style={styles.quickActionText}>Gerar Relatório</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollView: {
    flex: 1
  },
  header: {
    padding: 20,
    backgroundColor: '#1976d2',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  role: {
    fontSize: 12,
    color: '#90caf9',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  statGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12
  },
  statCard: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500'
  },
  conformanceCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12
  },
  conformanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  conformanceBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8
  },
  conformanceProgress: {
    height: '100%',
    backgroundColor: '#4caf50'
  },
  conformanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50'
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336'
  },
  actionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  actionCount: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  actionDesc: {
    fontSize: 12,
    color: '#999'
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  notificationBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationCount: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2
  },
  notificationDesc: {
    fontSize: 12,
    color: '#999'
  },
  quickActionButton: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8
  },
  quickActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  }
});
