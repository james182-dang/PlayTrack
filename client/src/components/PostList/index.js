import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import './style.css';

const PostList = ({ posts, title }) => {
    if (!posts.length) {
        return <h3>No Posts Yet...</h3>;
    }

    return (
        <div className='post'>
            <h3>{title}</h3>
            {posts &&
              posts.map(post => (
                  <div key={post._id} >
                      <p className='post__header'>
                          <Link
                            to={`/profile/${post.username}`}
                            style={{ fontWeight: 700 }}
                            className='text-light'
                            style={{ textDecoration: 'none' }}
                          >
                              {post.username}
                          </Link>{' '}
                          post on {post.createdAt}
                      </p>
                      <div className='post__body'>
                          <Link to={`/post/${post._id}`}>
                              <p>{post.postText}</p>
                              <p className='mb-0'>
                                  Comments: {post.commentCount} || Click to{' '}
                                  {post.commentCount ? 'see' : 'start'} the discussion!
                              </p>
                          </Link>
                      </div>
                  </div>
              ))}
        </div>
    );
}

export default PostList;