import { useEffect, useState } from 'react';
import './style.css';
import Post from '../Post'
import PostBox from '../PostBox';

function Feed() {
    const [posts, setPosts] = useState([]);


    return (
        <div className='feed'>
            <div className='feed__header'>
                <h2>Feed</h2>
            </div>
            <div className='feed__posts'>
            {posts.map((post) => (
                <Post
                  username={post.username}
                  verified={post.verified}
                  text={post.text}
                  avatar={post.avatar}
                  image={post.image}
                />
            ))}
            </div>

            <footer>
                <PostBox />
            </footer>
        </div>

    );
}

export default Feed;