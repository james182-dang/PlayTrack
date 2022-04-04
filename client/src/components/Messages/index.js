import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import MessageFriends from '../MessageFriends';
import './style.css';

const Messages = (props) => {

    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || {};

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to use Messaging.
            </h4>
        )
    }

    return (
        <div className='messages'>
            <div className='myHeader'>
                <h2>
                    Messages
                </h2>
            </div>

            <div className='messages__container'>
                <MessageFriends
                  friends={user.friends}
                />
            </div>
        </div>
    );
}

export default Messages;