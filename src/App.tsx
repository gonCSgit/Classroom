import { Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { AuthContext } from './context/auth-context';
import { useCallback, useState } from 'react';
import Header from './components/Header';
import Teacher from './Pages/Teacher/Teacher';
import Student from './Pages/Student/Student';
import Admin from './Pages/Admin/Admin';
import Unauthorized from './Pages/Unauthorized';

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
        access_key: '',
      }}
    >
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Header />}>
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/student" element={<Student />} />
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/*" element={<Unauthorized />} /> */}
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
