import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  registerUser,
  loginUser,
  getMe,
  updateProfileUser,
} from "../services/authService";

const AuthContext = createContext(null);

// ======================================================
// LocalStorage
// ======================================================

function getStoredUser() {
  try {
    const savedUser =
      localStorage.getItem("rice-shop-user");

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser);
  } catch (error) {
    console.error(
      "خطا در خواندن کاربر:",
      error
    );

    return null;
  }
}

function getStoredToken() {
  return localStorage.getItem(
    "rice-shop-token"
  );
}

// ======================================================
// Auth Provider
// ======================================================

export function AuthProvider({ children }) {
  const [user, setUser] =
    useState(getStoredUser);

  const [token, setToken] =
    useState(getStoredToken);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const isAuthenticated =
    Boolean(token && user);

  // ====================================================
  // Check Authentication
  // ====================================================

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken =
        getStoredToken();

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response =
          await getMe();

        setUser(response.user);

        localStorage.setItem(
          "rice-shop-user",
          JSON.stringify(
            response.user
          )
        );
      } catch (error) {
        console.error(
          "Auth check error:",
          error
        );

        localStorage.removeItem(
          "rice-shop-token"
        );

        localStorage.removeItem(
          "rice-shop-user"
        );

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ====================================================
  // Register
  // ====================================================

  const register = async (
    userData
  ) => {
    try {
      setLoading(true);
      setError("");

      const response =
        await registerUser(
          userData
        );

      localStorage.setItem(
        "rice-shop-token",
        response.token
      );

      localStorage.setItem(
        "rice-shop-user",
        JSON.stringify(
          response.user
        )
      );

      setToken(response.token);
      setUser(response.user);

      return response;
    } catch (error) {
      console.error(
        "Register error:",
        error
      );

      const message =
        error.response?.data
          ?.message ||
        "ثبت‌نام با خطا مواجه شد.";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // Login
  // ====================================================

  const login = async (
    credentials
  ) => {
    try {
      setLoading(true);
      setError("");

      const response =
        await loginUser(
          credentials
        );

      localStorage.setItem(
        "rice-shop-token",
        response.token
      );

      localStorage.setItem(
        "rice-shop-user",
        JSON.stringify(
          response.user
        )
      );

      setToken(response.token);
      setUser(response.user);

      return response;
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      const message =
        error.response?.data
          ?.message ||
        "ورود با خطا مواجه شد.";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // Update Profile
  // ====================================================

  const updateProfile = async (
    userData
  ) => {
    try {
      setLoading(true);
      setError("");

      const response =
        await updateProfileUser(
          userData
        );

      if (response.user) {
        setUser(response.user);

        localStorage.setItem(
          "rice-shop-user",
          JSON.stringify(
            response.user
          )
        );
      }

      return response;
    } catch (error) {
      console.error(
        "Update profile error:",
        error
      );

      const message =
        error.response?.data
          ?.message ||
        "به‌روزرسانی پروفایل با خطا مواجه شد.";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // Logout
  // ====================================================

  const logout = () => {
    localStorage.removeItem(
      "rice-shop-token"
    );

    localStorage.removeItem(
      "rice-shop-user"
    );

    setToken(null);
    setUser(null);
    setError("");
  };

  // ====================================================
  // Context Value
  // ====================================================

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated,

    register,
    login,
    updateProfile,
    logout,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ======================================================
// useAuth
// ======================================================

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth باید داخل AuthProvider استفاده شود."
    );
  }

  return context;
}