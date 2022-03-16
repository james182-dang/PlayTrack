import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getGame } from '../utils/API';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';
import Auth from '../utils/auth';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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

            const { result } = await response.json();

            const gameData = result?.map((game) => ({
                
                gameId: game.id,
                name: game.name,
                cover: game.cover.url,

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
        <div>
            <div className='header'>
                <h2>
                    Explore
                </h2>
            </div>

            <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
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

              <h2>
                  {searchedGames?.length
                    ? `Viewing ${searchedGames.length} results:`
                    : 'Search for a game to begin'}
              </h2>
              <CardColumns>
                  {searchedGames?.map((game) => {
                      return (
                          <Card key={game.gameId} border='dark'>
                              {game.cover ? (
                                  <Card.Img src={game.cover} alt={`The cover for ${game.name}`} variant='top' />
                              ) : null}
                              <Card.Body>
                                  <Card.Title>{game.name}</Card.Title>
                              </Card.Body>
                          </Card>
                      )
                  })}
              </CardColumns>
        </div>
    );
}

export default Explore;