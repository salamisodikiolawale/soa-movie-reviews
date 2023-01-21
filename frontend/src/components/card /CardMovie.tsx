
import React  from "react";
import '../../styles/components/card/card-movie.scss';

const CardMovie = ({dataParentToChildMovie}:{dataParentToChildMovie:any}) => {

    return (
        <div className='card'>
              {/* <a href="#"> */}
                <img 
                    src={dataParentToChildMovie.image} 
                    alt="" />
                <div className='content'>
                    <h3>{dataParentToChildMovie.title}</h3>
                    <p>rating :{dataParentToChildMovie.rating}</p>  
              </div>
              {/* </a> */}
        </div>
    )
}

export default CardMovie;