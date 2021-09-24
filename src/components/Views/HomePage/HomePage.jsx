import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../../../services/api';
import Notiflix from 'notiflix';
import s from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies()
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => Notiflix.Notify.failure(error));
  }, []);

  return (
    <>
      <div className={s.container}>
        <h1 className={s.title}>Trending today</h1>
        <ul>
          {movies.map(movie => (
            <li className={s.item} key={movie.id}>
              <Link to={`/movies/${movie.id}`} className={s.link}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
