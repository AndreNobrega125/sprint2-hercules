import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { useDataStore } from '../context/dataStore';
import { Trecho } from '../types';

interface ListaTrechosProps {
  onNavigate?: (screen: string, params?: any) => void;
}

export function ListaTrechos({ onNavigate }: ListaTrechosProps) {
  const trechos = useDataStore(state => state.trechos);
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState<'criticidade' | 'nome'>('criticidade');

  const trechosFiltrados = useMemo(() => {
    let resultado = trechos.filter(t =>
      t.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
      t.municipio.toLowerCase().includes(filtro.toLowerCase())
    );

    if (ordenacao === 'criticidade') {
      const ordem = { critico: 0, atencao: 1, ok: 2 };
      resultado = resultado.sort(
        (a, b) =>
          ordem[a.status as keyof typeof ordem] -
          ordem[b.status as keyof typeof ordem] ||
          b.altura_atual - a.altura_atual
      );
    } else {
      resultado = resultado.sort((a, b) =>
        a.codigo.localeCompare(b.codigo)
      );
    }

    return resultado;
  }, [trechos, filtro, ordenacao]);

  const statusColor = (status: string) => {
    switch (status) {
      case 'ok':
        return '#4caf50';
      case 'atencao':
        return '#ff9800';
      case 'critico':
        return '#f44336';
      default:
        return '#999';
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'ok':
        return 'OK';
      case 'atencao':
        return 'ATENÇÃO';
      case 'critico':
        return 'CRÍTICO';
      default:
        return status;
    }
  };

  const renderTrecho = ({ item }: { item: Trecho }) => (
    <TouchableOpacity
      style={styles.trechoCard}
      onPress={() => onNavigate?.('trechoDetalhe', { trechoId: item.id })}
    >
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.codigo}>{item.codigo}</Text>
          <Text style={styles.endereco} numberOfLines={2}>
            {item.endereco}
          </Text>
          <Text style={styles.municipio}>{item.municipio}</Text>
        </View>

        <View style={styles.statusSection}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColor(item.status) }
            ]}
          >
            <Text style={styles.statusText}>{statusLabel(item.status)}</Text>
          </View>
          <Text style={styles.altura}>{item.altura_atual}cm</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.kmInfo}>
          km {item.km_inicio.toFixed(1)} - {item.km_fim.toFixed(1)}
        </Text>
        <Text style={styles.dataVistoria}>
          {item.data_ultima_vistoria}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trechos Monitorados</Text>
        <Text style={styles.subtitle}>Total: {trechosFiltrados.length}</Text>
      </View>

      <View style={styles.controls}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar código ou município..."
          value={filtro}
          onChangeText={setFiltro}
          placeholderTextColor="#999"
        />

        <View style={styles.ordenacao}>
          <TouchableOpacity
            style={[
              styles.ordenacaoButton,
              ordenacao === 'criticidade' && styles.ordenacaoButtonActive
            ]}
            onPress={() => setOrdenacao('criticidade')}
          >
            <Text
              style={[
                styles.ordenacaoButtonText,
                ordenacao === 'criticidade' &&
                  styles.ordenacaoButtonTextActive
              ]}
            >
              Por Criticidade
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.ordenacaoButton,
              ordenacao === 'nome' && styles.ordenacaoButtonActive
            ]}
            onPress={() => setOrdenacao('nome')}
          >
            <Text
              style={[
                styles.ordenacaoButtonText,
                ordenacao === 'nome' && styles.ordenacaoButtonTextActive
              ]}
            >
              Por Nome
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={trechosFiltrados}
        renderItem={renderTrecho}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Nenhum trecho encontrado
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    padding: 16,
    backgroundColor: '#1976d2'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 12,
    color: '#90caf9'
  },
  controls: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 12,
    color: '#333'
  },
  ordenacao: {
    flexDirection: 'row',
    gap: 8
  },
  ordenacaoButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5'
  },
  ordenacaoButtonActive: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2'
  },
  ordenacaoButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center'
  },
  ordenacaoButtonTextActive: {
    color: '#fff'
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  trechoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  codigo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4
  },
  endereco: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4
  },
  municipio: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500'
  },
  statusSection: {
    alignItems: 'center',
    gap: 4
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 70
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  altura: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333'
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  kmInfo: {
    fontSize: 11,
    color: '#999'
  },
  dataVistoria: {
    fontSize: 11,
    color: '#999'
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999'
  }
});
