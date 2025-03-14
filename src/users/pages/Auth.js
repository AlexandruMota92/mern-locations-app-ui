import React, { useContext, useState } from 'react';

import useForm from '../../common/hooks/form-hook';
import useHttpClient from '../../common/hooks/http-hook';
import Input from '../../common/components/FormElements/Input';
import Button from '../../common/components/FormElements/Button';
import ErrorModal from '../../common/components/UIElements/ErrorModal';
import LoadingSpinner from '../../common/components/UIElements/LoadingSpinner';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../common/utils/validators';
import './Auth.css';
import Card from '../../common/components/UIElements/Card';
import { AuthContext } from '../../common/context/auth-context';
import ImageUpload from '../../common/components/FormElements/ImageUpload';

const Auth = props => {
    const [isLoginMode, setIsLoginMode] = useState(false);
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    // TODO: username and image validity should be handled in handleSwitchMode, but it doesn't ...
    const [formState, handleInput, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
            username: {
                value: '',
                isValid: false,
            },
            image: {
                value: null,
                isValid: false
            }
        }, 
        false
    )

    const handleSwitchMode = () => {
        if(!isLoginMode) {
            setFormData(
                {
                    ...formState.input,
                    username: undefined,
                    image: undefined
                },
                formState.input?.email?.isValid && formState.input?.password?.isValid
            )
        } else {
            setFormData(
                {
                    ...formState.input,
                    username: {
                        value: '',
                        isValid: false
                    },
                    image: {
                        value: null,
                        isValid: false
                    }
                },
                false
            )
        }
        setIsLoginMode(prevMode => !prevMode);
    }

    const handleAuthSubmit = async event => {
        event.preventDefault();
        
        if(isLoginMode) {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify({
                        email: formState.input.email.value,
                        password: formState.input.password.value
                    }),
                    {
                        'Content-Type': 'application/json',
                    },
                );

                auth.login(responseData.userId, responseData.token); 
            } catch (err) {
                // handled in custom http hook
            }       
        } else {
            try {
                const formData = new FormData();

                formData.append('email', formState.input.email.value);
                formData.append('username', formState.input.username.value);
                formData.append('password', formState.input.password.value);
                formData.append('image', formState.input.image.value);

                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    formData
                );

                auth.login(responseData.userId, responseData.token);
            } catch (err) {
                // handled in custom http hook
            }
        }   
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className='authentication'>
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2>Login Required!</h2>
                <hr/>
                <form className='auth-form' onSubmit={handleAuthSubmit}>
                    {!isLoginMode && (
                        <Input id='username'
                        element='input'
                        type='text' 
                        label='Username' 
                        validators={[VALIDATOR_REQUIRE]} 
                        validationErrorText='Field is mandatory' 
                        onInput={handleInput}/>
                    )}
                    {!isLoginMode && <ImageUpload center id="image" onInput={handleInput}/>}
                    <Input id='email'
                            element='input'
                            type='email' 
                            label='Email' 
                            validators={[VALIDATOR_EMAIL()]} 
                            validationErrorText='Field is mandatory' 
                            onInput={handleInput}/>
                    <Input id='password'
                            element='input'
                            type='password'
                            label='Password' 
                            validators={[VALIDATOR_MINLENGTH(6)]} 
                            validationErrorText='Field is mandatory' 
                            onInput={handleInput}/>
                    <Button type='submit' disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
                </form>
                <Button inverse onClick={handleSwitchMode}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
            </Card>
        </React.Fragment>
    )
}

export default Auth;
