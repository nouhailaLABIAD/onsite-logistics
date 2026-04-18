// src/styles/homeStyle.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FC",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  // ── LOGO ──
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  logoIcon: {
    fontSize: 46,
  },

  // ── TEXTS ──
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1E1E2D",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
    fontWeight: "400",
  },

  // ── BADGE ──
  badge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginBottom: 44,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  badgeText: {
    color: "#4F46E5",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // ── BUTTONS ──
  buttonContainer: {
    width: "100%",
    gap: 14,
  },
  loginButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  registerButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#4F46E5",
  },
  registerText: {
    color: "#4F46E5",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  // ── FOOTER ──
  footer: {
    position: "absolute",
    bottom: 30,
    fontSize: 12,
    color: "#D1D5DB",
    fontWeight: "400",
  },
});