import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import LandingPage from './components/landing-page/LandingPage'

import './app.scss';
import Header from "./components/Header";


const MyApp = () => {
  return (
    <Router>
      <div className="app">
        <Header/>
        <div className="app-content">
          <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="*" element={<Navigate to="/404" replace />}/> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default MyApp;