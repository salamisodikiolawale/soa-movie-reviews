import { useEffect, useState } from 'react';
import Movie from '../../models/movie.interface';
import MoviesService from '../../services/MoviesService';
import '../../styles/components/movie/movies-page.scss';
import BackLink from '../BackLink';
import MoviesList from '../card /MoviesList';
import CategoriesMenu from '../categories-menu/CategoriesMenu';


const MoviesPage = () => {

  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async() => {
    setMovies(await MoviesService.getMovies());  
  }

  useEffect(() => {
    fetchMovies();
  },[])

  return (
    <div className="movies-page">
      <BackLink />
      <h2>Movies list</h2>
      <CategoriesMenu setMovies={setMovies} />
      <MoviesList movies={movies} />
    </div>
  );
}

export default MoviesPage;