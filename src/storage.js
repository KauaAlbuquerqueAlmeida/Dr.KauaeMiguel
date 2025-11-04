import { supabase } from './supabase'

// 🔹 Retorna o usuário atualmente logado
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Erro ao obter usuário:', error)
    return null
  }
  return data.user
}

// 🔹 Lista turmas criadas por um professor
export async function listClassesByProfessor(professorId) {
  const { data, error } = await supabase
    .from('turmas')
    .select('*')
    .eq('id_professor', professorId)

  if (error) {
    console.error('Erro ao buscar turmas:', error)
    return []
  }

  return data || []
}

// 🔹 Exclui uma turma pelo ID
export async function deleteClass(classId) {
  const { error } = await supabase
    .from('turmas')
    .delete()
    .eq('id', classId)

  if (error) {
    console.error('Erro ao excluir turma:', error)
  }
}

// 🔹 (Opcional) Verifica se turma tem atividades
export async function classHasActivities(classId) {
  const { data, error } = await supabase
    .from('atividades')
    .select('id')
    .eq('turma_id', classId)

  if (error) {
    console.error('Erro ao verificar atividades:', error)
    return false
  }

  return data.length > 0
}

export async function ensureInitialData() {
  console.log('🔹 ensureInitialData rodando...');
  await AsyncStorage.clear();
  console.log('🧹 AsyncStorage limpo');
}

// 🔹 Logout
export async function logout() {
  await supabase.auth.signOut()
}