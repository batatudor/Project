import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FirstPage from './pages/firstPage/FirstPage';
import Edit from './pages/profil/Edit';
import Login from './pages/profil/Register';
import ProfilPage from './pages/profil/ProfilPage';
import React, { useEffect, useState } from 'react';
import { AuthContextProvider } from './pages/profil/Auth-Contect';

export const AuthContext = React.createContext();

function App() {
  return (
    // <AuthContext.Provider value={{ auth, setAuth }}>

    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<FirstPage />}></Route>
          <Route path="/profil" element={<ProfilPage />}></Route>
          <Route path="/profil/edit/:id" element={<Edit />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
