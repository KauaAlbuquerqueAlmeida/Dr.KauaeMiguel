
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { supabase } from '../supabase';
useEffect(() => {
  async function testarConexao() {
    console.log('🔍 Testando conexão com Supabase...');

    const { data, error } = await supabase.from('turmas').select('*').limit(1);

    if (error) {
      console.error('❌ Erro ao conectar ao Supabase:', error.message);
    } else {
      console.log('✅ Conexão com Supabase OK:', data);
    }
  }

  testarConexao();
}, []);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function tryLogin() {
  console.log('Tentando login com Supabase:', email);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password,
  });

  if (error) {
    console.error('Erro no login:', error.message);
    Alert.alert('Erro', error.message);
    return;
  }

  const { user } = data;
  if (user) {
    console.log('✅ Login bem-sucedido:', user.email);
    navigation.replace('ProfessorHome');
  } else {
    Alert.alert('Erro', 'Falha ao autenticar.');
  }
}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dr.KauaeMiguel</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Entrar" onPress={tryLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 12 },
});
