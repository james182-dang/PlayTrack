import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import Auth from '../utils/auth';

const SinglePost = props => {

    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });

    const post = data?.post || {};

    return (
        <div className='singlePost'>
            <div className='header'>
                <h2>Post</h2>
            </div>
            <div>
                <p>
                    <span style={{ fontWeight: 700 }}>
                        {post.username}
                    </span>{' '}
                    {post.createdAt}
                </p>
                <div>
                    <p>{post.postText}</p>
                </div>
            </div>

        </div>

    );
}

export default SinglePost;