// src/styles/home.style.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  imageContainer: {
    marginBottom: 30,
  },

  image: {
    width: 200,
    height: 200,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e1e1e",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
  },

  buttonContainer: {
    width: "100%",
    gap: 15,
  },

  loginButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  registerButton: {
    borderWidth: 1,
    borderColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  registerText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 16,
  },
});