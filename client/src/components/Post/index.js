import './style.css';
import Avatar from '@mui/material/Avatar';
import {
    ChatBubbleOutline,
    FavoriteBorder,
    Publish,
    Repeat,
    VerifiedUser
} from '@mui/icons-material';

function Post({ username, verified, text, image, avatar }) {
    return (
        <div className='post'>
            <div className='post__avatar'>
                <Avatar src={avatar} />
            </div>
            <div className='post__body'>
                <div className='post__header'>
                    <div className='post__headerText'>
                        <h3>
                            {username}{' '}
                            <span className='post__headerSpecial'>
                                {verified && <VerifiedUser className='post__badge' />} @{username}
                            </span>
                        </h3>
                    </div>
                    <div className='post__headerDescription'>
                        <p>{text}</p>
                    </div>
                </div>
                <div className='post__footer'>
                    <ChatBubbleOutline fontSize='small' />
                    <Repeat fontsize='small' />
                    <FavoriteBorder fontSize='small' />
                    <Publish fontSize='small' />
                </div>
            </div>
        </div>
    );
}

export default Post;