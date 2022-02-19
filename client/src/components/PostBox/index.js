import './style.css';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

function PostBox() {
    const [postMessage, setPostMessage] = useState('');
    const [postImage, setPostImage] = useState('');

    const sendPost = (e) => {
        e.preventDefault();

        setPostMessage('');
        setPostImage('');
    };

    return (
        <div className='postBox'>
            <form>
                <Avatar />
                <div className='postBox__input'>
                    <input
                        value={postMessage}
                        onChange={(e) => setPostMessage(e.target.value)}
                        placeholder="Whatcha playin'?"
                        type='text'
                    />
                </div>
                <input
                    value={postImage}
                    onChange={(e) => setPostImage(e.target.value)}
                    type='text'
                    className='postBox__imageInput'
                />
                <Button onClick={sendPost} type='submit' className='postBox__button'>
                    Post
                </Button>

            </form>
        </div>
    );
}

export default PostBox;