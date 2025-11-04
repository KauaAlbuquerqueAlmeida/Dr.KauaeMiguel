import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClassItem({ turma, onDelete, onView }) {
  const handleDelete = async () => {
    try {
      // Buscar atividades salvas
      const savedActivities = await AsyncStorage.getItem('activities');
      const activities = savedActivities ? JSON.parse(savedActivities) : [];

      // Verifica se essa turma tem atividades cadastradas
      const hasActivities = activities.some(a => a.classId === turma.id);

      if (hasActivities) {
        Alert.alert(
          'Aviso',
          'Você não pode excluir uma turma com atividades cadastradas.'
        );
        return;
      }

      Alert.alert(
        'Confirmação',
        `Deseja realmente excluir a turma "${turma.name}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Excluir', style: 'destructive', onPress: () => onDelete(turma.id) },
        ]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível verificar as atividades.');
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{turma.name}</Text>
        <Text style={styles.subtitle}>ID: {turma.id}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.viewButton} onPress={() => onView(turma)}>
          <Text style={styles.buttonText}>👁️ Ver</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  viewButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});