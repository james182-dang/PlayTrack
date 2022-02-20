import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import './style.css';

const SignupForm = (props) => {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

    const [validated] = useState(false);

    const [showAlert, setShowAlert] = useState(false);

    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleSignupSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await addUser({
                variables: { ...userFormData }
            })

            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: ''
        });
    };

    return (
        <div className='formCenter signupForm'>
            <form onSubmit={handleSignupSubmit} className='formFields'>
                <div className='formField'>
                    <label className='formFieldLabel' htmlFor='email'>
                        Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='formFieldInput'
                      placeholder='Enter your Email'
                      name='email'
                      value={userFormData.email}
                      onChange={handleInputChange}
                    />
                </div>
                <div className='formField'>
                    <label className='formFieldLabel' htmlFor='username'>
                        Username
                    </label>
                    <input
                      type='text'
                      id='username'
                      className='formFieldInput'
                      placeholder='Enter your Username'
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
                      placeholder='Enter your Password'
                      name='password'
                      value={userFormData.password}
                      onChange={handleInputChange}
                    />
                </div>
                
                <div className='formField'>
                    <button className='formFieldButton' type='submit'>Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;