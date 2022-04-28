import { Link, useParams, Redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST } from '../../utils/queries';
import { ADD_COMMENT, DELETE_POST } from '../../utils/mutations';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';
import Auth from '../../utils/auth';
import Button from '@mui/material/Button';
import './style.css';
import 'animate.css';

const SinglePost = props => {

    const { id: postId } = useParams();

    const [deletePost, { error }] = useMutation(DELETE_POST, {
        variables: { postId: postId }
    });

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>
    }

    const handleDelete = async event => {
        event.preventDefault();

        try {
            await deletePost({
                variables: { postId }
            });
        } catch (e) {
            console.error(e);
        }

        return <Redirect to='/feed' />;
    }

    return (
        <div className='singlePost'>

            <div className='myHeader'>
                <h2 style={{ color: 'white' }}>{post.username}'s Post</h2>
            </div>

            <div className='postContent'>
                <div className='talk-bubble tri-right left-in round'>
                    <div className='post__date'>
                        <span style={{ fontWeight: 700 }}>
                            {post.username}
                        </span>{' '}
                        {post.createdAt}
                    </div>

                    <div>
                        <p className='post__body'>{post.postText}</p>

                        {Auth.loggedIn() && Auth.getProfile().data.username === post.username
                        && <Button type='submit' onClick={handleDelete}>Delete Post</Button>}
                        
                    </div>

                </div>


                <div className='comments__container'>
                    {post.commentCount > 0 && <CommentList comments={post.comments} />}
                    {Auth.loggedIn() && <CommentForm postId={post._id} />}
                </div>
            </div>
        </div>
    );
}

export default SinglePost;