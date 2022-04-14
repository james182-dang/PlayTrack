import { Link } from 'react-router-dom';
import './style.css';

function CompletedGameList({ user, games }) {

    if (user.completedGameCount === 0) {
        return (
            <h3>You must complete a game to leave a review.</h3>
        )
    }

    return (
        <div className='completedGameList'>
            <div className='completedGamesContainer'>
                <div className='completedGamesHeader'>
                    <h3>
                        {user.username}'s Completed Games : {user.completedGameCount} adventures had
                    </h3>

                </div>

                <div className='completedGamesContent'>
                    {games &&
                        games.map(completedGame => (
                            <div key={completedGame._id}>
                                <p>
                                    <Link
                                        to={`/explore/game/${completedGame.gameId}`}
                                    >
                                        {completedGame.name}
                                    </Link>{' '}
                                </p>
                            </div>
                        ))}
                </div>

            </div>
        </div>
    );
}

export default CompletedGameList;