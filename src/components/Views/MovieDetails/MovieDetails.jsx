import {
  Route,
  Switch,
  useParams,
  useHistory,
  useLocation,
} from 'react-router';
import { useState, useEffect } from 'react';
import { getYear, parseISO } from 'date-fns';
import { Link, useRouteMatch } from 'react-router-dom';
import Notiflix from 'notiflix';

import { fetchMovieById } from '../../../services/api';
import Reviews from '../Reviews/Reviews';
import Cast from '../Cast/Cast';
import s from '../MovieDetails/MovieDetails.module.css';

export default function MovieDetails() {
  const [movie, setMovie] = useState('');
  const [genres, setGenres] = useState([]);
  const [state, setState] = useState('idle');
  const [goBack, setGoBack] = useState('');
  const history = useHistory();
  const location = useLocation();

  let { movieId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (location.state) {
      setGoBack(location.state.from);
    }

    fetchMovieById(movieId)
      .then(data => {
        setMovie(data);
        setGenres(data.genres);
      })
      .catch(error => Notiflix.Notify.failure(error));
  }, [location.state, movieId]);

  const handleGoBack = () => {
    history.push(location.state?.from ? location.state.from : '/');
  };

  const changeState = state => {
    setState(state);
  };

  const renderImage = () => {
    if (!movie.poster_path) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png';
    }
    return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  };

  return (
    <>
      {movie && (
        <>
          <button className={s.btnBack} onClick={handleGoBack}>
            Go back
          </button>
          <div className={s.container}>
            <div className={s.info}>
              <h1 className={s.title}>
                {movie.title}
                {movie.release_date &&
                  `(${getYear(parseISO(movie.release_date))})`}
              </h1>
              <p className={s.about}>
                User Popularity: {Math.round(movie.popularity)}
              </p>
              <h2 className={s.details}>Overview</h2>
              <p className={s.about}>{movie.overview}</p>
              <h3 className={s.details}>Genres</h3>
              <p className={s.about}>{genres.map(genre => `${genre.name} `)}</p>
              <h4 className={s.details}>Additional information</h4>
              <ul>
                <li>
                  <Link
                    to={{
                      pathname: `${url}/cast`,
                      state: { from: `${goBack}` },
                    }}
                    className={s.link}
                  >
                    Show Cast
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: `${url}/reviews`,
                      state: { from: `${goBack}` },
                    }}
                    className={s.link}
                  >
                    Show Reviews
                  </Link>
                </li>
              </ul>
              <div>
                <Switch>
                  <Route path={`${url}/cast`}>
                    <Cast
                      movieId={movieId}
                      state={state}
                      changeState={changeState}
                    ></Cast>
                  </Route>
                  <Route path={`${url}/reviews`}>
                    <Reviews
                      movieId={movieId}
                      state={state}
                      changeState={changeState}
                    ></Reviews>
                  </Route>
                </Switch>
              </div>
            </div>

            <div className={s.image}>
              <img src={renderImage()} alt={movie.title} width="240px" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
