// src/styles/driverDashboardStyle.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FC",
    paddingHorizontal: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6FC",
  },

  // ── HEADER ──
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 28,
    gap: 14,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  greeting: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E1E2D",
    letterSpacing: 0.3,
  },

  // ── SECTION TITLE ──
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 2,
  },

  // ── STATS ──
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    gap: 4,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: "800",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },

  // ── MISSION CARD ──
  missionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 10,
  },
  missionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  missionIcon: {
    fontSize: 20,
  },
  missionInfo: {
    flex: 1,
    gap: 2,
  },
  missionLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  missionValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E1E2D",
  },
  missionDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // ── EMPTY ──
  emptyBox: {
    alignItems: "center",
    paddingVertical: 36,
    gap: 10,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },

  // ── BUTTONS ──
  primaryButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.4,
  },
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