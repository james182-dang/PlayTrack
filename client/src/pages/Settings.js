import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import UploadImage from '../components/UploadImage';
import Auth from '../utils/auth';

const Settings = () => {

    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || {};

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this page.
            </h4>
        )
    }

    

    return (
        <div>
            <div className='myHeader'>
                <h2>
                    Settings
                </h2>
            </div>

            <div>
                <h3>
                    Your Account
                </h3>

                <h5>
                    Your username: {`${user.username}`}
                    <br />
                    Your email: {`${user.email}`}
                </h5>

                <h5>
                    <UploadImage />
                </h5>
            </div>
        </div>
    )

}

export default Settings;