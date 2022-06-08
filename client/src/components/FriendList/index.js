import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Container, Col, Form, Button, CardColumns } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';

const FriendList = ({ friendCount, username, friends }) => {
    if (!friends || !friends.length) {
        return <p>{username}, make some friends!</p>;
    }

    return (
        <div>
            <h5>
                {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
            </h5>

            <Container className='friendsContainer'>
                <CardColumns className='cards'>
                    {friends.map((friend) => {
                        return (
                            <div>
                            <Link key={friend._id} to={`/profile/${friend.username}`}>{friend.username}</Link>
                                <Card className='card'>
                                    {friend.image ? (
                                        <Avatar src={friend.image} />

                                    ) : null}
                                    <CardBody>
                                        <CardTitle className='card__title'>Now Playing: {friend.nowPlaying}</CardTitle>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}
                </CardColumns>
            </Container>
        </div>
    );
}

export default FriendList;