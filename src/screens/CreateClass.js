import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateClass({ navigation }) {
  const [className, setClassName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [description, setDescription] = useState('');

  const handleSaveClass = async () => {
    if (!className.trim() || !teacherName.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome da turma e do professor.');
      return;
    }

    try {
      const newClass = {
        id: Date.now().toString(),
        name: className.trim(),
        teacher: teacherName.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString(),
      };

      // Obtém turmas salvas
      const existingClasses = await AsyncStorage.getItem('classes');
      const classes = existingClasses ? JSON.parse(existingClasses) : [];

      // Adiciona nova turma
      classes.push(newClass);
      await AsyncStorage.setItem('classes', JSON.stringify(classes));

      Alert.alert('Sucesso', 'Turma criada com sucesso!');
      navigation.goBack(); // retorna à tela anterior (geralmente lista de turmas)
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar a turma.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar Nova Turma</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome da turma"
          value={className}
          onChangeText={setClassName}
        />

        <TextInput
          style={styles.input}
          placeholder="Nome do professor"
          value={teacherName}
          onChangeText={setTeacherName}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição (opcional)"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Button title="Salvar Turma" onPress={handleSaveClass} />
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