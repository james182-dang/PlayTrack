import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { getSpecificGame } from '../utils/API';

const GameDetails = props => {

    const [selectedGame, setSelectedGame] = useState([]);

    const { id: gameId } = useParams();

    useEffect(() => {

        async function getGameId(gameId) {

            const response = await getSpecificGame(gameId);

            if (!response.ok) {
                throw new Error('Something went wrong...');
            }

            const result = await response.json();

            const gameData = result?.map((game) => ({

                gameId: game.id,
                name: game.name,
                cover: game.cover,
                summary: game.summary,
                platforms: game.platforms,
                genres: game.genres,
                
            }));

            setSelectedGame(gameData);
        }

        getGameId(gameId);

    }, [])


    return (
        <div>
            {selectedGame.map((game) => {
                <div className='myHeader'>
                    <h2>
                        {game.name}
                    </h2>
                </div>
            })}

            <div>
                <h5>Genre:</h5>
            </div>

            <div>
                <h5>Companies involved: </h5>
            </div>
        </div>
    )
}

export default GameDetails;