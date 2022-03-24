import { useQuery } from '@apollo/client';
import { QUERY_COMPLETED_GAMES, QUERY_ME_BASIC } from '../../utils/queries';
import Auth from '../../utils/auth';

function CompletedGameList({ games }) {

    return (
        <div className='completedGameList'>
            {games &&
              games.map(completedGame => (
                  <div key={completedGame._id}>
                      <p>
                          {completedGame.gameId}
                      </p>
                  </div>
              ))}
        </div>
    );
}

export default CompletedGameList;