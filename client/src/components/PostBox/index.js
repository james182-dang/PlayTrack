import './style.css';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
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
        <div class="widget-post" aria-labelledby="post-header-title">
            <div class="widget-post__header">
                <h2 class="widget-post__title" id="post-header-title">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                    New Post
                </h2>
            </div>
            <form id="widget-form" class="widget-post__form" name="form" aria-label="post widget" onSubmit={sendPost}>
                <div class="widget-post__content">
                    <label for="post-content" class="sr-only">Share</label>
                    <textarea name="post" id="post-content" class="widget-post__textarea scroller" placeholder="Whatcha playin'?" value={postText} onChange={handleChange} type='text'></textarea>
                </div>
                <div class="widget-post__options is--hidden" id="stock-options">
                </div>
                <div class="widget-post__actions post--actions">
                    <div class="post-actions__attachments">
                        <Button type="button" class="btn post-actions__upload attachments--btn">
                            <label for="attach-game" class="post-actions__label">
                                <i class="fa fa-upload" aria-hidden="true"></i>
                                Attach Game
                            </label>
                        </Button>
                        <Button type="button" class="btn post-actions__upload attachments--btn">
                            <label for="upload-image" class="post-actions__label">
                                <i class="fa fa-upload" aria-hidden="true"></i>
                                Attach Image
                            </label>
                        </Button>
                        <input type="file" id="upload-image" accept="image/*" multiple />
                    </div>
                    <span className='counter'>{characterCount}</span>
                    <div class="post-actions__widget">
                        <Button class="btn post-actions__publish" type="submit">Post</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PostBox;