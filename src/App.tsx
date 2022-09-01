import { Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Header from './components/Header';
import Teacher from './Pages/Teacher/Teacher';
import Student from './Pages/Student/Student';
import Admin from './Pages/Admin/Admin';
import { useState } from 'react';
import { User } from './shared/interfaces';

function App() {
  const [roleRoute, setRoleRoute] = useState({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    role: '',
  } as User);

  const routeHandler = () => {
    if (roleRoute.role === 'teacher') {
      return <Teacher />;
    }
    if (roleRoute.role === 'student') {
      return <Student />;
    }
    if (roleRoute.role === 'admin') {
      return <Admin />;
    }
  };
  return (
    <Routes>
      <Route path="/" element={<SignIn setRoleRoute={setRoleRoute} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<Header />}>
        <Route path="/user" element={routeHandler()} />
      </Route>
    </Routes>
  );
}

export default App;
