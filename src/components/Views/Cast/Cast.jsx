import { useState, useEffect } from 'react';
import { fetchActorsById } from '../../../services/api';
import Notiflix from 'notiflix';
import Loader from 'react-loader-spinner';
import s from './Cast.module.css';

export default function Cast({ movieId }) {
  const [actors, setActors] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');

    fetchActorsById(movieId)
      .then(actors => setActors(actors.cast))
      .catch(error => Notiflix.Notify.failure(error))
      .finally(() => setStatus('resolved'));
  }, [movieId]);

  const renderImage = actor => {
    if (!actor.profile_path) {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png';
    }
    return `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;
  };

  return (
    <>
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
        <ul className={s.container}>
          {actors.map(actor => (
            <li className={s.card} key={actor.id}>
              <img src={renderImage(actor)} alt={actor.name} width="240px" />
              <p className={s.item}>
                <span className={s.title}>Actor name: </span>
                {actor.name}
              </p>
              <p className={s.item}>
                <span className={s.title}>Character: </span>
                {actor.character || 'no info 😔'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
