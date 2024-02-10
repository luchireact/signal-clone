import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import CustomList from '../components/CustomList';
import { useFocusEffect } from '@react-navigation/native'; // Import the useFocusEffect hook

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace('Signal');
    });
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'chats'));
      const chatsData = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
      setChats(chatsData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigation]);

  // Use the useFocusEffect hook to refresh data when the screen gains focus
  useFocusEffect(() => {
    fetchData();
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'signal',
      headerTitleStyle: { color: '#0077CC' },
      headerTintColor: 'black',
      headerStyle: { backgroundColor: 'white' },
      headerLeft: () => (
        <View style={styles.Avatar}>
          <TouchableOpacity onPress={signOut}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL || require('../assets/signal-app-icon.png'),
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60, marginRight: 20 }}>
          <TouchableOpacity>
            <Ionicons name="camera-outline" size={24} color="#0077CC" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 2 }} onPress={() => navigation.navigate('AddChats')}>
            <Ionicons name="pencil" size={22} color="#0077CC" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, auth]);

  const enterChat = (id, chatName) => {
    navigation.navigate("chats", {
      id: id,
      chatName: chatName,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ height: "100%" }}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomList
            key={id}
            chatName={chatName}
            id={id}
            enterChat={() => enterChat(id, chatName)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Avatar: {
    margin: 10,
  },
});

export default HomeScreen;
