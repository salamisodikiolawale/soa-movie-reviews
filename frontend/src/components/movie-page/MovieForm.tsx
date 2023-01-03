import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';



function MovieForm(){

  let pathImage1;
  //rajouter a ranking
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [base64Image, setBase64Image] = useState('https://via.placeholder.com/150');
  const [rate, setRate] = useState('');
  function handleDataChange (event : any){
    const file = event.target.files[0]
    console.log("data dans handleDataChange",base64Image)
    getBase64(file).then( 
      data => setBase64Image( typeof(data) == 'string' 
        ? data : '')
    );
    
  }

  function handleRatingChange(event : any){
    const rating = event.target.value
    rating < 6 && rating >= 0 ? setRate(rating) : console.log("La note n'est pas entre 0 et 5")  
  }

  function handleDescriptionChange(event : any){
    console.log("handleDescriptionChange start")
    const description = event.target.value
    description.length < 500 ? setDescription(description) : console.log("Description trop longue, elle doit faire maximum 500 caractères")
  }

  async function getBase64(file : any) {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  function handleSubmit(event : any){
    event.preventDefault();
    console.log("Start handleSubmit");

    let formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('date', date);
    formData.append('rate', rate);
    formData.append('description', description);
    formData.append('base64Image', base64Image);

    console.log("formData",formData);
    console.log(Array.from(formData));

    console.log("Start axios")
    axios.post('http://localhost:3000/api/v1/movies', formData)
    console.log("End axios")
    console.log("End handleSubmit");
    //return alert('Title'+title+', Type: '+ type +', Date: '+date+', Rate: '+rate+', Description: '+description+', base64: '+base64Image);

  }

  return(
    <>
    <Form>
      <Form.Group>
        <Form.Label>Movie's title</Form.Label>
        <FloatingLabel label="Write the title here">
          <Form.Control required type="text" placeholder="Movie's title" onChange={e => setTitle(e.target.value)}/>
        </FloatingLabel>
      </Form.Group>
      <Form.Group>
        <Form.Label>Movie's type</Form.Label>
        <Form.Select aria-label="Movie types" onChange={e => setType(e.target.value)}>
          <option value="Comedy">Comedy</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Western">Western</option>
        </Form.Select>
        <Form.Text className="text-muted">
          Select a type
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Release date</Form.Label>
        <Form.Control required type="date" placeholder="Enter the title" onChange={e => setDate(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Quick description</Form.Label>
        <Form.Control required type="text" placeholder="Enter a maximum of 500 characters." onChange={e => handleDescriptionChange(e)}/> 
      </Form.Group>
      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <FloatingLabel label="Rate the movie between 0 to 5">
          <Form.Control required type="text" placeholder="Movie's rate" onChange={e => handleRatingChange(e)}/>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" accept='image/*' onChange={handleDataChange}/>
        <Form.Text className="text-muted">    
          Select an image from your files
        </Form.Text>
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Add the movie
      </Button>
    </Form>
    <div>
      <img id="defaultImage" src={base64Image}/>
    </div>
    </>   
  );
}

export default MovieForm;
