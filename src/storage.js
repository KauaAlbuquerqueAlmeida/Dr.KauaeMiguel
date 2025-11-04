import AsyncStorage from '@react-native-async-storage/async-storage';


async function getJSON(key, defaultValue) {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}

async function setJSON(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}


const SESSION_KEY = 'session';
const USERS_KEY = 'users';
const CLASSES_KEY = 'classes';
const ACTIVITIES_KEY = 'activities';


export async function getCurrentUser() {
  const s = await getJSON(SESSION_KEY, null);
  if (!s) return null;
  const users = await getJSON(USERS_KEY, []);
  return users.find(u => u.id === s.userId) || null;
}


export async function logout() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function createClass(name, professorId) {
  const classes = await getJSON(CLASSES_KEY, []);
  const id = 'class_' + Date.now();
  classes.push({ id, name, professorId });
  await setJSON(CLASSES_KEY, classes);
  return id;
}

export async function listClassesByProfessor(professorId) {
  const classes = await getJSON(CLASSES_KEY, []);
  return classes.filter(c => c.professorId === professorId);
}

export async function deleteClass(classId) {
  const classes = await getJSON(CLASSES_KEY, []);
  const newList = classes.filter(c => c.id !== classId);
  await setJSON(CLASSES_KEY, newList);
}


export async function createActivity(classId, description) {
  const activities = await getJSON(ACTIVITIES_KEY, []);
  const id = 'act_' + Date.now();
  activities.push({ id, classId, description });
  await setJSON(ACTIVITIES_KEY, activities);
  return id;
}

export async function listActivitiesByClass(classId) {
  const activities = await getJSON(ACTIVITIES_KEY, []);
  return activities.filter(a => a.classId === classId);
}

export async function deleteActivity(activityId) {
  const activities = await getJSON(ACTIVITIES_KEY, []);
  const newList = activities.filter(a => a.id !== activityId);
  await setJSON(ACTIVITIES_KEY, newList);
}

export async function classHasActivities(classId) {
  const activities = await listActivitiesByClass(classId);
  return activities.length > 0;
}

export async function ensureInitialData() {
  try {
    const keys = ['users', 'classes', 'activities'];
    
    for (const key of keys) {
      const existing = await AsyncStorage.getItem(key);
      if (!existing) {
        await AsyncStorage.setItem(key, JSON.stringify([]));
      }
    }

    const session = await AsyncStorage.getItem('session');
    if (!session) {
      await AsyncStorage.setItem('session', JSON.stringify(null));
    }

    console.log('Dados iniciais garantidos!');
  } catch (error) {
    console.error('Erro ao garantir dados iniciais:', error);
  }
}