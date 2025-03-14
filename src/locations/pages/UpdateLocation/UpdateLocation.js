import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import './UpdateLocation.css';
import useForm from '../../../common/hooks/form-hook';
import Button from '../../../common/components/FormElements/Button';
import Input from '../../../common/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../common/utils/validators';
import Card from '../../../common/components/UIElements/Card';
import useHttpClient from '../../../common/hooks/http-hook';
import LoadingSpinner from '../../../common/components/UIElements/LoadingSpinner';
import ErrorModal from '../../../common/components/UIElements/ErrorModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../../../common/context/auth-context';

const UpdateLocation = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedLocation, setLoadedLocation] = useState();
    const locationId = useParams().locationId;
    const history = useHistory();
    const auth = useContext(AuthContext)

    
    const [formState, handleInput, setFormData] = useForm(
        {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
        }, 
        false
    );

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/locations/${locationId}`)
                setLoadedLocation(responseData.location);
                setFormData({
                    title: {
                        value: responseData.location.title,
                        isValid: true,
                    },
                    description: {
                        value: responseData.location.description,
                        isValid: true,
                    },
                    
                }, true);
            } catch (err) {
                //
            }
        };
        fetchLocation();
    }, [sendRequest, locationId, setFormData]);

    const handleLocationUpdateSubmit = async event => {
        event.preventDefault();
        try {
            await sendRequest(`http://localhost:5000/api/locations/${locationId}`,
                'PATCH',
                JSON.stringify({
                        title: formState.input.title.value,
                        description: formState.input.description.value
                }),
                {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
                
            );
            history.push('/' + auth.userId + '/locations');
        } catch (err) {
            //
        }
    }

    if(isLoading) {
        return <div className="center">
            <LoadingSpinner />
        </div>
    };

    if(!loadedLocation && !error) {
        return <div className='center'>
            <Card>
                <h2>Location was not found!</h2>
            </Card>
        </div>
    };

    return (<React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading && loadedLocation &&
            <form className='place-form' onSubmit={handleLocationUpdateSubmit}>
                <Input id='title' 
                    element='input' 
                    type='text' 
                    label='Title' 
                    validators={[VALIDATOR_REQUIRE()]} 
                    validationErrorText='please do not the title' 
                    onInput={handleInput} 
                    initialValue={formState.input.title.value}
                    initialValidity={formState.input.title.isValid}/>
                <Input id='description'
                    element='textarea'
                    label='Description' 
                    validators={[VALIDATOR_MINLENGTH(5)]} 
                    validationErrorText='please do not the description' 
                    onInput={handleInput}
                    initialValue={formState.input.description.value}
                    initialValidity={formState.input.description.isValid}/>
                <Button type='submit' disabled={!formState.isValid}>UPDATE PLACE</Button>
            </form>
        }
    </React.Fragment>) 
}

export default UpdateLocation;
