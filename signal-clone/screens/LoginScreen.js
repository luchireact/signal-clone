import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Input, Image } from "react-native-elements";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.replace("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Image
        style={styles.image}
        source={require("../assets/signal-app-icon.png")}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="type in your email"
          autoFocus
          type="email"
          style={styles.text}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Input
          placeholder="type in your password"
          style={styles.text}
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      <TouchableOpacity style={styles.roundedButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.roundedButton2}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText2}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    height: 170,
    width: 170,
    margin: 20,
    paddingTop: 3,
    borderRadius: 7,
  },
  container: {
    flex: 1,
    margin: 30,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
  },
  text: {
    textAlign: "center",
  },
  inputContainer: {
    width: 300,
  },
  roundedButton: {
    backgroundColor: "#0077CC",
    borderRadius: 10,
    padding: 7,
    width: 250,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonText2: {
    color: "#0077CC",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "100",
  },
  roundedButton2: {
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 10,
    padding: 7,
    width: 250,
    marginBottom: 65,
  },
});
