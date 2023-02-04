import '../../styles/components/landing-page.scss';
import BannerCardPage from '../card /BannerCardPage';
import MoviesList from '../card /MoviesList';
import MovieCarousel from '../movie-carousel/MovieCarousel';
import CategoriesMenu from '../categories-menu/CategoriesMenu';
import ButtonLink from '../ButtonLink';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h2 className='title'>AOS Movies reviews</h2>
      <CategoriesMenu />
      <MovieCarousel/>
      <BannerCardPage />
      <div className='section'>
        <h3 className='section-title'>Review the 10 lastest movies</h3>
        <MoviesList filter='latest' />
        <ButtonLink toPath="/movies" text="See more" wrapperClass="see-more" />
      </div>
    </div>
  );
}

export default LandingPage;