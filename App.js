import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import ProfessorHome from './src/screens/ProfessorHome';
import CreateClass from './src/screens/CreateClass';
import ClassActivities from './src/screens/ClassActivities';
import CreateActivity from './src/screens/CreateActivity';
import { ensureInitialData } from './src/storage';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    async function init() {
      console.log('✅ App iniciado — chamando ensureInitialData...');
      await ensureInitialData();
      console.log('✅ ensureInitialData finalizado.');
    }
    init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Entrar' }}
        />
        <Stack.Screen
          name="ProfessorHome"
          component={ProfessorHome}
          options={{ title: 'Painel do Professor' }}
        />
        <Stack.Screen
          name="CreateClass"
          component={CreateClass}
          options={{ title: 'Cadastrar Turma' }}
        />
        <Stack.Screen
          name="ClassActivities"
          component={ClassActivities}
          options={{ title: 'Atividades da Turma' }}
        />
        <Stack.Screen
          name="CreateActivity"
          component={CreateActivity}
          options={{ title: 'Cadastrar Atividade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
