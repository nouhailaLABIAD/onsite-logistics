// hooks/useAuth.js

import { useDispatch, useSelector } from "react-redux";
import AuthAPI from "../services/AuthAPI";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    dispatch(loginStart());

    try {
      const res = await AuthAPI.post("/auth/login", {
        email,
        password,
      });

    dispatch(loginSuccess({
    user: res.data.user,
    token: res.data.token,
    role: res.data.role
    }));
      return true;
    } catch (err) {
      dispatch(
        loginFailure(
          err?.response?.data?.message || "Login error"
        )
      );
      return false;
    }
  };

  return { login, loading, error };
};

export default useAuth;