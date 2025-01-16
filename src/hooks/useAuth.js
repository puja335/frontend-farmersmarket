import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { logIn, logout, register, updateUser } from "../features/auth/authSlice";
import useAppSelector from "./useAppSelector";
import useAppDispatch from "./useDispatch";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const login = useCallback(
    async (email, password) => {
      try {
        await dispatch(logIn({ email, password })).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const signup = useCallback(
    async (userData) => {
      try {
        await dispatch(register(userData)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const signOut = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch,navigate]);

  const updateProfile = useCallback(
    (userData) => {
      dispatch(updateUser(userData));
    },
    [dispatch]
  );

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    signup,
    logout: signOut,
    updateProfile,
  };
};

// export default useAuth;
