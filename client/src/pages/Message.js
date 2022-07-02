import { useQuery, useMutation } from '@apollo/client';

const Message = props => {

    return (
        <div className='message'>
            <div className='myHeader'>
                <h2 style={{ color: 'white' }}>Message</h2>
            </div>

            <div className='messageParent'>

            </div>
        </div>
    );
}

export default Message;