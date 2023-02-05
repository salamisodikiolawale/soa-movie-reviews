import { useState } from 'react';
import Movie from '../../models/movie.interface';
import moviesService from '../../services/MoviesService';
import '../../styles/components/movie/create-movie-page.scss';

const MovieFormUpdate = ({movieUpdate}:{movieUpdate:Movie|undefined}) => { 

    const [title, setTitle] = useState(movieUpdate?.title);
    const [date, setDate] = useState(movieUpdate?.date);
    const [rating, setRating] = useState(Number(movieUpdate?.rating));
    const [description, setDescription] = useState(movieUpdate?.description);
    const [image, setImage] = useState(movieUpdate?.image);

    const handleSubmit = async(event:any) => {
        event.preventDefault();
        
        const formData:Movie = {
          'title': title,
          'date': date,
          'rating': Number(rating),
          'description': description,
          'image': image,
        };

        const response = await moviesService.updateMovie(formData);

        console.log(response);
        
        event.target.reset();
    }

    return (
      <>
          <h2>Update a movie</h2>
          <form onSubmit={handleSubmit}>

            <p>
              <label htmlFor="">Title</label>
              <input type="text" 
              name='title'
              value={title}
              placeholder='Enter title of movie'
              onChange={event => setTitle(event.target.value)}
              required
            />
            </p>

            <p>
              <label htmlFor="">Date</label>
              <input type="date" 
              name='date'
              value={date}
              onChange={event => setDate(event.target.value)}
              required
            />
            </p>

            <p>
              <label htmlFor="">Rating</label>
              <input type="number" 
              name='rating'
              value={rating}
              // onChange={event => setRating(event.target.value)}
              required
            />
            </p>

            <p>
              <label htmlFor="">description</label>
              <textarea 
                name="description" 
                value={description}
                onChange={event => setDescription(event.target.value)}
                required
              >

              </textarea>
            </p>

            <p>
              <label htmlFor="">Image url</label>
              <input type="url" 
              name='image'
              value={image}
              onChange={event => setImage(event.target.value)}
              required
            />
            </p>
          <button type="submit">Enregistrer</button>
          <button type="submit">Annuler</button>

          </form>
      </>

    );
}

export default MovieFormUpdate;