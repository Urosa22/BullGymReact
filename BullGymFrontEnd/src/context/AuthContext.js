import { createContext, useEffect, useState } from "react";
import { getMyUserDataService } from "../services";

export const AuthContext = createContext(null);

export const AuthContextProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getMyUserDataService(token);

        setUser(data);
      } catch (error) {
        setToken("");
        setUser(null);
      }
    };

    if (token) getUserData();
  }, [token, setToken]);

  const role = user ? user.role : null;

  const logout = () => {
    setToken("");
    setUser(null);
  };

  const login = (token) => {
    setToken(token);
  };
  /* console.log(user); */
  return (
    <AuthContext.Provider value={{ token, user, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};
