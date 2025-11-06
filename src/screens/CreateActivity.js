import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { supabase } from '../supabase';

export default function CreateActivity({ route, navigation }) {
  const { classId } = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSaveActivity = async () => {
    if (!title.trim()) {
      alert('O título é obrigatório.');
      return;
    }

    try {
      const { error } = await supabase
        .from('atividades')
        .insert([
          {
            titulo: title.trim(),
            descricao: description.trim(),
            data_entrega: dueDate.trim(),
            turma_id: classId,     // ✅ liga atividade à turma correta
          }
        ]);

      if (error) {
        console.log('Erro ao salvar:', error);
        alert('Erro ao salvar atividade.');
        return;
      }

      alert('Atividade criada com sucesso!');
      navigation.goBack();

    } catch (err) {
      console.log(err);
      alert('Erro inesperado ao salvar.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <Text style={styles.title}>Nova Atividade</Text>

        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Data de entrega (opcional)"
          value={dueDate}
          onChangeText={setDueDate}
        />

        <Button title="Salvar Atividade" onPress={handleSaveActivity} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#aaa',
    borderRadius: 8, padding: 12, marginBottom: 14
  },
  textArea: {
    height: 100, textAlignVertical: 'top'
  }
});