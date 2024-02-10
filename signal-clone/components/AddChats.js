import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Input } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AddChats = ({ navigation }) => {
  const [input, setInput] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a New Chat',
      headerTitleStyle: { color: '#0077CC' },
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  const createChat = async () => {
    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        chatName: input,
      });

      console.log('Document written with ID: ', docRef.id);
      navigation.goBack(); // Move the navigation inside the then block
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter a Chat Name'
        value={input}
        leftIcon={<Ionicons name='chatbubbles' size={24} color='black' />}
        onChangeText={(text) => setInput(text)}
      />
      <Button onPress={createChat} title='Create a New Chat' />
    </View>
  );
};

export default AddChats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
});
