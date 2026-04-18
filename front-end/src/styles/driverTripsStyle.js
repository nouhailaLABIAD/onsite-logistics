// src/styles/driverTripsStyle.js

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
    marginTop: 28,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E1E2D",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
  },

  // ── TABS ──
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#EBEBF0",
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 11,
    gap: 6,
  },
  tabActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  tabTextActive: {
    color: "#4F46E5",
    fontWeight: "700",
  },
  tabBadge: {
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  tabBadgeActive: {
    backgroundColor: "#EEF2FF",
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
  },
  tabBadgeTextActive: {
    color: "#4F46E5",
  },

  // ── CARD ──
  card: {
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

  // ── BADGES ──
  badgeRow: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // ── LOCATION ──
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationIcon: {
    fontSize: 20,
  },
  locationInfo: {
    flex: 1,
    gap: 2,
  },
  locationLabel: {
    fontSize: 11,
    color: "#9CA3AF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  locationValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E1E2D",
  },
  locationDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 30,
  },

  // ── ACTION BUTTONS ──
  actionButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },
  acceptButton: {
    backgroundColor: "#D97706",
    shadowColor: "#D97706",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  startButton: {
    backgroundColor: "#059669",
    shadowColor: "#059669",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  completeButton: {
    backgroundColor: "#4F46E5",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  // ── COMPLETED ──
  completedBox: {
    backgroundColor: "#ECFDF5",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 4,
  },
  completedText: {
    color: "#059669",
    fontWeight: "700",
    fontSize: 13,
  },

  // ── EMPTY ──
  emptyBox: {
    alignItems: "center",
    paddingVertical: 60,
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
});