import { Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile/Profile";
import { AuthContext } from "./context/auth-context";
import { useCallback, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        access_key: "",
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/newuser" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
