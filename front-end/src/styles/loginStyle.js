import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },

  form: {
    gap: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
  },

  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  roleBox: {
    borderWidth: 1,
    borderColor: "#007bff",
    padding: 10,
    borderRadius: 10,
  },

  roleText: {
    color: "#007bff",
  },
  footerText: {
  marginTop: 15,
  textAlign: "center",
  color: "#666",
  fontSize: 14,
},

linkText: {
  color: "#007bff",
  fontWeight: "bold",
},
});
