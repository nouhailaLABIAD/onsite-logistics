// src/styles/adminDashboardStyle.js

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

  // ── LOADING ──
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6FC",
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },

  // ── HEADER ──
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 28,
  },
  greeting: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  adminBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  adminBadgeIcon: {
    fontSize: 26,
  },

  // ── ROLE BADGE ──
  roleBadgeRow: {
    marginBottom: 24,
  },
  roleBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  roleBadgeText: {
    color: "#4F46E5",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },

  // ── STATS GRID ──
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderTopWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
    textAlign: "center",
  },

  // ── SECTION TITLE ──
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1E2D",
    marginBottom: 14,
  },

  // ── ACTIONS ──
  actionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 4,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 14,
  },
  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  actionIcon: {
    fontSize: 20,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E1E2D",
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "400",
  },
  actionArrow: {
    fontSize: 24,
    color: "#C4C4C4",
    fontWeight: "300",
  },
  actionDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 58,
  },

  // ── LOGOUT ──
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#EF4444",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});