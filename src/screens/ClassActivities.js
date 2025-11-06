import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../supabase'; // ✅ Import necessário!

export default function ClassActivities({ route, navigation }) {
  const { classId, className } = route.params;
  const [activities, setActivities] = useState([]);

  // ✅ Carrega atividades do Supabase
  const loadActivities = async () => {
    const { data, error } = await supabase
      .from('atividades')
      .select('*')
      .eq('turma_id', classId)   // ✅ pega só da turma certa
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Erro ao carregar atividades:', error);
      alert('Não foi possível carregar atividades.');
      return;
    }

    setActivities(data);
  };

  // ✅ Recarrega ao entrar na tela
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadActivities);
    return unsubscribe;
  }, [navigation, classId]);

  // ✅ Renderização de cada atividade
  const renderItem = ({ item }) => (
    <View style={styles.activityCard}>
      <Text style={styles.activityTitle}>{item.titulo}</Text>

      {item.descricao ? (
        <Text style={styles.activityDesc}>{item.descricao}</Text>
      ) : null}

      {item.data_entrega ? (
        <Text style={styles.dueDate}>Entrega: {item.data_entrega}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Atividades - {className}</Text>

      {activities.length === 0 ? (
        <Text style={styles.empty}>Nenhuma atividade cadastrada.</Text>
      ) : (
        <FlatList
          data={activities}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateActivity', { classId })}
      >
        <Text style={styles.addButtonText}>+ Nova Atividade</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 100,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  activityDesc: {
    fontSize: 14,
    color: '#555',
  },
  dueDate: {
    fontSize: 13,
    color: '#007AFF',
    marginTop: 6,
  },
  empty: {
    textAlign: 'center',
    color: '#777',
    marginTop: 50,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});