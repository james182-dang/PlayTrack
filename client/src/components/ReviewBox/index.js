import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';
import { QUERY_REVIEWS, QUERY_ME } from '../../utils/queries';
import Button from '@mui/material/Button';
import './style.css';

function ReviewBox(props) {

    const gameId = props.gameId;
    const gameName = props.gameName;

    const [reviewText, setReviewText] = useState('');
    const [reviewFormData, setReviewFormData] = useState({ reviewText: '', gameId: '', gameName: '' })
    const [characterCount, setCharacterCount] = useState(0);
    const [addReview, { error }] = useMutation(ADD_REVIEW, {
        update(cache, { data: { addReview }}) {
            try {
                const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });
                cache.writeQuery({
                    query: QUERY_REVIEWS,
                    data: { reviews: [addReview, ...reviews] }
                });
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, reviews: [...me.reviews, addReview] } }
            });
        }
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setReviewFormData({ ...reviewFormData, [name]: value });

        if (event.target.value.length <= 5000) {
            setReviewText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const sendReview = async event => {
        event.preventDefault();

        try {
            await addReview({
                variables: { reviewText, gameId: parseInt(gameId, 10), gameName }
            });

            setReviewText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div className='reviewBox'>
                <form onSubmit={sendReview}>
                    <div className='reviewBox__input'>
                        <input
                            value={reviewText}
                            onChange={handleChange}
                            placeholder="Leave your review!"
                            type='text'
                            className='reviewInput__area'
                        />
                    </div>

                    <div className='review__bottom'>
                        <span className='counter'>{characterCount}</span>
                        <Button type='submit' className='reviewBox__button'>
                            Post Review
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviewBox;