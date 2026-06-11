import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useNotificationStore } from '../context/notificationStore';
import { Notificacao } from '../types';

interface NotificacoesScreenProps {
  usuarioId: string;
}

export function NotificacoesScreen({ usuarioId }: NotificacoesScreenProps) {
  const notificacoes = useNotificationStore(state => state.notificacoes);
  const markAsRead = useNotificationStore(state => state.markAsRead);
  const markAllAsRead = useNotificationStore(
    state => state.markAllAsRead
  );
  const deleteNotificacao = useNotificationStore(
    state => state.deleteNotificacao
  );
  const unreadCount = notificacoes.filter(n => !n.lida).length;

  useEffect(() => {
    useNotificationStore.setState(state => ({
      notificacoes: state.notificacoes.filter(n => n.usuario_id === usuarioId)
    }));
  }, [usuarioId]);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'alerta':
        return '#f44336';
      case 'conclusao':
        return '#4caf50';
      case 'pendencia':
        return '#ff9800';
      case 'info':
        return '#2196f3';
      default:
        return '#999';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'alerta':
        return 'Alerta';
      case 'conclusao':
        return 'Conclusão';
      case 'pendencia':
        return 'Pendência';
      case 'info':
        return 'Informação';
      default:
        return tipo;
    }
  };

  const renderNotificacao = ({ item }: { item: Notificacao }) => (
    <TouchableOpacity
      style={[
        styles.notificacaoCard,
        !item.lida && styles.notificacaoCardUnread
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificacaoLeft}>
        <View
          style={[
            styles.tipoBadge,
            { backgroundColor: getTipoColor(item.tipo) }
          ]}
        >
          <Text style={styles.tipoLabel}>
            {getTipoLabel(item.tipo).charAt(0)}
          </Text>
        </View>
      </View>

      <View style={styles.notificacaoContent}>
        <View style={styles.notificacaoHeader}>
          <Text style={styles.notificacaoTitulo}>{item.titulo}</Text>
          {!item.lida && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificacaoMensagem}>{item.mensagem}</Text>
        <Text style={styles.notificacaoData}>{item.data}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotificacao(item.id)}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificações</Text>
        {unreadCount > 0 && (
          <TouchableOpacity
            onPress={markAllAsRead}
            style={styles.markAllButton}
          >
            <Text style={styles.markAllButtonText}>
              Marcar todas como lidas
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {notificacoes.length > 0 ? (
        <FlatList
          data={notificacoes}
          renderItem={renderNotificacao}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Nenhuma notificação</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1976d2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  markAllButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  markAllButtonText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500'
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  notificacaoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 8,
    marginBottom: 8,
    alignItems: 'center',
    gap: 12
  },
  notificacaoCardUnread: {
    backgroundColor: '#f0f7ff',
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3'
  },
  notificacaoLeft: {
    justifyContent: 'center'
  },
  tipoBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tipoLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  notificacaoContent: {
    flex: 1
  },
  notificacaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  notificacaoTitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196f3',
    marginLeft: 8
  },
  notificacaoMensagem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    lineHeight: 16
  },
  notificacaoData: {
    fontSize: 11,
    color: '#999'
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold'
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999'
  }
});
