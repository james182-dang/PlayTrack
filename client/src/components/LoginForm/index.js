import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import './style.css';

const LoginForm = (props) => {
    const [userFormData, setUserFormData] = useState({ username: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // eslint-disable-next-line
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await loginUser({
                variables: { ...userFormData }
            })

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        const username = userFormData.username;
        const randomNum = Math.ceil(Math.random() * 10000);

        const userData = {
            username,
            id: randomNum,
            role: 'Member',
        }

        localStorage.setItem('currentTalkJSUser', JSON.stringify(userData));

        setUserFormData({
            username: '',
            password: ''
        });
    };

    return (
        <div className='formCenter loginForm'>
            <form className='formFields' onSubmit={handleLoginSubmit}>
                <div className='formField'>
                    <label className='formFieldLabel' htmlFor='username'>
                        Username
                    </label>
                    <input
                      type='username'
                      id='username'
                      className='formFieldInput'
                      placeholder='Your Username'
                      name='username'
                      value={userFormData.username}
                      onChange={handleInputChange}
                    />
                </div>

                <div className='formField'>
                    <label className='formFieldLabel' htmlFor='password'>
                        Password
                    </label>
                    <input
                      type='password'
                      id='password'
                      className='formFieldInput'
                      placeholder='Your Password'
                      name='password'
                      value={userFormData.password}
                      onChange={handleInputChange}
                    />
                </div>

                <div className='formField'>
                    <button className='formFieldButton' type='submit'>Power On</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;