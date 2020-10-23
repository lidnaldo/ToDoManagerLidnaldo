/**
  */
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image } from 'react-native';

import { App, Login, Register, ToDoTasks, DoneTasks, Task } from '../screens/Screens';
import React from 'react';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

// criando componente TaskTab com DUAS ABAS superiores deslizantes 
export const TaskTab = () => {
  return (
    // <Tab.Navigator tabBarOptions={{
    //   activeTintColor: 'tomato',
    //   inactiveTintColor: 'gray',
    //   iconStyle: { width: 20, height: 20 },
    // }}>
    <Tab.Navigator>
      <Tab.Screen name="To Do" component={ToDoTasks} />
      <Tab.Screen name="Done" component={DoneTasks} />
    </Tab.Navigator>
  );
};


// PARA fazer transição entre telas, onde cada nova tela é colocada no topo de uma pilha
const Routes = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="App" component={App} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="TaskList" component={TaskTab} />
      <Stack.Screen name="Task" component={Task} />
    </Stack.Navigator>
  );
};

export default Routes;
