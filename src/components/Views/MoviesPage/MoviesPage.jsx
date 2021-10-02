import { useState, useEffect } from 'react';
import { searchMovies } from '../../../services/api';
import { Link } from 'react-router-dom';
import { useRouteMatch, useHistory, useLocation } from 'react-router';
import Notiflix from 'notiflix';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchFilms, setSearchFilms] = useState([]);
  const [nameFilm, setNameFilm] = useState('');
  const history = useHistory();
  const location = useLocation();

  const { url } = useRouteMatch();

  const handleChange = e => {
    setNameFilm(e.target.value);
  };

  const sortOrder = new URLSearchParams(location.search).get('query');

  const handleSubmitFilm = e => {
    e.preventDefault();

    if (!nameFilm) {
      Notiflix.Notify.failure('Please enter what you want to find!');
      return;
    }

    history.push({
      ...location,
      search: `query=${nameFilm}`,
    });
  };

  useEffect(() => {
    if (!location.search) {
      return;
    }

    searchMovies(sortOrder)
      .then(data => {
        setSearchFilms(data.results);
      })
      .catch(error => console.log(error));
  }, [location.search, sortOrder]);

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmitFilm}>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Please enter a film name to find"
          value={nameFilm}
          onChange={handleChange}
        />
        <button className={s.btn} type="submit">
          Find a film
        </button>
      </form>

      <div className={s.list}>
        <ul>
          {searchFilms.map(film => (
            <li className={s.item} key={film.id}>
              <Link
                to={{
                  pathname: `${url}/${film.id}`,
                  state: { from: `${url}${history.location.search}` },
                }}
                className={s.link}
              >
                {film.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
