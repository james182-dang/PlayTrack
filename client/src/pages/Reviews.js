import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_COMPLETED_GAMES, QUERY_ME_BASIC } from '../utils/queries';
import CompletedGameList from '../components/CompletedGameList';
import Auth from '../utils/auth';

const Reviews = () => {

    const { loading, data } = useQuery(QUERY_COMPLETED_GAMES);

    const user = data?.me || {};

    const completedGames = user.completedGames || [];
    
    const loggedIn = Auth.loggedIn();

    if (!user.completedGames) {
        return <div>
            <div className='myHeader'>
                <h2>Reviews</h2>
            </div>

            <div>You must complete a game before you can leave a review.</div>
        </div>
    };

    return (
        <div>
            <div className='myHeader'>
                <h2>
                    Reviews
                </h2>
            </div>

            <div>
                <h4>Select the game you wish to review</h4>

                <CompletedGameList completedGames={completedGames} />
            </div>


        </div>
    );
}

export default Reviews;