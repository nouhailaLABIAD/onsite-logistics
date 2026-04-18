// src/styles/receiverMapStyle.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FC",
  },

  // ── MAP ──
  map: {
    flex: 1,
  },

  // ── DRIVER MARKER ──
  driverMarker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  // ── LEGEND CARD ──
  legendCard: {
    position: "absolute",
    top: 54,
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    gap: 6,
    minWidth: 210,
  },
  legendTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1E2D",
    marginBottom: 4,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  legendCount: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "500",
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 6,
  },

  // ── MISSION INFO CARD ──
  missionInfoCard: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 8,
    gap: 10,
  },
  missionInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  missionInfoTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1E1E2D",
  },
  missionInfoClose: {
    fontSize: 16,
    color: "#9CA3AF",
    fontWeight: "600",
    paddingHorizontal: 4,
  },
  missionInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  missionInfoIcon: {
    fontSize: 20,
  },
  missionInfoLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  missionInfoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E1E2D",
  },
  missionInfoDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 30,
  },

  // ── EMPTY ──
  emptyCard: {
    position: "absolute",
    bottom: 30,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 36,
  },
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});