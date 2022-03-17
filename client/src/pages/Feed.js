import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';
import FeedList from '../components/FeedList';
import PostBox from '../components/PostBox';
import Auth from '../utils/auth';

const Feed = props => {

    const { loading, data } = useQuery(QUERY_POSTS)

    const posts = data?.posts || [];

    const loggedIn = Auth.loggedIn();

    return (
        <div className='feed'>
            <div className='myHeader'>
                <h2 style={{ color: 'white' }}>Feed</h2>
            </div>

            <div>
                <FeedList />
            </div>

            <div>
                <PostBox />
            </div>
        </div>

    );

}

export default Feed;