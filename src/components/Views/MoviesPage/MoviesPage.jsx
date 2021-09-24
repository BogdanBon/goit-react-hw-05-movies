import { useState } from 'react';
import { searchMovies } from '../../../services/api';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import Loader from 'react-loader-spinner';
import Notiflix from 'notiflix';
import s from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchFilms, setSearchFilms] = useState([]);
  const [nameFilm, setNameFilm] = useState('');
  const [status, setStatus] = useState('idle');

  const { url } = useRouteMatch();

  const handleChange = e => {
    setNameFilm(e.target.value);
  };

  const handleSubmitFilm = e => {
    e.preventDefault();

    setStatus('pending');

    searchMovies(nameFilm)
      .then(data => {
        setSearchFilms(data.results);
      })
      .catch(error =>
        Notiflix.Notify.failure('Please enter what you want to find!'),
      )
      .finally(() => setStatus('resolved'));
  };

  return (
    <>
      <form onSubmit={handleSubmitFilm}>
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

      {status === 'pending' && (
        <Loader
          type="ThreeDots"
          color="rgb(56, 56, 56)"
          height={80}
          width={80}
          timeout={500}
        />
      )}

      {status === 'resolved' && (
        <div className={s.container}>
          <ul>
            {searchFilms.map(film => (
              <li className={s.item} key={film.id}>
                <Link to={`${url}/${film.id}`} className={s.link}>
                  {film.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}