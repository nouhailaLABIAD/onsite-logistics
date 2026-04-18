import { useDispatch, useSelector } from "react-redux";
import AuthAPI from "../services/AuthAPI";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/authSlice";
import { registerForPushNotificationsAsync } from "../services/NotificationService";

const useAuth = () => {
  console.log("🆕 useAuth VERSION NOUVELLE CHARGÉE");
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    dispatch(loginStart());

    try {
      // 1. Login
      const res = await AuthAPI.post("/auth/login", { email, password });
      const { user, token, role } = res.data;
      console.log("✅ LOGIN SUCCESS:", { role, user });

      // 2. Push token — complètement isolé
      try {
        const pushToken = await registerForPushNotificationsAsync();
        console.log("🔔 Push token récupéré:", pushToken);

        if (pushToken) {
          console.log("📤 Envoi push token au backend...");
          const resp = await AuthAPI.patch(
            "/users/push-token",
            { token: pushToken },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log("✅ Push token saved:", resp.data);
        } else {
          console.log("⚠️ Pas de push token dispo");
        }
      } catch (pushErr) {
        console.log("⚠️ Push token échoué (ignoré):", pushErr?.message);
      }

      // 3. Dispatch Redux — toujours atteint
      dispatch(loginSuccess({ user, token, role }));
      return true;

    } catch (err) {
      console.log("❌ LOGIN ERROR:", err?.response?.data || err?.message);
      dispatch(loginFailure(err?.response?.data?.message || "Login error"));
      return false;
    }
  };

  return { login, loading, error };
};

export default useAuth;