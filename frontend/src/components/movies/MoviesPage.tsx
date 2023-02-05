import { filterOption } from '../../models/filterOption';
import '../../styles/components/movie/movies-page.scss';
import BackLink from '../BackLink';
import MoviesList from '../card /MoviesList';
import CategoriesMenu from '../categories-menu/CategoriesMenu';


const MoviesPage = () => {
  return (
    <div className="movies-page">
      <BackLink />
      <h2>Movies list</h2>
      <CategoriesMenu />
      <MoviesList filter={filterOption.ALL} />
    </div>
  );
}

export default MoviesPage;