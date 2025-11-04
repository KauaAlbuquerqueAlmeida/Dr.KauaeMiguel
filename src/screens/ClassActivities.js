import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClassActivities({ route, navigation }) {
  const { classId, className } = route.params;
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const savedActivities = await AsyncStorage.getItem('activities');
        const parsed = savedActivities ? JSON.parse(savedActivities) : [];
        const classActivities = parsed.filter(a => a.classId === classId);
        setActivities(classActivities);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar as atividades.');
      }
    };

    const unsubscribe = navigation.addListener('focus', loadActivities);
    return unsubscribe;
  }, [navigation, classId]);

  const renderItem = ({ item }) => (
    <View style={styles.activityCard}>
      <Text style={styles.activityTitle}>{item.title}</Text>
      {item.description ? (
        <Text style={styles.activityDesc}>{item.description}</Text>
      ) : null}
      {item.dueDate ? (
        <Text style={styles.dueDate}>Entrega: {item.dueDate}</Text>
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
          keyExtractor={item => item.id}
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