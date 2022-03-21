import { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import { Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';

const Connect = props => {

    const [searchedUsers, setSearchedUsers] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [search, { loading, data }] = useLazyQuery(QUERY_USER, {
        variables: {username: searchInput}
    });

    const [saveFriend, { error }] = useMutation(ADD_FRIEND);

    const user = data?.user || [];

    const loggedIn = Auth.loggedIn();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {

            search();

            setSearchedUsers(user);
            setSearchInput('');
            console.log(searchedUsers);
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
            <div className='myHeader'>
                <h2>
                    Connect
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