import React  from "react";
import { NavLink } from "react-router-dom";
import '../../styles/components/card/card-movie.scss';

const CardMovie = ({dataParentToChildMovie}:{dataParentToChildMovie:any}) => {

    return (
        <div className='card-movie'>
            <NavLink className='link' to={'/movie/' + dataParentToChildMovie._id}>
              
              <div className="img-container">
                <img 
                    src={dataParentToChildMovie.image} 
                    alt={dataParentToChildMovie.title} />
              </div>
                
                <div className='content'>
                    <h4>{dataParentToChildMovie.title}</h4>
                    <p className="rating">Rating : {dataParentToChildMovie.rating} / 20</p> 
              </div>
            </NavLink>
              {/* </a> */}
        </div>
    )
}

export default CardMovie;