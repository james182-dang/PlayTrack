import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {
    ChatBubbleOutline,
    FavoriteBorder,
    SportsEsportsOutlined,
    Publish
} from '@mui/icons-material';
import './style.css';

const PostList = ({ posts }) => {

    return (
        <div className='post'>
            {posts &&
              posts.map(post => (
                  <div key={post._id} className='talk-bubble tri-right left-in round'>
                      <div className='post__date'>
                          <Link
                            to={`/profile/${post.username}`}
                            style={{ fontWeight: 700, textDecoration: 'none' }}
                            className='post__header'
                          >
                              <Avatar src={post.userImage} />
                              {post.username}
                          </Link>{' '}
                      </div>
                      <div>
                          <Link to={`/feed/post/${post._id}`} className='post__body'>
                              <p>{post.postText}</p>
                          </Link>
                      </div>

                      <div className='post__createdAt'>
                          {post.createdAt}
                      </div>

                      <div className='post__footer'>
                          <div>
                            <IconButton aria-label='comments' style={{ color: 'white' }}>
                                <ChatBubbleOutline fontSize='small' />{post.commentCount}
                            </IconButton>
                          </div>
                          <div>
                            <IconButton aria-label='game' style={{ color: 'white' }}>
                                <SportsEsportsOutlined fontSize='small' />
                            </IconButton>
                          </div>
                          <div>
                            <IconButton aria-label="favorite" style={{ color: 'white' }}>
                                <FavoriteBorder fontSize='small' />{post.likeCount}
                            </IconButton>
                          </div>
                          <div>
                            <IconButton aria-label='publish' style={{ color: 'white' }}>
                                <Publish fontSize='small' />
                            </IconButton>
                          </div>
                      </div>
                  </div>
              ))}
        </div>
    );
}

export default PostList;