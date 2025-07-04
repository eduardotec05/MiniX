import { createContext, useContext, useReducer, useCallback } from "react";

// Lista de usuarios permitidos
const ALLOWED_USERS = [
  { username: "admin", avatar: "👑", role: "admin" },
  { username: "invitado", avatar: "👤", role: "guest" },
  { username: "eduardotec05", avatar: "👨🏽‍💻", role: "user" },
];

const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.user,
        isAuthenticated: true,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    error: null,
  });

  const login = useCallback((username) => {
    const foundUser = ALLOWED_USERS.find((user) => user.username === username);

    if (foundUser) {
      dispatch({ type: "LOGIN", user: foundUser });
      return true;
    } else {
      dispatch({ type: "AUTH_ERROR", error: "Usuario no autorizado" });
      return false;
    }
  }, []);

  const logout = useCallback(() => dispatch({ type: "LOGOUT" }), []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
