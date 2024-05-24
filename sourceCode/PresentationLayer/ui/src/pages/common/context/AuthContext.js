import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  user: "",
  id: 0,
  userId: 0,
});

export default AuthContext;
