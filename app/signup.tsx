// app/auth/Register.js
import ImageInput from "@/components/ImageInput";
import useImagePicker from "@/hooks/useImagePicker";
import api from "@/services/api";
import { Button, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    image: image1,
    isLoadingImage: isLoadingImage1,
    generateChangeImageAlert: generateChangeImageAlert1,
  } = useImagePicker([4, 3]);

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  useEffect(() => {
    async function newUser() {
      try {
        await api.post("/users", {
          username: username,
          password: password,
          email: email,
        });
      } catch (error) {
        console.error(error);
      }
    }

    newUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Registro</Text>
      <Input
        placeholder="Nome de Usuário"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <ImageInput
        image={image1}
        isLoadingImage={isLoadingImage1}
        generateChangeImageAlert={generateChangeImageAlert1}
        hasImage={!!image1}
      />
      <Input
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button
        title="Entrar"
        onPress={handleLogin}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  registerText: {
    color: "blue",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Signup;
