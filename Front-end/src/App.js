import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Playlist from './pages/Playlist';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Register from './pages/Register';
import LoginHeader from './components/LoginHeader/LoginHeader';
import { useTranslation } from 'react-i18next';
import './i18n';
import Error500 from './pages/Error500';
import './index.css';



export default function main() {

  // On vérifie si l'utilisateur est connecté
  function getCookie(name) {
    let cookieArray = document.cookie.split('; ');
    let cookie = cookieArray.find(row => row.startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  }

  // On récupert le cookie token et role
  const token = getCookie('token');
  const role = getCookie('role');


  // let isConnected = true;
  const [isConnected, setIsConnected] = useState(token == null);


  // if(token == null){
  //     // isConnected = false;
  //     setIsConnected(false);
  // }

  let form = new FormData();

  form.append('token', token);

  useEffect(() => {
    fetch('http://localhost:8000/api/isUserConnected', {
      method: 'POST',
      body: form
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          // isConnected = data.isConnected;
          setIsConnected(data.isConnected);
      })
      .catch(error => {
          console.error("Erreur lors de la récupération des données:", error)
          return (
            <Error500 />
          )
      });
  }, []);

  


  // On fais une fonction qui permets de changer la langue
  const { t, i18n } = useTranslation(); // On utilise la fonction t pour traduire les textes, on pourra se servir de cette fonction dans notre html

  const changeLanguage = (language) => {
    localStorage.setItem('language', language);
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      changeLanguage(storedLanguage);
    }
  }, []);
  // On fais une fonction qui permets de changer la langue


  

  // Si l'utilisateur n'est pas connecté, on affiche la page de connexion
  if(!isConnected){
      return (
          <BrowserRouter>

              <LoginHeader changeLanguage={changeLanguage} />
  
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/discover" element={<Login />} />
                  <Route path="/playlists" element={<Login />} />
                  <Route path="/verify_mail" element={<Login />} />
                  <Route path="/500" element={<Error500 />} />
                  <Route path="*" element={<NoPage />} />
              </Routes>
          </BrowserRouter>
      )
  }
  // Si l'utilisateur n'est pas connecté, on affiche la page de connexion

  // Si l'utilisateur est connecté, on affiche la page principale
  return (
    <BrowserRouter>
      <Header changeLanguage={changeLanguage} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/playlists" element={<Playlist />} />
        <Route path="/login" element={<Home />} />
        <Route path="/register" element={<Home />} />
        <Route path="/verify_mail" element={<Home />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
  // Si l'utilisateur est connecté, on affiche la page principale
}
