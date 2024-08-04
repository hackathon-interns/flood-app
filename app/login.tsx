import api from "@/services/api";
import { Button, Icon, Input, ThemeProvider } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

const LoginScreen = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", user);
    console.log("Senha:", password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        placeholder="E-mail ou nome de usuário"
        onChangeText={setUser}
        value={user}
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
      <Text style={styles.registerText}>Não tem uma conta? Registrar-se</Text>
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

export default LoginScreen;
