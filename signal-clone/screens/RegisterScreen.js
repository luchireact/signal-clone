import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input } from "react-native-elements";
import {
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Go Back to Login",
    });
  }, [navigation]);

  // ...

  const handleRegistration = () => {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update user profile
        updateProfile(user, {
          displayName: fullName,
          photoURL:
            profilePic ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVo22aqcGDXHWC6N9JpvVCTQvzCp1abbkfTpgM0EQ__teYtCV6DisPxA5G_A&s",
        })
          .then(() => {
            // Profile updated successfully
            navigation.replace("Home");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // ...

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar style="light" />
      <View style={styles.inputContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>create a Signal Account</Text>
        </View>
        <Input
          placeholder="type in your fullname"
          autoFocus
          style={styles.text}
          value={fullName}
          onChangeText={(text) => setfullName(text)}
        />
        <Input
          placeholder="type in your email"
          style={styles.text}
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="type in your password"
          style={styles.text}
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="have any profile pic?"
          style={styles.text}
          value={profilePic}
          onChangeText={(text) => setProfilePic(text)}
          // onSubmitEditing={(text) => setProfilePic(text)}
        />
        <TouchableOpacity
          style={styles.roundedButton2}
          onPress={handleRegistration} // Remove the parentheses here
        >
          <Text style={styles.buttonText2}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.design} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  headerText: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  inputContainer: {
    width: 300,
    marginTop: 30,
  },
  container: {
    flex: 1,
    margin: 30,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  design: {
    flex: 1,
    height: 100,
  },
  buttonText2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  roundedButton2: {
    backgroundColor: "#0077CC",
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 20,
    width: 250,
    color: "white",
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
});
