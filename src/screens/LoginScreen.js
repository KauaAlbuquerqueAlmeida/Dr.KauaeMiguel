import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { authenticate, getSession } from '../storage';


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function tryLogin() {
        const user = await authenticate(email.trim(), password);
        if (user) {
            navigation.replace('ProfessorHome');
        } else {
            Alert.alert('Erro', 'E-mail ou senha inválidos');
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dr.KauaeMiguel</Text>
            <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
            <TextInput placeholder="Senha" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
            <Button title="Entrar" onPress={tryLogin} />
            <Text style={styles.hint}>Use: professor@escola.com / 123456 (usuário inicial)</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
    input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 12 },
    hint: { marginTop: 16, color: '#666', textAlign: 'center' }
});