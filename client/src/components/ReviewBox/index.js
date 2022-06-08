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
        <div className="widget-post" aria-labelledby="post-header-title">
            <div className="widget-post__header">
                <h2 className="widget-post__title" id="post-header-title">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    New Review
                </h2>
            </div>
            <form id="widget-form" className="widget-post__form" name="form" aria-label="post widget" onSubmit={sendReview}>
                <div className="widget-post__content">
                    <label htmlFor="post-content" className="sr-only">Share</label>
                    <textarea name="post" id="post-content" className="widget-post__textarea scroller" placeholder="How was the game?" value={reviewText} onChange={handleChange} type='text'></textarea>
                </div>
                <div className="widget-post__options is--hidden" id="stock-options">
                </div>
                <div className="widget-post__actions post--actions">
                    <div className="post-actions__attachments">
                        <Button type="button" className="btn post-actions__upload attachments--btn">
                            <label htmlFor="upload-image" className="post-actions__label">
                                <i className="fa fa-upload" aria-hidden="true"></i>
                                Attach Image
                            </label>
                        </Button>
                        <input type="file" id="upload-image" accept="image/*" multiple />
                    </div>
                    <span className='counter'>{characterCount}</span>
                    <div className="post-actions__widget">
                        <Button className="btn post-actions__publish" type="submit">Post</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ReviewBox;