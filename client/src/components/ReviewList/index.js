import { Link } from 'react-router-dom';

const ReviewList = ({ reviews }) => {
    return (
        <div className='review'>
            {reviews &&
              reviews.map(review => (
                  <div key={review._id}>
                    <p className='post__date'>
                        <Link
                          to={`/profile/${review.username}`}
                          style={{ fontWeight: 700 }}
                          className='post__header'
                          style={{ textDecoration: 'none' }}
                        >
                            {review.username}
                        </Link>{' '}
                        {review.createdAt}
                    </p>
                    <div>
                        <Link to={`/reviews/${review._id}`} className='post__body'>
                            <p>{review.reviewText}</p>
                        </Link>
                    </div>
                  </div>
              ))}
        </div>
    );
}

export default ReviewList;