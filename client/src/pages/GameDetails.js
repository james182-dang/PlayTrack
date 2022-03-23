import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { getSpecificGame } from '../utils/API';
import { Button } from 'react-bootstrap';

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

            const gameData = result.map((game) => ({

                gameId: game.id,
                name: game.name,
                cover: game.cover,
                summary: game.summary,
                platforms: game.platforms,
                platformId: game.platforms,
                genres: game.genres,
                genreId: game.genres,
                
            }));

            setSelectedGame(gameData);

        }

        getGameId(gameId);

    }, [])


    return (
        <div>
            {selectedGame.map((game) => {
                return (
                    <div key={game.gameId}>
                        <div className='myHeader'>
                            <h2>
                                {game.name}
                            </h2>
                        </div>

                        <div className='main_card'>
                            <div>
                                <img src={'http:' + game.cover.url} alt={`The cover for ${game.name}`} className='card_image'></img>
                            </div>

                            <div>
                                <h4>
                                    {game.platforms?.length === 1 ? 'Platform' : 'Platforms'}: {game.platforms?.map(platform => (<p key={platform.id}>{platform.name}</p>))}
                                </h4>

                                <h4>
                                    {game.genres?.length === 1 ? 'Genre' : 'Genres'}: {game.genres?.map(genre => (<p key={genre.id}>{genre.name}</p>))}
                                </h4>

                            </div>
                        </div>

                        <div>
                            <Button>Add to Completed Games</Button>
                        </div>


                        <div className='summary'>
                            Summary: {game.summary}
                        </div>
                    </div>
                );
            })}


        </div>
    )
}

export default GameDetails;