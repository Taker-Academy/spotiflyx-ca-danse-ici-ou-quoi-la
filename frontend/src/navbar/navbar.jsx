import React, { useState, useEffect } from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import './navbar.css';

function Navbar() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const spotifyClientId = 'fc00e50de4ed4be7bb06faa37378a36e';

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSpotifyLogin = () => {
    const redirectUri = encodeURIComponent(window.location.origin);
    const scopes = encodeURIComponent('streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state');
    const authorizationUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${spotifyClientId}&scope=${scopes}&redirect_uri=${redirectUri}`;

    window.location.href = authorizationUrl;
  };

  const extractAccessTokenFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      console.log("Token récupéré :", code);
      setAccessToken(code);
    }
  };
  

  useEffect(() => {
    extractAccessTokenFromURL();
  }, []);

  return (
    <div className="navbar-wrapper" style={{ width: sidebarVisible ? '200px' : '40px' }}>
      <div className="navbar">
        {!sidebarVisible && (
          <div className='logo'>
            <FaLongArrowAltRight className='slide' onClick={toggleSidebar}/>
          </div>
        )}
        {sidebarVisible && (
          <div className='logo'>
            <button className='home' onClick={handleSpotifyLogin}>Spotiflix</button>
            <FaLongArrowAltLeft className='slide' onClick={toggleSidebar} style={{ visibility: sidebarVisible ? 'visible' : 'hidden' }}></FaLongArrowAltLeft>
          </div>
        )}
        {sidebarVisible && (
          <>
            <button>Rechercher</button>
            <button>Musiques favorites</button>
            <button>Vidéos favorites</button>
            <button>Mon compte</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
