import React, { useState } from 'react';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import './navbar.css';

function Navbar() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

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
            <button className='home'>Spotiflix</button>
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
