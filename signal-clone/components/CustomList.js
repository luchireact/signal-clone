import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ListItem, Avatar } from 'react-native-elements';

const CustomList = ({ id, chatName, enterChat }) => {
  return (
    <TouchableOpacity>
      <ListItem onPress={()=> enterChat(id, chatName)} key={id} bottomDividers>
        <Avatar
          rounded
          source={require('../assets/vecteezy_woman-face-expression-clipart-design-illustration_9397892.png')}
        />
        <ListItem.Content>
          <ListItem.Title>{chatName}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default CustomList;

const styles = StyleSheet.create({});
