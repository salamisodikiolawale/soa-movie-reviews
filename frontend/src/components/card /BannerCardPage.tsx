import React, { PropsWithChildren } from 'react';
import '../../styles/components/card/banner-card-page.scss';

export interface Props {
  title: string,
  image: string,
  content: string | undefined,
  rating: Number
}

const BannerCardPage = ({title, image, content, rating}: PropsWithChildren<Props>) => {


  return (
    <div className='banner-card'>
          <div className='banner-card-img'>
              <img 
              src={image} 
              alt={title}/>
          </div>
          <div className='banner-card-content'>
            <h2 className='banner-card-title'>{title}</h2>
            <p>{content}</p>
            <p className='rating'>Rating : <span>{rating.toString()}/20</span></p>
          </div>
          
    </div>
  );
}

export default BannerCardPage;