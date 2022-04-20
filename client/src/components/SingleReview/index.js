import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_REVIEW } from '../../utils/queries';
import { ADD_COMMENT } from '../../utils/mutations';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';
import Auth from '../../utils/auth';
import './style.css';
import 'animate.css';

const SingleReview = props => {

    const { id: reviewId } = useParams();

    const { loading, data } = useQuery(QUERY_REVIEW, {
        variables: { id: reviewId }
    });

    const review = data?.review || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='singleReview'>
            <div className='myHeader'>
                <h2 style={{ color: 'white' }}>{review.username}'s {review.gameName} review</h2>
            </div>

            <div className='reviewContent'>
                <div className='talk-bubble tri-right left-in round'>
                    <div className='review__date'>
                        <span style={{ fontWeight: 700 }}>
                            <Link
                              to={`/profile/${review.username}`}
                            >
                            {review.username}
                            </Link>
                        </span>{' '}
                        {review.createdAt}
                    </div>

                    <div>
                        <p className='review__body'>{review.reviewText}</p>
                    </div>
                </div>

                <div className='comment__container'>
                    {review.commentCount > 0 && <CommentList comments={review.comments} />}
                    {Auth.loggedIn() && <CommentForm reviewId={review._id} />}
                </div>
            </div>
        </div>        
    );
}

export default SingleReview;