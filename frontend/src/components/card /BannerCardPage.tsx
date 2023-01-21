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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam optio, quasi cupiditate molestias quis eveniet, corrupti minima omnis laudantium velit consequuntur libero dolores unde eum nostrum? Voluptatem qui saepe pariatur.</p>
          </div>
          
    </div>
  );
}

export default BannerCardPage;