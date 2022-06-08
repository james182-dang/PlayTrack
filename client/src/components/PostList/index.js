import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST, QUERY_ME } from '../../utils/queries';
import { ADD_LIKE } from '../../utils/mutations';
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
import Auth from '../../utils/auth';

const PostList = ({ posts }) => {

    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me;

    const [addLike, { error }] = useMutation(ADD_LIKE, {
        update(cache, { data: { addLike } }) {
            try {
                const { likes } = cache.readQuery({ query: QUERY_POST });
                cache.writeQuery({
                    query: QUERY_POST,
                    data: { likes: [addLike, ...likes] }
                });
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, likes: [...me.likes, addLike] } }
            });
        }
    });

    const handleLike = async (postId) => {

        const postToLike = postId;

        const username = user.username;

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await addLike({
                variables: { addLike: { postId, username } },
            });

            console.log(data);


        } catch (err) {
            console.error(err);
        }
    };

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
                              <Link
                                  to={`/feed/post/${post._id}`}
                              >
                                <IconButton aria-label='comments' style={{ color: 'white' }}>
                                    <ChatBubbleOutline fontSize='small' />{post.commentCount}
                                </IconButton>
                              </Link>
                          </div>
                          <div>
                              <IconButton aria-label='game' style={{ color: 'white' }}>
                                  <SportsEsportsOutlined fontSize='small' />
                              </IconButton>
                          </div>
                          <div>
                              <IconButton aria-label="favorite" style={{ color: 'white' }} onClick={handleLike}>
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