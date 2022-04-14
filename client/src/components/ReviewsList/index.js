import { Link } from 'react-router-dom';

const ReviewsList = ({ reviews }) => {

    return (
        <div className='review'>
            {reviews &&
              reviews.map(review => (
                  <div key={review._id}>
                      <p className='review__date'>
                          <Link
                            to={`/profile/${review.username}`}
                          >
                              {review.username}
                          </Link>
                          {review.createdAt}
                      </p>

                      <div>
                          <p>{review.reviewText}</p>
                      </div>
                  </div>
              ))}
        </div>
    );
}

export default ReviewsList;