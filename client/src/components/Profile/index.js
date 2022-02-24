import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import FriendList from '../FriendList';
import Auth from '../../utils/auth';
import './style.css';

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
            <div className='profile__header'>
                <h2>
                    {userParam ? `${user.username}'s ` : 'your'} profile.
                </h2>

                {userParam && (
                    <button onClick={handleClick}>
                        Add Friend
                    </button>
                )}

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