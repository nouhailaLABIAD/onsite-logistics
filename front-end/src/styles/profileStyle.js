// src/styles/profileStyle.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FC",
    paddingHorizontal: 24,
  },

  // ── HEADER ──
  header: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 28,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E1E2D",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  roleBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  roleText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4F46E5",
    letterSpacing: 1,
  },

  // ── CARD ──
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
  inputGroup: {
    paddingVertical: 8,
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E1E2D",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
    color: "#1E1E2D",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 8,
  },

  // ── EDIT / SAVE ACTIONS ──
  editButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.4,
  },
  editActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cancelButtonText: {
    color: "#6B7280",
    fontWeight: "600",
    fontSize: 15,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#4F46E5",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },

  // ── OUTLINE BUTTON ──
  outlineButton: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#4F46E5",
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  outlineButtonText: {
    color: "#4F46E5",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.4,
  },

  // ── LOGOUT ──
  logoutButton: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderWidth: 1.5,
    borderColor: "#FECACA",
    marginBottom: 40,
  },
  logoutButtonText: {
    color: "#EF4444",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.4,
  },
});