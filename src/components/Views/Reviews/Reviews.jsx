import { useState, useEffect } from 'react';
import { fetchReviewsById } from '../../../services/api';
import Notiflix from 'notiflix';
import Loader from 'react-loader-spinner';
import s from './Reviews.module.css';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');

    fetchReviewsById(movieId)
      .then(reviews => setReviews(reviews.results))
      .catch(error => Notiflix.Notify.Failure(error))
      .finally(() => setStatus('resolved'));
  }, [movieId]);

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

      {status === 'resolved' && reviews.length === 0 ? (
        <p>Sorry, but we don't have any rewiews for this movie 🤷‍♂️</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li className={s.list} key={review.id}>
              <h2 className={s.item}>
                <span className={s.title}>Review author name: </span>
                {review.author}
              </h2>
              <p>
                <span>Review content: </span>
                {review.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
