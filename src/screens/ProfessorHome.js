import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { supabase } from '../supabase';

export default function ProfessorHome({ navigation }) {
  const [turmas, setTurmas] = useState([]);
  const [professor, setProfessor] = useState(null);

  // 🔹 Carrega o usuário logado e as turmas dele
  useEffect(() => {
    async function carregarDados() {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log('❌ Erro ao obter usuário:', error.message);
        return;
      }

      if (data?.user) {
        setProfessor(data.user);
        buscarTurmas(data.user.id);
      } else {
        console.log('⚠️ Nenhum usuário logado');
      }
    }

    carregarDados();
  }, []);

  // 🔹 Busca turmas do professor logado
  const buscarTurmas = async (professorId) => {
   const { data, error } = await supabase
  .from('turmas')
  .select('id, nome, numero')
  .eq('professor_id', user.id);

    if (error) {
      console.log('❌ Erro ao buscar turmas:', error.message);
    } else {
      console.log('📘 Turmas carregadas:', data);
      setTurmas(data || []);
    }
  };

  // 🔹 Excluir turma
  const excluirTurma = async (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir esta turma?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase.from('turmas').delete().eq('id', id);
            if (error) {
              console.log('Erro ao excluir turma:', error.message);
            } else {
              buscarTurmas(professor.id);
            }
          },
        },
      ]
    );
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Olá, {professor?.email || 'Professor'}</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('CreateClass')}>
        <Text style={styles.textoBotao}>CADASTRAR TURMA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, { backgroundColor: 'gray' }]} onPress={handleLogout}>
        <Text style={styles.textoBotao}>SAIR</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Suas turmas</Text>

      {turmas.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma turma cadastrada</Text>
      ) : (
        turmas.map((turma) => (
          <View key={turma.id} style={styles.item}>
            <Text style={styles.textoTurma}>
              {turma.numero ? `${turma.numero} - ` : ''}{turma.nome}
            </Text>

            <View style={styles.botoes}>
              <TouchableOpacity
                style={[styles.botao, { backgroundColor: '#2196F3' }]}
                onPress={() => navigation.navigate('ClassActivities', { turmaId: turma.id })}
              >
                <Text style={styles.textoBotao}>VISUALIZAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botao, { backgroundColor: 'red' }]}
                onPress={() => excluirTurma(turma.id)}
              >
                <Text style={styles.textoBotao}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  botao: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textoTurma: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});