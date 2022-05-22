import './style.css';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';
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

    const { loading, data } = useQuery(QUERY_ME);

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

            const user = data?.me;

            const userImage = user.image;

            await addPost({
                variables: { userImage, postText }
            });

            setPostText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="widget-post" aria-labelledby="post-header-title">
            <div className="widget-post__header">
                <h2 className="widget-post__title" id="post-header-title">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    New Post
                </h2>
            </div>
            <form id="widget-form" className="widget-post__form" name="form" aria-label="post widget" onSubmit={sendPost}>
                <div className="widget-post__content">
                    <label htmlFor="post-content" className="sr-only">Share</label>
                    <textarea name="post" id="post-content" className="widget-post__textarea scroller" placeholder="Whatcha playin'?" value={postText} onChange={handleChange} type='text'></textarea>
                </div>
                <div className="widget-post__options is--hidden" id="stock-options">
                </div>
                <div className="widget-post__actions post--actions">
                    <div className="post-actions__attachments">
                        <Button type="button" className="btn post-actions__upload attachments--btn">
                            <label htmlFor="attach-game" className="post-actions__label">
                                <i className="fa fa-upload" aria-hidden="true"></i>
                                Attach Game
                            </label>
                        </Button>
                        <Button type="button" className="btn post-actions__upload attachments--btn">
                            <label htmlFor="upload-image" className="post-actions__label">
                                <i className="fa fa-upload" aria-hidden="true"></i>
                                Attach Image
                            </label>
                        </Button>
                        <input type="file" id="upload-image" accept="image/*" multiple />
                    </div>
                    <span className='counter'>{characterCount}</span>
                    <div className="post-actions__widget">
                        <Button className="btn post-actions__publish" type="submit">Post</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PostBox;