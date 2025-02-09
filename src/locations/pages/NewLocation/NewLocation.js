import React from 'react';

import { VALIDATOR_MINLENGTH, 
         VALIDATOR_REQUIRE } from '../../../common/utils/validators';
import useForm from '../../../common/hooks/form-hook';
import Input from '../../../common/components/FormElements/Input';
import Button from '../../../common/components/FormElements/Button';
import './NewLocation.css';

const NewLocation = () => {
    const [formState, handleInput] = useForm(
        {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
            address: {
                value: '',
                isValid: false,
            }
        }, 
        false
    )

    const handleLocationSubmit = event => {
        event.preventDefault();
        console.log(formState.input); //to send to backend
    }

    return <form className='place-form' onSubmit={handleLocationSubmit}>
        <Input id='title'
               element='input'
               type='text' 
               label='Title' 
               validators={[VALIDATOR_REQUIRE()]} 
               validationErrorText='Title cannot be empty' 
               onInput={handleInput}/>
        <Input id='description'
               element='textarea'
               label='Description' 
               validators={[VALIDATOR_MINLENGTH(5)]} 
               validationErrorText='Please input valid descriptions. 5 chars minimum' 
               onInput={handleInput}/>
        <Input id='address'
               element='input'
               type='text' 
               label='Address' 
               validators={[VALIDATOR_REQUIRE()]} 
               validationErrorText='Address cannot be empty' 
               onInput={handleInput}/>
        <Button type='submit' disabled={!formState.isValid}>ADD LOCATION</Button>
    </form>
}

export default NewLocation;