import { useState } from 'react';
import '../../styles/components/movie/create-movie-page.scss';

const MovieForm = () => { 

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [rating, setRating] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async () => {

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
            

          </form>
      </>

    );
}

export default MovieForm;