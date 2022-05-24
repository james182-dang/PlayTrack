import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_BIO } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import Button from '@mui/material/Button';



function BioForm(props) {

    const [bioText, setBioText] = useState('');
    const [bioFormData, setBioFormData] = useState({ bioText: '' });
    const [characterCount, setCharacterCount] = useState(0);
    
    const { loading, data } = useQuery(QUERY_ME);

    const [addBio, { bioError }] = useMutation(ADD_BIO, {
        update(cache, { data: { bio }}) {
            try {
                const { bio } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { user: [addBio, ...bio] }
                })
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, bio: [...me.bio, addBio] } }
            });
        }
    });

    const user = data?.me;

    const sendBio = async event => {
        event.preventDefault();

        const _id = user._id;

        const bio = bioText;

        try {
            await addBio({
                variables: { _id, bio }
            });
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = event => {

        const { name, value } = event.target;
        setBioFormData({ ...bioFormData, [name]: value });

        if (event.target.value.length <= 500) {
            setBioText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    return (
        <h5>
            Bio:

            <div className="widget-post" aria-labelledby="post-header-title">
                <div className="widget-post__header">
                    <h2 className="widget-post__title" id="post-header-title">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                        Update Bio
                    </h2>
                </div>
                <form id="widget-form" className="widget-post__form" name="form" aria-label="post widget" onSubmit={sendBio}>
                    <div className="widget-post__content">
                        <label htmlFor="post-content" className="sr-only">Share</label>
                        <textarea name="post" id="post-content" className="widget-post__textarea scroller" value={bioText} onChange={handleChange} type='text' placeholder={user.bio}></textarea>
                    </div>
                    <div className="widget-post__actions post--actions">
                        <span className='counter'>{characterCount}</span>
                        <div className="post-actions__widget">
                            <Button className="btn post-actions__publish" type="submit">Update Bio</Button>
                        </div>
                    </div>
                </form>
            </div>
        </h5>
    );
}

export default BioForm;