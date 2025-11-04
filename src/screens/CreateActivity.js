import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateActivity({ route, navigation }) {
  const { classId } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSaveActivity = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título da atividade é obrigatório.');
      return;
    }

    try {
      const newActivity = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate.trim(),
        createdAt: new Date().toISOString(),
        classId,
      };

      // Buscar atividades salvas
      const existingActivities = await AsyncStorage.getItem('activities');
      const activities = existingActivities ? JSON.parse(existingActivities) : [];

      // Adicionar nova atividade
      activities.push(newActivity);
      await AsyncStorage.setItem('activities', JSON.stringify(activities));

      Alert.alert('Sucesso', 'Atividade criada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar a atividade.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Nova Atividade</Text>

        <TextInput
          style={styles.input}
          placeholder="Título da atividade"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição (opcional)"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Data de entrega (ex: 10/11/2025)"
          value={dueDate}
          onChangeText={setDueDate}
        />

        <Button title="Salvar Atividade" onPress={handleSaveActivity} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});