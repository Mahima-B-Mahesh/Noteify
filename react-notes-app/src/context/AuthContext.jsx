import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (authTokens) {
      const decoded = parseJwt(authTokens.access);
      if (decoded) {
        setUser({ username: decoded.username || decoded.sub });
      }
    }
  }, [authTokens]);

  // Register
    const registerUser = async (username, email, password) => {
    try {
        await axios.post("http://127.0.0.1:8004/accounts/register/", {
        username,
        email,
        password,
        });
        alert("✅ Registration successful! Please log in.");
        window.location.href = "/login";
    } catch (err) {
        alert("❌ Registration failed: " + (err.response?.data?.error || "Unknown error"));
    }
    };

  const loginUser = async (username, password) => {
    try {
      const res = await axios.post("http://127.0.0.1:8004/accounts/login/", {
        username,
        password,
      });
      setAuthTokens(res.data);
      localStorage.setItem("authTokens", JSON.stringify(res.data));
      setUser({ username });
    } catch (err) {
      alert("❌ Invalid credentials");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  const isAuthenticated = !!authTokens;

  return (
    <AuthContext.Provider
      value={{ user, authTokens, isAuthenticated, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
