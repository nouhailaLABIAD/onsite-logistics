// src/styles/vehiclesStyle.js

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FC",
  },
  listContent: {
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
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E1E2D",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  // ── STATS ROW ──
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  miniStat: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  miniStatNumber: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 2,
  },
  miniStatLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
  },

  // ── CARD ──
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  vehicleIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleIcon: {
    fontSize: 22,
  },
  plateLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  plateText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E1E2D",
  },

  // ── STATUS BADGE ──
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusIcon: {
    fontSize: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
  },

  // ── CARD BOTTOM ──
  cardDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 12,
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleId: {
    fontSize: 12,
    color: "#D1D5DB",
    fontWeight: "600",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // ── EMPTY ──
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E1E2D",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "400",
    textAlign: "center",
  },
});