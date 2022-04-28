import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import {
    ChatBubbleOutline,
    FavoriteBorder,
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
                            style={{ fontWeight: 700 }}
                            className='post__header'
                            style={{ textDecoration: 'none' }}
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
                              <ChatBubbleOutline fontSize='small' />{post.commentCount}
                          </div>
                          <SportsEsportsOutlinedIcon fontSize='small' />
                          <div>
                            <FavoriteBorder fontSize='small' />{post.likeCount}
                          </div>
                          <Publish fontSize='small' />
                      </div>
                  </div>
              ))}
        </div>
    );
}

export default PostList;