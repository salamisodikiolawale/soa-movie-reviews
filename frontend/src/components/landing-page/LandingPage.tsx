import '../../styles/components/landing-page.scss';
import BannerCardPage from '../card /BannerCardPage';
import CardMoviePage from '../card /CardMoviePage';
import CategoriesMenu from '../categories-menu/CategoriesMenu';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h2>AOS Movies reviews</h2>
        
      <CategoriesMenu />

      <BannerCardPage />

      <CardMoviePage />
    </div>
  );
}

export default LandingPage;