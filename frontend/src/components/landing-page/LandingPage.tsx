import '../../styles/components/landing-page.scss';
import { useNavigate } from "react-router-dom";
import BannerCardPage from '../card /BannerCardPage';
import CardMoviePage from '../card /CardMoviePage';

const LandingPage = () => {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/create-movies`; 
    navigate(path);
  }
  return (
    <>


      <div className="landing-page">
        <div className="sub-menu">
          <div className='btn-grp'>
            <button onClick={routeChange}>Create movies</button>
          </div>

        </div>

        <BannerCardPage />

        <h2>Movies reviews</h2>

        <CardMoviePage />
      </div>
    </>
  );
}

export default LandingPage;