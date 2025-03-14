import React, { useContext } from 'react';

import { VALIDATOR_MINLENGTH, 
         VALIDATOR_REQUIRE } from '../../../common/utils/validators';
import useForm from '../../../common/hooks/form-hook';
import useHttpClient from '../../../common/hooks/http-hook';
import { AuthContext } from '../../../common/context/auth-context';
import Input from '../../../common/components/FormElements/Input';
import Button from '../../../common/components/FormElements/Button';
import './NewLocation.css';
import ErrorModal from '../../../common/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../common/components/UIElements/LoadingSpinner';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ImageUpload from '../../../common/components/FormElements/ImageUpload';

const NewLocation = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
            },
            image: {
                value: null,
                isValid: false
            }
        }, 
        false
    )

    const history = useHistory();

    const handleLocationSubmit = async event => {
        event.preventDefault();
        try {
            const formData = new FormData();

            formData.append('title', formState.input.title.value);
            formData.append('description', formState.input.description.value);
            formData.append('address', formState.input.address.value);
            formData.append('image', formState.input.image.value);
            formData.append('creator', auth.userId);

            await sendRequest(
                'http://localhost:5000/api/locations',
                'POST',
                formData,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
                
            history.push('/');
        } catch (err) {
            //
        }   
    }

    return (<React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <form className='place-form' onSubmit={handleLocationSubmit}>
            {isLoading && <LoadingSpinner />}
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
            {<ImageUpload center id="image" onInput={handleInput}/>}
            <Button type='submit' disabled={!formState.isValid}>ADD LOCATION</Button>
        </form>
    </React.Fragment>)
    
    
}

export default NewLocation;