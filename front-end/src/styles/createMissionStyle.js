// src/styles/createMissionStyle.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FC",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // ── HEADER ──
  header: {
    paddingVertical: 28,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E1E2D",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "400",
  },

  // ── CARD ──
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1E2D",
    marginBottom: 14,
  },
  cardTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  // ── SELECTED BADGE ──
  selectedBadge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  selectedBadgeText: {
    fontSize: 12,
    color: "#4F46E5",
    fontWeight: "600",
  },

  // ── INPUT ──
  inputGroup: {
    marginBottom: 14,
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
  },

  // ── PRIORITY ──
  priorityRow: {
    flexDirection: "row",
    gap: 10,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  priorityBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9CA3AF",
  },

  // ── SELECT ITEMS ──
  selectItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  selectItemSelected: {
    backgroundColor: "#EEF2FF",
    borderColor: "#4F46E5",
  },
  selectItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  selectAvatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  selectAvatarSelected: {
    backgroundColor: "#C7D2FE",
  },
  selectAvatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4F46E5",
  },
  selectItemText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    flex: 1,
  },
  selectItemTextSelected: {
    color: "#4F46E5",
    fontWeight: "700",
  },
  checkIcon: {
    fontSize: 16,
    color: "#4F46E5",
    fontWeight: "700",
  },
  itemSeparator: {
    height: 8,
  },
  emptyList: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    paddingVertical: 10,
  },

  // ── BUTTONS ──
  createButton: {
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
  createButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
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