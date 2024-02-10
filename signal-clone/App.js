import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChats from './components/AddChats';
import ChatScreen from './screens/ChatScreen';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#0077CC' },
  headerTitle: { color: 'white'}, 
  headerTintColor: 'white',
  headerTitleAlign: 'center',
  fontSize: 100,
  fontWeight: 'bold',
  
};

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={globalScreenOptions}>
         <Stack.Screen
           name="Signal"
           component={LoginScreen}
           options={({ navigation }) => ({ navigation })}
         />
         <Stack.Screen
           name="Register"
           component={RegisterScreen}
           options={({ navigation }) => ({ navigation })}
         />
         <Stack.Screen
           name="Home"
           initialRouteName="Home"
           component={HomeScreen}
           options={{
             title: 'Home',
             headerLeft: null,
           }}
         />
         <Stack.Screen
           name="AddChats"
           initialRouteName="Home"
           component={AddChats}
           options={{
             title: 'Add Chats',
           }}
         />
         <Stack.Screen
           name="chats"
           component={ChatScreen}
           options={{
             title: 'Chats',
           }}
         />
       </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
