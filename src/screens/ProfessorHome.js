import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { logout, getCurrentUser, listClassesByProfessor, deleteClass, classHasActivities } from '../storage';

export default function ProfessorHome({ navigation }) {
  const [professor, setProfessor] = useState(null);
  const [classes, setClasses] = useState([]);

  // 🔹 Carrega os dados do professor e as turmas
  useEffect(() => {
    async function loadData() {
      const user = await getCurrentUser();
      setProfessor(user);
      if (user) {
        const list = await listClassesByProfessor(user.id);
        setClasses(list);
      }
    }
    loadData();
  }, []);

  async function handleLogout() {
    await logout();
    navigation.replace('Login');
  }

  async function load() {
    if (professor) {
      const list = await listClassesByProfessor(professor.id);
      setClasses(list);
    }
  }

  async function handleDelete(classId) {
    const has = await classHasActivities(classId);
    if (has) {
      Alert.alert('Aviso', 'Você não pode excluir uma turma com atividades cadastradas');
      return;
    }

    Alert.alert('Confirmar', 'Deseja realmente excluir esta turma?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: async () => { await deleteClass(classId); load(); } }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Olá, {professor ? professor.name : 'Professor'}</Text>
      <Button title="Sair" onPress={handleLogout} />

      <View style={{ height: 12 }} />
      <Button title="Cadastrar Turma" onPress={() => navigation.navigate('CreateClass')} />

      <Text style={styles.section}>Suas turmas</Text>
      <FlatList
        data={classes}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>Nenhuma turma cadastrada</Text>}
        renderItem={({ item, index }) => (
          <View style={styles.classRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700' }}>{index + 1} - {item.name}</Text>
            </View>
            <Button
              title="Visualizar"
              onPress={() => navigation.navigate('ClassActivities', { classId: item.id, className: item.name })}
            />
            <View style={{ width: 8 }} />
            <Button
              title="Excluir"
              color="#cc0000"
              onPress={() => handleDelete(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  section: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  classRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
});