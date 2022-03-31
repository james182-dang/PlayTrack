import './style.css';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Avatar from '@mui/material/Avatar';
import {
    ChatBubbleOutline,
    FavoriteBorder,
    Publish,
    Repeat,
    VerifiedUser
} from '@mui/icons-material';
import { ADD_LIKE } from '../../utils/mutations';
import { QUERY_ME, QUERY_POSTS } from '../../utils/queries';
import Auth from '../../utils/auth';

function Post({ username, verified, text, image, avatar }) {

    const [addLike, { error }] = useMutation(ADD_LIKE, {
        update(cache, { data: { addLike } }) {
            try {
                const { likes } = cache.readQuery({ query: QUERY_POSTS });
                cache.writeQuery({
                    query: QUERY_POSTS,
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
            <div className='post__avatar'>
                <Avatar src={avatar} />
            </div>
            <div className='post__body'>
                <div className='post__header'>
                    <div className='post__headerText'>
                        <h3>
                            {username}{' '}
                            <span className='post__headerSpecial'>
                                {verified && <VerifiedUser className='post__badge' />} @{username}
                            </span>
                        </h3>
                    </div>
                    <div className='post__headerDescription'>
                        <p>{text}</p>
                    </div>
                </div>
                <div className='post__footer'>
                    <ChatBubbleOutline fontSize='small' />
                    <Repeat fontsize='small' />
                    <FavoriteBorder fontSize='small'/>
                    <Publish fontSize='small' />
                </div>
            </div>
        </div>
    );
}

export default Post;