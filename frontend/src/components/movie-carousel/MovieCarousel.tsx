import Carousel from 'react-bootstrap/Carousel';
import slider1 from '../../images/slider1.jpg';
import slider2 from '../../images/slider2.jpg';
import slider3 from '../../images/slider3.jpg';
import slider4 from '../../images/slider4.jpg';
import slider5 from '../../images/slider5.jpg';
import '../../styles/components/movie-carousel.scss';

function MovieCarousel() {
  return (
    <div className='movie-carousel'>
        <Carousel fade>
          <Carousel.Item>
            <div className='img-container'>
              <img
                className='d-block w-100'
                src={slider1}
                alt='First slide'
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
          <div className='img-container'>
            <img
              className='d-block w-100'
              src={slider2}
              alt='Third slide'
            />
          </div>
          </Carousel.Item>
          <Carousel.Item>
          <div className='img-container'>
            <img
              className='d-block w-100'
              src={slider3}
              alt='Third slide'
            />
          </div>
          </Carousel.Item>
          <Carousel.Item>
          <div className='img-container'>
            <img
              className='d-block w-100'
              src={slider4}
              alt='Third slide'
            />
          </div>
          </Carousel.Item>
          <Carousel.Item>
          <div className='img-container'>
            <img
              className='d-block w-100'
              src={slider5}
              alt='Third slide'
            />
          </div>
          </Carousel.Item>
        </Carousel>
      </div>
  );
}

export default MovieCarousel;