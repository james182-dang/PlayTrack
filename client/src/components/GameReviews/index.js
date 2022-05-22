import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import {
    ChatBubbleOutline,
    FavoriteBorder,
    SportsEsportsOutlined,
    Publish
} from '@mui/icons-material';
import './style.css';

const GameReviews = ({ reviews }) => {
    return (
        <div className='review'>
            {reviews &&
              reviews.map(review => (
                  <div key={review._id} className='talk-bubble tri-right left-in round'>
                    <p className='post__date'>
                        <Link
                          to={`/profile/${review.username}`}
                          style={{ fontWeight: 700 }}
                          className='post__header'
                        >
                            {review.username}
                        </Link>{' '}
                        {review.createdAt}
                    </p>
                    <div>
                        <Link to={`/reviews/${review._id}`} className='post__body'>
                            <p>{review.reviewText}</p>
                        </Link>
                    </div>

                    <div className='post__footer'>
                        <div>
                            <Link
                              to={`/reviews/${review._id}`}
                            >
                                <IconButton aria-label='comments' style={{ color: 'white' }}>
                                    <ChatBubbleOutline fontSize='small' />{review.commentCount}
                                </IconButton>
                            </Link>
                        </div>
                        <div>
                            <IconButton aria-label='game' style={{ color: 'white' }}>
                                <SportsEsportsOutlined fontSize='small' />
                            </IconButton>
                        </div>
                        <div>
                            <IconButton aria-label='favorite' style={{ color: 'white' }}>
                                <FavoriteBorder fontSize='small' />{review.likeCount}
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

export default GameReviews;