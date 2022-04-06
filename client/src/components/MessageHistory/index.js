import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../utils/localStorage';
import Talk from 'talkjs';

const MessageHistory = () => {

    const [currentUser, setCurrentUser] = useState(getCurrentUser());

    useEffect(() => {
        setCurrentUser(currentUser);

        Talk.ready
          .then(() => {
              const me = new Talk.User(currentUser);

              if (!window.talkSession) {
                  window.talkSession = new Talk.Session({
                      appId: 't4W3co0r',
                      me: me
                  });
              }

              inbox = window.talkSession.createInbox();
              this.inbox.mount(this.container);
          }).catch(e => console.error(e));
    }, [])

    return (
        <Fragment>
            <div style={{ height: '500px' }} className='inbox-container'>Loading...</div>
        </Fragment>
    );
}

export default MessageHistory;