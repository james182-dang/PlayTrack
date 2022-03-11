import { useEffect, useState } from 'react';
import './style.css';
import Post from '../Post'
import PostBox from '../PostBox';
import PostList from '../PostList';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME_BASIC } from '../../utils/queries';
import Auth from '../../utils/auth';

function Feed() {

    const { loading, data } = useQuery(QUERY_POSTS);

    const { data: userData } = useQuery(QUERY_ME_BASIC);

    const posts = data?.posts || [];
    console.log(posts);

    const loggedIn = Auth.loggedIn();

    return (
        <div className='feed'>
            <div className='feed__header'>
                <h2>Feed</h2>
            </div>
            <div className={`feed__posts`}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <PostList posts={posts} title="What should go here?" />
                )}
            </div>

            <footer>
                <PostBox className='bottom 0'/>
            </footer>
        </div>

    );
}

export default Feed;