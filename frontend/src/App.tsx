import './App.css';
import axios from 'axios';

function App() {

  const getMovieService = () => {
    axios.get(`http://127.0.0.1:3010/api/v1/movies`).then(res => {
      console.log(res.data)
    })
  }

  return (
    <div className="App">
      hello
      <button type="button" onClick={() => getMovieService ()}>
        get movie service
      </button>
    </div>
  );
}

export default App;
