import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getGame } from '../utils/API';
import { getSavedGameIds } from '../utils/localStorage';
import Auth from '../utils/auth';
import { Container, Col, Form, Button, CardColumns } from 'react-bootstrap';
import {Card, CardBody, CardTitle, CardImg} from 'reactstrap';


const Explore = () => {
    
    const [searchedGames, setSearchedGames] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

    //eslint-disable-next-line
    // const [saveGame, { error }] = useMutation(SAVE_GAME);

    

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            

            const response = await getGame(searchInput);

            if (!response.ok) {
                throw new Error('Something went wrong...');
            }

            const result = await response.json();

            const gameData = result.map((game) => ({
                
                gameId: game.id,
                name: game.name,
                cover: game.cover,
                platforms: game.platforms,
                
            }));

            setSearchedGames(gameData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    // function to handle saving game to db
    const handleSaveGame = async (gameId) => {
        const gameToSave = searchedGames.find((game) => game.gameId === gameId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await handleSaveGame({

                // THIS
                // MUST
                // BE
                // FILLED
                // IN
                // WITH
                // API
                // DATA
                // DONT
                // FORGET
            });

            setSavedGameIds([...savedGameIds, gameToSave.gameId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='explore'>
            <div className='myHeader'>
                <h2>
                    Explore
                </h2>
            </div>

                <div className='searchResults'>
                    <h2>
                        {searchedGames?.length
                            ? `Viewing ${searchedGames.length} results:`
                            : 'Search for a game to begin'}
                    </h2>
                </div>
                
            <div className='exploreSearch'>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                                name='searchInput'
                                className='exploreSearch'
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type='text'
                                size='lg'
                                placeholder='Search for a Game'
                            />
                        </Col>
                        <Col xs={12} md={4}>
                            <Button type='submit' variant='success' size='lg'>
                                Submit Search
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>

                <Container className='exploreContainer'>
                    <CardColumns className='cards'>
                        {searchedGames.map((game) => {
                            return (
                                <Link key={game.gameId} to={`/explore/game/${game.gameId}`}>
                                    <Card key={game.gameId} border='dark' className='card'>
                                        {game.cover ? (
                                            <CardImg src={'http:' + game.cover.url} alt={`The cover for ${game.name}`} className='card__image' />
                                        ) : null}
                                        <CardBody>
                                            <CardTitle className='card__title'>{game.name}</CardTitle>
                                            <CardTitle className='card__title'>{game.platforms?.map(platform => (<p key={platform.id}>{platform.name}</p>))}</CardTitle>
                                        </CardBody>
                                    </Card>
                                </Link>
                            );
                        })}
                    </CardColumns>
                </Container>
        </div>
    );
}

export default Explore;