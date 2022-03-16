import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_REVIEWS, QUERY_REVIEW, QUERY_ME_BASIC } from '../utils/queries';

const Reviews = () => {
    const { loading, data } = useQuery(QUERY_REVIEWS);

    const { data: userData } = useQuery(QUERY_ME_BASIC);

    const reviews = data?.reviews || [];
    
    const loggedIn = Auth.loggedIn();

    return (
        <div>
            <div className='header'>
                <h2>
                    Reviews
                </h2>
            </div>

            <p>Reviews for Games you know</p>

            <p>Create New Review</p>
        </div>
    );
}

export default Reviews;