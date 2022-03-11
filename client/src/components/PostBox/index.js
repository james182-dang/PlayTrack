import './style.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

function PostBox() {
    const [postText, setPostText] = useState('');
    const [postFormData, setPostFormData] = useState({ postText: '' })
    const [postImage, setPostImage] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_POSTS });
                cache.writeQuery({
                    query: QUERY_POSTS,
                    data: { posts: [addPost, ...posts] }
                });
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, posts: [...me.posts, addPost] } }
            });
        }
    });

    const handleChange = event => {

        const { name, value } = event.target;
        setPostFormData({ ...postFormData, [name]: value });

        if (event.target.value.length <= 280) {
            setPostText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const sendPost = async event => {
        event.preventDefault();

        try {
            await addPost({
                variables: { postText }
            });

            setPostText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className='postBox'>
            <form onSubmit={sendPost}>
                <Avatar />
                <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                    Character Count: {characterCount}/280
                    {error && <span className='ml-2'>Something went wrong...</span>}
                </p>
                <div className='postBox__input'>
                    <input
                        value={postText}
                        onChange={handleChange}
                        placeholder="Whatcha playin'?"
                        type='text'
                    />
                </div>
                <Button type='submit' className='postBox__button'>
                    Post
                </Button>

            </form>
        </div>
    );
}

export default PostBox;