import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../utils/localStorage';
import Talk from 'talkjs';
import './style.css';

const MessageFriends = ({ friends }) => {

    const [currentUser, setCurrentUser] = useState(getCurrentUser());

    useEffect(() => {
        setCurrentUser(currentUser);
    })

    const handleClick = async (userId) => {

        const user = friends.find(user => user._id === userId);

        Talk.ready
          .then(() => {
              const me = new Talk.User(currentUser);
              const other = new Talk.User(user)

              // Create a talk session if one does not exist
              if (!window.talkSession) {
                  window.talkSession = new Talk.Session({
                      appId: 't4W3co0r',
                      me: me
                  });
              }

              // Get conversation ID or create one
              const conversationId = Talk.oneOnOneId(me, other);
              const conversation = window.talkSession.getOrCreateConversation(conversationId);

              // Set participants
              conversation.setParticipant(me);
              conversation.setParticipant(other);

              // Create and mount chatbox in container
              this.chatbox = window.talkSession.createChatbox(conversation);
              this.chatbox.mount(this.container);
          }).catch(e => console.error(e));
    };



    if (!friends || !friends.length) {
        return <p>You need to add a friend in order to message them!</p>;
    }

    return (
        <div className='friendMessageList'>

            <div>
                <div>
                    {currentUser &&
                        <div className='friendInfoContainer'>
                            <div className='friendInfo'>
                                <h3>{currentUser.username}</h3>
                            </div>
                        </div>    
                        }
                </div>
            </div>

            <div className='friendMessageListContainer'>
                <ul>
                    {friends.map(friend => (
                        <li key={friend._id} className='friend'>
                            <h4 className='friendToMessage'>
                                <div className='friendInfoContainer'>
                                    <div className='friendInfo'>
                                        <h4>{friend.username}</h4>
                                    </div>

                                    <div className='friendMessage'>
                                        <button onClick={handleClick}>Message</button>
                                    </div>
                                </div>
                            </h4>
                        </li>
                    ))}
                </ul>

                <div className='chatbox__container'>
                    <div id='talkjs-container' style={{height: '300px'}}><i></i></div>
                </div>
            </div>
        </div>
    );
}

export default MessageFriends;