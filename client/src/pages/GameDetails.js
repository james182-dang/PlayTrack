import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { COMPLETE_GAME, ADD_NOW_PLAYING } from '../utils/mutations';
import { getSpecificGame } from '../utils/API';
import { Button } from 'react-bootstrap';
import { saveGameIds, getSavedGameIds, nowPlayingIds, getNowPlayingIds } from '../utils/localStorage';
import Auth from '../utils/auth';

const GameDetails = props => {

    const [selectedGame, setSelectedGame] = useState([]);

    const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

    const [nowPlayingIds, setNowPlayingIds] = useState(getNowPlayingIds());

    const [completeGame, { error }] = useMutation(COMPLETE_GAME);

    const [addNowPlaying, { NPerror }] = useMutation(ADD_NOW_PLAYING);

    const { id: gameId } = useParams();

    useEffect(() => {
        return () => saveGameIds(savedGameIds);
    });

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

    const handleCompleteGame = async (gameId) => {
        
        const gameToComplete = selectedGame.find((game) => game.gameId === gameId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const data = await completeGame({
                variables: { addGame: { ...gameToComplete } },
            });

            console.log(data);

            setSavedGameIds([...savedGameIds, gameToComplete.gameId]);
        } catch (err) {
            console.error(err);
        }

    };

    const handleAddNowPlaying = async (gameId) => {

        const gameNowPlaying = selectedGame.find((game) => game.gameId === gameId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await addNowPlaying({
                variables: { addNowPlaying: { gameId } },
            });

            console.log(data);

            setNowPlayingIds([...nowPlayingIds, gameNowPlaying.gameId])
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='gameDetails'>
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
                            <Button
                              disabled={savedGameIds?.some((savedGameId) => savedGameId === game.gameId)}
                              onClick={() => handleCompleteGame(game.gameId)}>
                              {savedGameIds?.some((savedGameId) => savedGameId === game.gameId)
                                ? "You've completed this game!"
                                : 'Complete this Game'}
                            </Button>
                        </div>

                        <div>
                            <Button
                              disabled={nowPlayingIds?.some((nowPlayingId) => nowPlayingId === game.gameId)}
                              onClick={() => handleAddNowPlaying(game.gameId)}>
                              {nowPlayingIds?.some((nowPlayingId) => nowPlayingId === game.gameId)
                                ? "You're playing this game now!"
                                : 'Set as Now Playing'}
                              </Button>
                        </div>

                        <div>
                            
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