// simulator-driver.js

const { io } = require("socket.io-client");

// 🔥 connexion au backend
const socket = io("http://localhost:3000/tracking");

// 🗺️ Route Fès → Marrakech
const route = [
  { latitude: 34.0331, longitude: -5.0003 }, // Fès (start)
  { latitude: 33.2000, longitude: -6.2000 },
  { latitude: 32.4000, longitude: -7.2000 },
  { latitude: 31.6295, longitude: -7.9811 }, // Marrakech (end)
];

let index = 0;

socket.on("connect", () => {
  console.log("✅ Driver connecté:", socket.id);

  const interval = setInterval(() => {
    const loc = route[index];

    const payload = {
      missionId: 15, // ⚠️ doit correspondre à ta mission en DB
      latitude: loc.latitude,
      longitude: loc.longitude,
    };

    console.log("📡 Envoi position:", payload);

    socket.emit("updateLocation", payload);

    index++;

    // 🛑 arrêter quand on arrive à Marrakech
    if (index >= route.length) {
      clearInterval(interval);
      console.log("🏁 Mission terminée (Marrakech atteint)");
    }
  }, 2000);
});

socket.on("disconnect", () => {
  console.log("❌ Déconnecté");
});