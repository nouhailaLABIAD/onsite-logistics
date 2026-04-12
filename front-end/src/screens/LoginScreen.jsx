// src/screens/LoginScreen.jsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure, loginStart } from "../redux/authSlice";
import AuthAPI from "../services/AuthAPI";
import styles from "../styles/loginStyle";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [error, setError] = useState("");

  // 🔥 NAVIGATION APRÈS QUE REDUX SOIT MIS À JOUR
  useEffect(() => {
    if (user) {
      console.log("USER READY:", user);
      navigation.replace("App");
    }
  }, [user]);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      dispatch(loginStart());
      setLoadingLocal(true);

      const res = await AuthAPI.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN SUCCESS:", res.data);

      // 🔥 IMPORTANT : update Redux
      dispatch(loginSuccess(res.data));

    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      dispatch(loginFailure(msg));
      setError(msg);
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {loadingLocal ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Don't have an account?
          <Text
            onPress={() => navigation.navigate("Register")}
            style={styles.linkText}
          >
            {" "}Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;