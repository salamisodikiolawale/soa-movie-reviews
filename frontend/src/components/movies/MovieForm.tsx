import { useState } from 'react';
import { Alert, Form, Toast } from 'react-bootstrap';
import Movie from '../../models/movie.interface';
import moviesService from '../../services/MoviesService';
import ButtonAction from '../ButtonAction';

const MovieForm = ({closeModal}: any) => { 

    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [categorySelected, setCategorySelected] = useState('');

    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const typeOfMovies = ['SF','CRIME','DRAMA','ADVENTURE','THRILLER','HORROR','ROMANCE', 'FANTASY', 'ANIME', 'COMEDY', 'ACTION', 'DOCUMENTARY'];

    const handleCategoryChange = (e: any) => {
        setCategorySelected(e.target.value);
    }

    const handleSubmit = async(event:any) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            const formData:Movie = {
              'title': title,
              'date': date,
              'rating': Number(rating),
              'description': description,
              'image': image,
              'types': [categorySelected]
            };
    
            const response = await moviesService.createMovie(formData);
    
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                setSuccessMessage(response.data.msg);
                setSuccess(true);
            } else {
                setErrorMessage('Sorry, an unknown error has occured. Please try again.')
                setError(true);
            }
            initFormData();
            closeModal();
        }
        setValidated(true);
    }

    const initFormData = () => {
        setTitle('');
        setDate('');
        setDescription('');
        setImage('');
        setRating('');
    }

    return (
        <Form className='movie-form' noValidate validated={validated} onSubmit={handleSubmit}>
            { success &&
                <Toast bg='success'>
                    <Toast.Header>
                    <strong className="me-auto">Success !</strong>
                    </Toast.Header>
                    <Toast.Body>{successMessage} </Toast.Body>
                </Toast>
            }
            { error &&
                <Alert variant="danger">
                    {errorMessage}
                </Alert>
            }   
            <Form.Group className="my-3" controlId="titleForm">
                <Form.Label className='label'>Title</Form.Label>
                <Form.Control 
                    required={true}
                    type='text'
                    name='title'
                    placeholder='Enter title of movie'
                    onChange={event => setTitle(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a title
                </Form.Control.Feedback>       
            </Form.Group>
            <Form.Select className="my-3" aria-label="Default select" onChange={(e) => handleCategoryChange(e)}>
                <option>Movie category</option>
                { typeOfMovies.map((type,index) => {
                    return <option key={index} value={type}>{type}</option>
                })}
            </Form.Select>
            <Form.Group className="mb-3" controlId="descriptionForm">
                <Form.Label className='label'>Description</Form.Label>
                <Form.Control 
                    name="description" 
                    required={true}
                    placeholder="Enter the synopsis of the movie..."
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                    as="textarea" rows={3} />
            </Form.Group>
            <div className='date-picker'>
              <label htmlFor="" className='label'>Date</label>
                  <input className='no-outline' type="date" 
                  name='date'
                  onChange={event => setDate(event.target.value)}
                  required
                />
            </div>
            <Form.Group className="my-3" controlId="imageForm">
                <Form.Label className='label'>Image</Form.Label>
                <Form.Control 
                    type="url" 
                    name='image'
                    onChange={event => setImage(event.target.value)}
                    required={true}
                    placeholder='Image URL of the movie'
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid URL for the image
                </Form.Control.Feedback>       
            </Form.Group>
            <Form.Group className="my-3" controlId="ratingForm">
                <Form.Label className='label'>Rating</Form.Label>
                <Form.Control 
                    type="number" 
                    name='rating'
                    onChange={event => setRating(event.target.value)}
                    required={true}
                    placeholder="The movie on a scale of 0 to 20"
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a rating
                </Form.Control.Feedback>       
            </Form.Group>
            <ButtonAction text="Create a movie" variant="primary" wrapperClass="submit-button" type="submit" />
        </Form>
    );
}

export default MovieForm;