import React, { useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const ChatScreen = ({ navigation, route }) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.chatName,
      headerTitleVisible: false,
      headerTitleAlign: 'left',
      headerStyle: { backgroundColor: '#0077CC' },
      headerTitle: () => (
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL || require('../assets/signal-app-icon.png'),
            }}
          />
          <Text style={styles.avatarText}>{route.params?.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity>
            <Ionicons name="videocam" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddChats')}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, route.params?.chatName]);

  const handleSend = async () => {
    try {
      await addDoc(collection(db, `chats/${route.params.id}/messages`), {
        timestamp: serverTimestamp(),
        message: inputText,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
      });
      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const q = query(collection(db, `chats/${route.params.id}/messages`), orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

      return unsubscribe;
    }, [route])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.receiverText}>
                  <Avatar
                    rounded
                    source={{
                      uri: data.photoURL || require('../assets/signal-app-icon.png'),
                    }}
                  />
                  <Text style={styles.messageText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.senderText}>
                  <Avatar
                    rounded
                    source={{
                      uri: data.photoURL || require('../assets/signal-app-icon.png'),
                    }}
                  />
                  <Text style={styles.messageText}>{data.message}</Text>
                </View>
              )
            )}
            <View style={styles.footer}>
              <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                value={inputText}
                onChangeText={(text) => setInputText(text)}
              />
              <TouchableOpacity onPress={handleSend}>
                <Ionicons name="send" size={35} color="#0077CC" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
  },
  receiverText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  senderText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  messageText: {
    marginLeft: 10,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 18,
  },
  headerRightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    marginRight: 20,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: '#ECECEC',
    width: '80%',
    height: 40,
    
  },
});

export default ChatScreen;
