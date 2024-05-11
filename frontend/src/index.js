import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Navbar from './navbar/navbar';
import reportWebVitals from './reportWebVitals';
import Search from './search/search';
import Login from './login/login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppRouter() {
    const handleLoginSuccess = () => {
        setTimeout(() => {
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
        }, 2000);
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
        <ToastContainer />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
