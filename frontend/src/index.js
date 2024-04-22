import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Navbar from './navbar/navbar';
import Player from './player/player';
import MusicCard from './musicCards/musicCards';
import reportWebVitals from './reportWebVitals';

function AppRouter() {
  return (
    <Router>
      <div>
        <Navbar />
        <Player />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/App" component={App} /> 
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container"> 
      <div className="card-container"> 
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
        <MusicCard />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();
