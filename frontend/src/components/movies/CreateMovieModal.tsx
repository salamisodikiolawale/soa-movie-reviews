import MovieForm from './MovieForm';
import '../../styles/components/movie/create-movie-modal.scss';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CreateMovieModal(props: any) {
  return (
    <Modal className='create-movie-modal'
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new movie
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MovieForm closeModal={props.onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateMovieModal;