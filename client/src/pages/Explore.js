import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '../utils/mutations';
import { getGameToken } from '../utils/API';
import { Form, Button, Dropdown, Col } from 'react-bootstrap';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';
import Auth from '../utils/auth';

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
            
            getGameToken();
            const response = await fetch(`https://api.igdb.com/v4/${searchInput}`)

            if (!response.ok) {
                throw new Error('Something went wrong...');
            }

            const { items } = await response.json();

            const gameData = items.map((game) => ({
                
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

            }));

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
            <h1>Search for Games</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Row>
                    <Col xs={12} md={8}>
                        <Form.Control
                          name='searchInput'
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          type='text'
                          size='lg'
                          placeholder='Search Games'
                        />
                    </Col>
                <Col xs={12} md={4}>
                    <Dropdown>
                        <Dropdown.Toggle variant='success' id='dropdown'>
                            Specific system?
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item>NES</Dropdown.Item>
                            <Dropdown.Item>SNES</Dropdown.Item>
                            <Dropdown.Item>N64</Dropdown.Item>
                            <Dropdown.Item>Gamecube</Dropdown.Item>
                            <Dropdown.Item>DS</Dropdown.Item>
                            <Dropdown.Item>3DS</Dropdown.Item>
                            <Dropdown.Item>Wii</Dropdown.Item>
                            <Dropdown.Item>Nintendo Switch</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                </Form.Row>
            </Form>
        </div>
    );
}

export default Explore;