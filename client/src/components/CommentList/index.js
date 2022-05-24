import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Button from '@mui/material/Button';



const CommentList = ({ comments }) => {

    return (
        <div>
            <div className='post'>
                {comments &&
                  comments.map(comment => {
                      return (
                      <p key={comment._id} className='talk-bubble tri-right left-in round'>
                          <p className='post__date'>
                              <Link
                                to={`/profile/${comment.username}`}
                                style={{ fontWeight: 700, textDecoration: 'none' }}
                                className='post__header'
                              >
                                  {comment.username}
                              </Link>{' '}
                              {comment.createdAt}
                          </p>
                          <div className='post__body'>
                            {comment.commentBody}

                            {Auth.loggedIn() && Auth.getProfile().data.username === comment.username
                            && <Button type='submit' >Delete Comment</Button>}
                          </div>
                      </p>
                    );
                  })}
            </div>
        </div>
    );
}

export default CommentList;