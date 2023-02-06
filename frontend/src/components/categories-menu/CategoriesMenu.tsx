import '../../styles/components/categories-menu.scss';
import { Button, Form, InputGroup } from 'react-bootstrap';
import CreateMovieModal from '../movies/CreateMovieModal';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

const CategoriesMenu = () => {
  const openModal = () =>{ 
    setModalShow(true);
  }
  
  const typeOfMovies = ['SF','CRIME','DRAMA','ADVENTURE','THRILLER','HORROR','ROMANCE', 'FANTASY', 'ANIME', 'COMEDY', 'ACTION', 'DOCUMENTARY'];
  const [searchInput, setSearchInput] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const navigateTo = useNavigate();

  const createMovieRedirection = () => {
    state.userData.isConnected ? openModal() : navigateTo('/authenticate')
  }
  
  const handleSearchInput = (e: any) => {
    setSearchInput(e.target.value);
  }

  const handleCategoryChange = (e: any) => {
    setCategorySelected(e.target.value);
  }

  const handleSubmitResearch = () => {
    console.log(searchInput);
    console.log(categorySelected);
  }

  const { state } = useContext(Context);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="categories-menu">
      <InputGroup className="categories-input-group mb-3">
        <Form.Control className="item search-form" aria-label="Text input with dropdown button" onChange={(e) => handleSearchInput(e)}
        placeholder="Search for a movie..." />
        <Form.Select className='item' aria-label="Default select" onChange={(e) => handleCategoryChange(e)}>
          <option>All category</option>
          { typeOfMovies.map((type,index) => {
            return <option key={index} value={type}>{type}</option>
          })}
        </Form.Select>
        <Button onClick={handleSubmitResearch}
          variant="secondary"
          className="item"
          id="segmented-button-dropdown-2">Search
        </Button>
        <Button className="item" variant="outline-secondary" onClick={createMovieRedirection}>Create movies</Button>
        <CreateMovieModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </InputGroup>
          

    </div>
  );
}

export default CategoriesMenu;