import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST } from '../../utils/queries';
import { ADD_COMMENT } from '../../utils/mutations';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';
import Auth from '../../utils/auth';
import './style.css';
import 'animate.css';

const SinglePost = props => {

    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='singlePost'>
            <div className='talk-bubble tri-right left-in round'>
                <div className='post__date'>
                <span style={{ fontWeight: 700 }}>
                    {post.username}
                </span>{' '}
                {post.createdAt}
                </div>

                <div>
                <p className='post__body'>{post.postText}</p>
            </div>

            </div>


            <div>

                {post.commentCount > 0 && <CommentList comments={post.comments} />}
                {Auth.loggedIn() && <CommentForm postId={post._id} />}
            </div>
        </div>
    );
}

export default SinglePost;