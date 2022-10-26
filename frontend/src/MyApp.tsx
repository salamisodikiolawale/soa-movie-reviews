import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './components/landing-page/LandingPage'
import RegisterPage from './components/register-page/RegisterPage'
import './app.scss';
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";


const MyApp = () => {
  return (
    <Router>
      <div className="app">
        <Header/>
        <div className="app-content">
          <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/login" element={<RegisterPage/>} />
              <Route path='/404' element={<ErrorPage/>} />
              <Route path="*" element={<Navigate to="/404" replace />}/> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default MyApp;