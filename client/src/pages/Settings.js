import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Settings = () => {

    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || {};

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
            </div>
        </div>
    )

}

export default Settings;