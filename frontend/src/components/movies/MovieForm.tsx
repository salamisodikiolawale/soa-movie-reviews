import { useState } from 'react';
import Movie from '../../models/movie.interface';
import moviesService from '../../services/MoviesService';
import '../../styles/components/movie/create-movie-page.scss';
import BannerCardPage from '../card /BannerCardPage';

const MovieForm = () => { 

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [rating, setRating] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async(event:any) => {
        event.preventDefault();
        
        const formData:Movie = {
          'title': title,
          'date': date,
          'rating': Number(rating),
          'description': description,
          'image': image,
        };

        const response = await moviesService.createMovie(formData);

        console.log(response);
        
        event.target.reset();
    }

    return (
      <>
          <h2>Create a movie</h2>
          <form onSubmit={handleSubmit}>

            <p>
              <label htmlFor="">Title</label>
              <input type="text" 
              name='title'
              placeholder='Enter title of movie'
              onChange={event => setTitle(event.target.value)}
              required
            />
            </p>

            <p>
              <label htmlFor="">Date</label>
              <input type="date" 
              name='date'
              onChange={event => setDate(event.target.value)}
              required
            />
            </p>

            <p>
              <label htmlFor="">Rating</label>
              <input type="number" 
              name='rating'
              onChange={event => setRating(event.target.value)}
              required
            />
            </p>

            <p>
              <label htmlFor="">description</label>
              <textarea 
                name="description" 
                onChange={event => setDescription(event.target.value)}
                required
              >

              </textarea>
            </p>

            <p>
              <label htmlFor="">Image url</label>
              <input type="url" 
              name='image'
              onChange={event => setImage(event.target.value)}
              required
            />
            </p>
          <button type="submit">Enregistrer</button>

          </form>
      </>

    );
}

export default MovieForm;