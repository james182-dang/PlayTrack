import { Link } from 'react-router-dom';

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
                                style={{ fontWeight: 700 }}
                                className='post__header'
                                style={{ textDecoration: 'none' }}
                              >
                                  {comment.username}
                              </Link>{' '}
                              {comment.createdAt}
                          </p>
                          <div className='post__body'>
                            {comment.commentBody}
                          </div>
                      </p>
                    );
                  })}
            </div>
        </div>
    );
}

export default CommentList;