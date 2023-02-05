import '../../styles/components/landing-page.scss';
import BannerCardPage from '../card /BannerCardPage';
import MoviesList from '../card /MoviesList';
import MovieCarousel from '../movie-carousel/MovieCarousel';
import ButtonLink from '../ButtonLink';
import { filterOption } from '../../models/filterOption';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h2 className='title'>AOS Movies reviews</h2>
      <MovieCarousel/>
      <BannerCardPage title="The Son" 
      content="A cautionary tale that follows a family as it struggles to reunite after falling apart. THE SON centers on Peter (Hugh Jackman), whose hectic life with his infant and new partner Beth (Vanessa Kirby) is upended when his ex-wife Kate (Laura Dern) appears at his door to discuss their son Nicholas (Zen McGrath), who is now a teenager. The young man has been missing school for months and is deeply troubled. Peter strives to take care of Nicholas as he would have wanted his own father (Anthony Hopkins) to have taken care of him while juggling his and Beth's new son, and at work an offer of a dream position in Washington. However, by reaching for the past to correct its mistakes, he loses sight of how to hold onto Nicholas in the present."
      image="https://s3.amazonaws.com/static.rogerebert.com/uploads/review/primary_image/reviews/the-son-movie-review-2022/the-son-movie-review-2022.jpeg"
      rating={18} />
      <div className='section'>
        <h3 className='section-title'>Review the 10 lastest movies</h3>
        <MoviesList filter={filterOption.LATEST} />
        <ButtonLink toPath="/movies" text="See more" wrapperClass="see-more" />
      </div>
    </div>
  );
}

export default LandingPage;