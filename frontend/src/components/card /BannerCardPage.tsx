import React from 'react';
import '../../styles/components/card/banner-card-page.scss';

const BannerCardPage = () => {
  return (
    <div className='banner-card'>
          <div className='banner-card-img'>
            {/* <a href="#"> */}
              <img 
              src="https://s3.amazonaws.com/static.rogerebert.com/uploads/review/primary_image/reviews/the-son-movie-review-2022/the-son-movie-review-2022.jpeg" 
              alt="#"/>
              {/* </a> */}
          </div>
          <div className='banner-card-content'>
            <h2 className='banner-card-title'>The Son</h2>
            <p>A cautionary tale that follows a family as it struggles to reunite after falling apart. THE SON centers on Peter (Hugh Jackman), whose hectic life with his infant and new partner Beth (Vanessa Kirby) is upended when his ex-wife Kate (Laura Dern) appears at his door to discuss their son Nicholas (Zen McGrath), who is now a teenager. The young man has been missing school for months and is deeply troubled. Peter strives to take care of Nicholas as he would have wanted his own father (Anthony Hopkins) to have taken care of him while juggling his and Beth's new son, and at work an offer of a dream position in Washington. However, by reaching for the past to correct its mistakes, he loses sight of how to hold onto Nicholas in the present.</p>
          </div>
          
    </div>
  );
}

export default BannerCardPage;