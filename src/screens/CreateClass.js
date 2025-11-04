import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../supabase';

export default function CreateClass({ navigation }) {
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Erro ao obter usuário:', error.message);
      } else {
        setProfessor(data.user);
      }
    }
    loadUser();
  }, []);

  async function handleCreate() {
    if (!nome.trim() || !numero.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (!professor) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    const { error } = await supabase.from('turmas').insert([
      {
        nome,
        numero: parseInt(numero),
        id_professor: id_professor, // 🔹 RELAÇÃO COM O PROFESSOR LOGADO
      },
    ]);

    if (error) {
      console.error('Erro ao criar turma:', error.message);
      Alert.alert('Erro', 'Não foi possível criar a turma.');
    } else {
      Alert.alert('Sucesso', 'Turma criada com sucesso!');
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Nova Turma</Text>

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

      <Button title="Salvar Turma" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});