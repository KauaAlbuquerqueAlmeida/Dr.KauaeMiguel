import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../supabase';

export default function EditClass({ route, navigation }) {
  const { turma } = route.params;
  const [nome, setNome] = useState(turma.nome);
  const [numero, setNumero] = useState(String(turma.numero));

  async function handleUpdate() {
    if (!nome.trim() || !numero.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const { error } = await supabase
      .from('turmas')
      .update({ nome, numero: parseInt(numero) })
      .eq('id', turma.id);

    if (error) {
      console.error('Erro ao atualizar turma:', error.message);
      Alert.alert('Erro', 'Não foi possível atualizar a turma.');
    } else {
      Alert.alert('Sucesso', 'Turma atualizada com sucesso!');
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Turma</Text>

      <TextInput
        placeholder="Número da Turma"
        keyboardType="numeric"
        value={numero}
        onChangeText={setNumero}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome da Turma"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});