// src/styles/addVehicleStyle.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FC",
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  // ── HEADER ──
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  headerIcon: {
    fontSize: 36,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E1E2D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    fontWeight: "400",
    lineHeight: 20,
  },

  // ── CARD ──
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 4,
  },

  // ── INPUT ──
  inputGroup: {
    marginBottom: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: "#1E1E2D",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    fontWeight: "600",
    letterSpacing: 1,
  },

  // ── PREVIEW ──
  previewBox: {
    marginTop: 16,
  },
  previewLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  platePreview: {
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: "#C7D2FE",
    alignItems: "center",
  },
  platePreviewText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#4F46E5",
    letterSpacing: 2,
  },

  // ── BUTTONS ──
  button: {
    backgroundColor: "#4F46E5",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#A5B4FC",
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.5,
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelText: {
    fontSize: 15,
    color: "#9CA3AF",
    fontWeight: "600",
  },
});