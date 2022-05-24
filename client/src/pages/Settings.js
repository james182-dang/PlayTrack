import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { QUERY_ME } from '../utils/queries';
import { ADD_PROFILE_PIC, ADD_BIO } from '../utils/mutations';
import UploadImage from '../components/UploadImage';
import BioForm from '../components/BioForm';

const Settings = () => {

    const [characterCount, setCharacterCount] = useState(0);
    const [bioText, setBioText] = useState('');
    const [bioFormData, setBioFormData] = useState({ bio: '' });

    const { loading, data } = useQuery(QUERY_ME);

    const [addProfilePic, { error }] = useMutation(ADD_PROFILE_PIC, {
        update(cache, { data: { image }}) {
            try {
                const { image } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { user: [addProfilePic, ...image] }
                })
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, image: [...me.image, addProfilePic] } }
            });
        }
    });

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
        setBioFormData({ ...bioFormData, [name]: value});

        if (event.target.value.length <= 500) {
            setBioText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

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

                <h5>
                    <BioForm />
                </h5>
            </div>
        </div>
    )

}

export default Settings;