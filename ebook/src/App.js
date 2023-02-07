import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FirstPage from './pages/firstPage/FirstPage';
import Edit from './pages/profil/Edit';
import Login from './pages/profil/Login';
import ProfilPage from './pages/profil/ProfilPage';
import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext();

function App() {
  const [auth, setAuth] = useState(
    JSON.parse(window.localStorage.getItem('auth')) || {}
  );

  useEffect(() => {
    window.localStorage.setItem('auth', JSON.stringify(auth));
    // console.log(auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />}></Route>
          <Route path="/profil" element={<ProfilPage />}></Route>
          <Route path="/profil/edit/:id" element={<Edit />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
