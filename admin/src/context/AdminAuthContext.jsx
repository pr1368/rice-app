import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext(null);

const ADMIN_TOKEN_KEY = "rice-shop-admin-token";
const ADMIN_USER_KEY = "rice-shop-admin-user";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(ADMIN_USER_KEY);

    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem(ADMIN_USER_KEY);
    return null;
  }
};

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem(ADMIN_TOKEN_KEY)
  );

  const [user, setUser] = useState(getStoredUser);

  const login = (newToken, newUser) => {
    localStorage.setItem(ADMIN_TOKEN_KEY, newToken);

    if (newUser) {
      localStorage.setItem(
        ADMIN_USER_KEY,
        JSON.stringify(newUser)
      );
    }

    setToken(newToken);
    setUser(newUser || null);
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);

    setToken(null);
    setUser(null);
  };

  const isAuthenticated =
    Boolean(token) && user?.role === "admin";

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error(
      "useAdminAuth باید داخل AdminAuthProvider استفاده شود."
    );
  }

  return context;
};