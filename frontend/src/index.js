
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Navbar from './navbar/navbar';
import Player from './player/player';
import MusicCard from './musicCards/musicCards';
import reportWebVitals from './reportWebVitals';
import Search from './search/search';
import Login from './login/login';

function AppRouter() {
    const handleLoginSuccess = () => {
        ReactDOM.render(
            <React.StrictMode>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Search />} />
                        <Route path="/App" component={App} /> 
                    </Routes>
                </Router>
            </React.StrictMode>,
            document.getElementById('root')
        );
    };

    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/App" component={App} /> 
                </Routes>
            </div>
        </Router>
    );
}

function Home({ onLoginSuccess }) {
    return (
        <div className="container"> 
            <div className="card-container">
                <Login onLoginSuccess={onLoginSuccess} />
            </div>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
