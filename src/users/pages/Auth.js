import React, { useContext, useState } from 'react';

import useForm from '../../common/hooks/form-hook';
import Input from '../../common/components/FormElements/Input';
import Button from '../../common/components/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../common/utils/validators';
import './Auth.css';
import Card from '../../common/components/UIElements/Card';
import { AuthContext } from '../../common/context/auth-context';

const Auth = props => {
    const [isLoginMode, setIsLoginMode] = useState(false);
    const auth = useContext(AuthContext);

    const [formState, handleInput, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            }
        }, 
        false
    )

    const handleSwitchMode = () => {
        if(!isLoginMode) {
            setFormData(
                {
                    ...formState.input,
                    username: undefined
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
                    }
                },
                false
            )
        }
        setIsLoginMode(prevMode => !prevMode);
    }

    const handleAuthSubmit = event => {
        event.preventDefault();
        console.log(formState.input); //to send to backend
        auth.login();
    }

    return <Card className='authentication'>
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
                    validators={[VALIDATOR_MINLENGTH(8)]} 
                    validationErrorText='Field is mandatory' 
                    onInput={handleInput}/>
            <Button type='submit' disabled={!formState.isValid}>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</Button>
        </form>
        <Button inverse onClick={handleSwitchMode}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
    </Card>
}

export default Auth;
