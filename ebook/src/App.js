import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FirstPage from './pages/firstPage/FirstPage';
import Edit from './pages/profil/Edit';
import Login from './pages/profil/Login';
import ProfilPage from './pages/profil/ProfilPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />}></Route>
        <Route path="/profil" element={<ProfilPage />}></Route>
        <Route path="/profil/edit/:id" element={<Edit />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
