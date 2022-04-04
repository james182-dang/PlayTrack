import { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import CompletedGameList from '../components/CompletedGameList';
import FriendList from '../components/FriendList';
import PostList from '../components/PostList';
import Auth from '../utils/auth';

const Profile = () => {
    const [addFriend] = useMutation(ADD_FRIEND);

    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

    // redirect to personal profile page if username is the same as the logged-in user
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to='/profile' />;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this page.
            </h4>
        )
    }

    const handleClick = async () => {
        try {
            await addFriend({
                variables: { id: user._id }
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='profile'>
            <div className='myHeader'>
                <h2>
                    {userParam ? `${user.username}` : 'Your Profile'}
                </h2>
            </div>

            <div>
                <h4>
                    {! loading && user.bio
                      ? `${user.bio}`
                      : `${user.username} has not set up a bio.`}
                </h4>
                    

            </div>

            <div>
                <h4>
                    {userParam ? `${user.username}'s ` : 'Your'} favorite game
                </h4>
            </div>

            <div>
                <h4>
                    {! loading && user.completedGameCount
                      ? `Viewing ${user.completedGameCount} completed ${user.completedGameCount === 1 ? 'game' : 'games'}`
                      : 'You have no completed games.'}
                </h4>

                <CompletedGameList games={user.completedGames} />
            </div>

            <div>
                {userParam && (
                    <button onClick={handleClick}>
                        Follow {`${user.username}`}.
                    </button>
                )}
            </div>

            <div>
                <PostList posts={user.posts} />
            </div>


            <div>
                <FriendList
                  username={user.username}
                  friendCount={user.friendCount}
                  friends={user.friends}
                />
            </div>
        </div>
    );
}

export default Profile;