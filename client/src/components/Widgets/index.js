import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { Link } from 'react-router-dom';
import FriendList from '../FriendList';
import './style.css';

function Widgets() {

    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || {};

    return (
        <div className='widgets'>
            <div className='widgets__widgetContainer'>
                <h2>What They're Playin'</h2>


            </div>

            <div className='widgetContent'>

                <FriendList
                    username={user.username}
                    friendCount={user.friendCount}
                    friends={user.friends}
                />

            </div>
        </div>
    );
}

export default Widgets;