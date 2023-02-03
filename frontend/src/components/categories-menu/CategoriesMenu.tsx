import Dropdown from 'react-bootstrap/Dropdown';
import '../../styles/components/categories-menu.scss'
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';

function CategoriesMenu() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/create-movies`; 
    navigate(path);
  }

  return (
    <div className="categories-menu">
      <InputGroup className="categories-input-group mb-3">
        <Form.Control className="item search-form" aria-label="Text input with dropdown button"
        placeholder="Search for a movie..." />
        <Button
          variant="secondary"
          className="item"
          id="segmented-button-dropdown-2"
        >Search
        </Button>
        <Dropdown className="item">
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
            Movie category
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Documentary</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Adventure</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Comedy</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Romance</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Thriller</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Horror</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Anime</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Science Fiction</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Fantasy</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Cartoons</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button className="item" variant="outline-secondary" onClick={routeChange}>Create movies</Button>
        
      </InputGroup>
          

    </div>
  );
}

export default CategoriesMenu;