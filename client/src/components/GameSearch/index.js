import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '../utils/mutations';
import { getGameToken } from '../utils/API';
import { Form, Button, Dropdown, Col } from 'react-bootstrap';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';
import Auth from '../utils/auth';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SonyConsoleList from '../components/SonyConsoleList';
import SonyPortableList from '../components/SonyPortableList';
import NintendoConsoleList from '../components/NintendoConsoleList';
import NintendoPortableList from '../components/NintendoPortableList';
import MicrosoftConsoleList from '../components/MicrosoftConsoleList';

const GameSearch = () => {
    
    const [searchedGames, setSearchedGames] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

    const 

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

    const handleGameSearch = async (consoleTypeOption, manufacturerOption) => {
        if (manufacturerOption.value === 'Nintendo') {
            if (consoleTypeOption.value === 'console') {
                return <NintendoConsoleList />;
            } else {
                return <NintendoPortableList />
            }
        } else if (manufacturerOption.value === 'Sony') {
            if (consoleTypeOption.value === 'console') {
                return <SonyConsoleList />
            } else {
                return <SonyPortableList />
            }
        } else if (manufacturerOption.value === 'Microsoft') {
            return <MicrosoftConsoleList />
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

                    <FormControl>
                        <FormLabel id="ratingOption">Rating</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Everyone" control={<Radio />} label="Everyone" />
                            <FormControlLabel value="Teen" control={<Radio />} label="Teen" />
                            <FormControlLabel value="Mature" control={<Radio />} label="Mature" />
                        </RadioGroup>
                    </FormControl>
                </Form.Row>

                <Form.Row>
                    <FormControl>
                        <FormLabel id="consoleTypeOption">Type</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Console" control={<Radio />} label="Console" />
                            <FormControlLabel value="Portable" control={<Radio />} label="Portable" />
                        </RadioGroup>
                    </FormControl>
                </Form.Row>

                <Form.Row>
                    <FormControl>
                        <FormLabel id="manufacturerOption">Manufacturers</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Nintendo" control={<Radio />} label="Nintendo" />
                            <FormControlLabel value="Sony" control={<Radio />} label="Sony" />
                            <FormControlLabel value="Microsoft" control={<Radio />} label="Microsoft" />
                        </RadioGroup>
                    </FormControl>
                </Form.Row>


            </Form>
        </div>
    );
}
export default GameSearch;