import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import {
    ChatBubbleOutline,
    FavoriteBorder,
    Publish,
    Repeat,
    VerifiedUser
} from '@mui/icons-material';
import './style.css';

const PostList = ({ posts }) => {


    return (
        <div className='post'>
            {posts &&
              posts.map(post => (
                  <div key={post._id} className='talk-bubble tri-right left-in round'>
                      <p>
                          <Link
                            to={`/profile/${post.username}`}
                            style={{ fontWeight: 700 }}
                            className='post__header'
                            style={{ textDecoration: 'none' }}
                          >
                              {post.username}
                          </Link>{' '}
                         {post.createdAt}
                      </p>
                      <div>
                          <Link to={`/post/${post._id}`} className='post__body'>
                              <p>{post.postText}</p>
                              <p>
                                  Comments: {post.commentCount} || Click to{' '}
                                  {post.commentCount ? 'see' : 'start'} the discussion!
                              </p>
                          </Link>
                      </div>
                      <div className='post__footer'>
                          <ChatBubbleOutline fontSize='small' />
                          <Repeat fontSize='small' />
                          <FavoriteBorder fontSize='small' />
                          <Publish fontSize='small' />
                      </div>
                  </div>
              ))}
        </div>
    );
}

export default PostList;