import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';
import { Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';

const Connect = props => {

    const [searchedUsers, setSearchedUsers] = useState([]);

    const [preSearchInput, setPreSearchInput] = useState('');

    const [searchInput, setSearchInput] = useState('');

    const [search, { loading, data }] = useLazyQuery(QUERY_USER, {
        variables: {username: searchInput}
    });

    const [saveFriend, { error }] = useMutation(ADD_FRIEND);

    const user = data?.user || [];

    const loggedIn = Auth.loggedIn();

    if (loading) return (
        <div>Loading...</div>
    );

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setSearchInput(preSearchInput);

        if (!searchInput) {
            return false;
        }

        try {

            const response = search();

            setSearchedUsers(response.data);
            setSearchInput('');
            setPreSearchInput('');
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
        <div className='connect'>
            <div className='myHeader'>
                <h2>
                    Connect
                </h2>
            </div>

            <div className='searchResults'>
                <h2>
                    {searchedUsers?.length
                        ? `${searchedUsers.length} results`
                        : 'Connect with friends!'}
                </h2>
            </div>

            <div className='exploreSearch'>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Row>
                        <Col xs={12} md={8}>
                            <Form.Control
                                name='searchInput'
                                className='exploreSearch'
                                value={preSearchInput}
                                onChange={(e) => setPreSearchInput(e.target.value)}
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
            </div>

            {/* TEST DISPLAY ONLY, NEEDS REWORKING */}
            <div>
                {data && (
                    <>
                        <Link
                            to={`/profile/${user.username}`}
                            style={{ fontWeight: 700, textDecoration: 'none' }}
                        >
                            {user.username}
                        </Link>
                        <br />
                        Posts: {user.postCount}
                        <br />
                        Friends: {user.friendCount}
                        {Auth.loggedIn() && (
                            <Button className='btn-block btn-info' onClick={() => handleSaveFriend(data.user.userId)}>
                                Add Friend
                            </Button>
                        )}
                    </>
                )}
            </div>

            {/* <CardColumns>
                {searchedUsers?.map((data) => {
                    return (
                        <Card key={data.user.username} border='dark'>
                            {data.user.image ? (
                                <Card.Img src={data.user.image} alt={`The avatar for ${data.user.username}`} variant='top' />
                            ) : null}
                            <Card.Body>
                                <Card.Title>{data.user.username}</Card.Title>
                                <p className='small'>Friends: {data.user.friends}</p>
                                <Card.Text>{data.user.friendCount}</Card.Text>
                                {Auth.loggedIn() && (
                                    <Button
                                      className='btn-block btn-info'
                                      onClick={() => handleSaveFriend(data.user.userId)}>
                                    
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    );
                })};
            </CardColumns> */}
        </div>
    );
}

export default Connect;