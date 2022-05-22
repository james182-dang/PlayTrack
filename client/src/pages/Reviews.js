import { useQuery } from '@apollo/client';
import { Redirect, useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME, QUERY_COMPLETED_GAMES, QUERY_ME_BASIC } from '../utils/queries';
import CompletedGameList from '../components/CompletedGameList';
import ReviewList from '../components/ReviewList';
import Auth from '../utils/auth';
import { useEffect } from 'react';

const Reviews = () => {

    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to='/reviews' />;
    }
    
    if (user.completedGameCount === 0) {
        return (
        <div className='reviews'>
            <div className='myHeader'>
                <h2>Reviews</h2>
            </div>

            <div style={{color: '#D3D3D3'}}>You must complete a game before you can leave a review.</div>
        </div>
        )};

    if (user.reviewCount === 0) {
        return (
            <div className='reviews'>
                <div className='myHeader'>
                    <h2>Reviews</h2>
                </div>

                <div className='noReviews'>
                    <h4>
                    The Reviews tab is to see your reviews across various games.
                    To get started, select a game from your Completed Game List
                    and leave a review.
                    </h4>
                </div>

                <div className='centerList'>
                    <CompletedGameList user={user} games={user.completedGames} />
                </div>
            </div>
        )
    }

    return (
        <div className='reviews'>
            <div className='myHeader'>
                <h2>
                    {userParam ? `${user.username}'s Reviews` : 'Your Reviews'}
                </h2>
            </div>

            <div className='searchResults'>
                <h4>Choose a game from your Completed Games List to review</h4>

            </div>

            <div className='centerList'>
                <CompletedGameList user={user} games={user.completedGames} />
            </div>

            <div className='centerList'>
                <div className='yourReviews'>
                    Your Reviews
                </div>
                <ReviewList reviews={user.reviews} />
            </div>
        </div>
    );
}

export default Reviews;