// src/styles/settingsStyle.js

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
    marginBottom: 32,
  },
  avatarCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
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
    fontSize: 30,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E1E2D",
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

  // ── SECTION TITLE ──
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },

  // ── MENU CARD ──
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  menuIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuTextContainer: {
    flex: 1,
    gap: 2,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1E2D",
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "400",
  },
  menuArrow: {
    fontSize: 22,
    color: "#D1D5DB",
    fontWeight: "300",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 56,
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
  logoutText: {
    color: "#EF4444",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.4,
  },
});