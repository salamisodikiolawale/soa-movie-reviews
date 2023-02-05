import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './components/landing-page/LandingPage'
import './app.scss';
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import AuthenticationPage from "./components/authentication-page/AuthenticationPage";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";

import axios from 'axios';
import CreateMoviepage from "./components/movies/CreateMoviePage";
import SingleMoviePage from "./components/single-movie-page/SingleMoviePage";
import Footer from "./components/footer/Footer";
import MoviesPage from "./components/movies/MoviesPage";

const MyApp = () => {

  const { state, dispatch } = useContext(Context);

  const getCurrentUser = async (userId: string) => {
    try {
        const options = {
          headers : {
            Authorization: sessionStorage.getItem('JWT') ? `Bearer ${sessionStorage.getItem('JWT')}` : ''
          }
        }
        const res = await axios.get(`http://127.0.0.1:3003/user/${userId}`, options);
        return res.data;
      } catch (e : any) {
        console.log("Couldn't find the user. Maybe wrong user ID")
      }
  }

  const authPageComponent = () => {
    return state.userData.isConnected ? <Navigate to="/404" replace /> : <AuthenticationPage/>;
  }

  useEffect(() => {
      if (state.userData.isConnected && !!state.userData.userInfos.userId) {
        const userData = getCurrentUser(state.userData.userInfos.userId);
        dispatch({
          type: "SET_USER_DATA",
          payload: {
            isConnected: !!sessionStorage.getItem('JWT'),
            userInfos: userData
          }
        });
      }
  }, [state.userData, dispatch])

  return (
    <Router>
      <div className="app">
        <Header/>
        <div className="app-content">
          <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/authenticate" element={authPageComponent()} />
              <Route path="/create-movies" element={<CreateMoviepage/>} />
              <Route path='/404' element={<ErrorPage/>} />
              <Route path="*" element={<Navigate to="/404" replace />}/> 
              <Route path="/movie/:movieId" element={<SingleMoviePage />}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default MyApp;