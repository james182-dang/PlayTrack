import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import { Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';

const Connect = () => {

    const [searchedUsers, setSearchedUsers] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const { loading, data } = useQuery(QUERY_USER);

    const [saveFriend, { error }] = useMutation(ADD_FRIEND);

    const user = data?.user || [];
    console.log(user);

    const loggedIn = Auth.loggedIn();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {

            const response = await fetch(`https://www.google.com`);

            if (!response.ok) {
                throw new Error('Something went wrong...');
            }

            const { items } = await response.json();

            const userData = items.map((user) => ({
                userId: user._id,
                username: user.username,
                friends: user.friends
            }))

            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    // function to handle adding a friend to friendlist
    const handleSaveFriend = async (userId) => {
        
        const userToSave = searchedUsers.find((user) => user.userId === userId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveFriend({
                variables: { friendId: { ...userToSave } },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Connect</h1>

            <Form onSubmit={handleFormSubmit}>
                <Form.Row>
                    <Col xs={12} md={8}>
                        <Form.Control
                          name='searchInput'
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          type='text'
                          size='lg'
                          placeholder='Search for users'
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <Button type='submit' variant='success' size='lg'>
                            Submit
                        </Button>
                    </Col>
                </Form.Row>
            </Form>

            <CardColumns>
                {searchedUsers.map((user) => {
                    return (
                        <Card key={user.username} border='dark'>
                            {user.image ? (
                                <Card.Img src={user.image} alt={`The avatar for ${user.username}`} variant='top' />
                            ) : null}
                            <Card.Body>
                                <Card.Title>{user.username}</Card.Title>
                                <p className='small'>Friends: {user.friends}</p>
                                <Card.Text>{user.friendCount}</Card.Text>
                                {Auth.loggedIn() && (
                                    <Button
                                      className='btn-block btn-info'
                                      onClick={() => handleSaveFriend(user.userId)}>
                                    
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    );
                })};
            </CardColumns>
        </div>
    );
}

export default Connect;