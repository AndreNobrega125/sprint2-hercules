import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList
} from 'react-native';
import { useDataStore } from '../context/dataStore';
import { useAuthStore } from '../context/authStore';
import { Trecho } from '../types';

interface DashboardFiscalProps {
  onNavigate?: (screen: string, params?: any) => void;
}

export function DashboardFiscal({ onNavigate }: DashboardFiscalProps) {
  const user = useAuthStore(state => state.user);
  const trechos = useDataStore(state => state.trechos);

  const stats = useMemo(() => {
    const total = trechos.length;
    const criticos = trechos.filter(t => t.status === 'critico');
    const atencao = trechos.filter(t => t.status === 'atencao');
    const pendentes = [...criticos, ...atencao];

    return { total, criticos, atencao, pendentes };
  }, [trechos]);

  const renderTrechoItem = ({ item }: { item: Trecho }) => {
    const statusColor = {
      ok: '#4caf50',
      atencao: '#ff9800',
      critico: '#f44336'
    }[item.status];

    return (
      <TouchableOpacity
        style={styles.trechoCard}
        onPress={() => onNavigate?.('trechoDetalhe', { trechoId: item.id })}
      >
        <View style={styles.trechoHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.trechoCodigo}>{item.codigo}</Text>
            <Text style={styles.trechoEndereco} numberOfLines={1}>
              {item.endereco}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColor }
            ]}
          >
            <Text style={styles.statusText}>
              {item.altura_atual}cm
            </Text>
          </View>
        </View>
        <View style={styles.trechoFooter}>
          <Text style={styles.municipio}>{item.municipio}</Text>
          <Text style={styles.dataVistoria}>
            Última: {item.data_ultima_vistoria}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, {user?.nome}!</Text>
          <Text style={styles.role}>Perfil: Fiscal de Inspeção</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo de Hoje</Text>

          <View style={styles.statGrid}>
            <View style={[styles.statCard, { backgroundColor: '#f44336' }]}>
              <Text style={styles.statValue}>{stats.criticos.length}</Text>
              <Text style={styles.statLabel}>Crítico</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#ff9800' }]}>
              <Text style={styles.statValue}>{stats.atencao.length}</Text>
              <Text style={styles.statLabel}>Atenção</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#4caf50' }]}>
              <Text style={styles.statValue}>{stats.total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>

        {stats.criticos.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trechos Críticos</Text>
              <Text style={styles.criticalCount}>{stats.criticos.length}</Text>
            </View>
            <FlatList
              scrollEnabled={false}
              data={stats.criticos}
              renderItem={renderTrechoItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}

        {stats.atencao.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trechos em Atenção</Text>
              <Text style={styles.attentionCount}>{stats.atencao.length}</Text>
            </View>
            <FlatList
              scrollEnabled={false}
              data={stats.atencao}
              renderItem={renderTrechoItem}
              keyExtractor={item => item.id}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onNavigate?.('novaVistoria')}
          >
            <Text style={styles.actionButtonText}>+ Nova Vistoria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#666' }]}
            onPress={() => onNavigate?.('trechos')}
          >
            <Text style={styles.actionButtonText}>Ver Todos os Trechos</Text>
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
    backgroundColor: '#2196f3',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  criticalCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f44336',
    backgroundColor: '#ffebee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  attentionCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff9800',
    backgroundColor: '#fff3e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  statGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12
  },
  statCard: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
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
  trechoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3'
  },
  trechoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  trechoCodigo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2
  },
  trechoEndereco: {
    fontSize: 12,
    color: '#666'
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold'
  },
  trechoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  municipio: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500'
  },
  dataVistoria: {
    fontSize: 11,
    color: '#999'
  },
  actionButton: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  }
});
