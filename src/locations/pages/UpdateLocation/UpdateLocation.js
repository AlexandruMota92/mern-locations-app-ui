import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './UpdateLocation.css';
import useForm from '../../../common/hooks/form-hook';
import Button from '../../../common/components/FormElements/Button';
import Input from '../../../common/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../common/utils/validators';
import Card from '../../../common/components/UIElements/Card';

const DUMMY_LOCATIONS = [
    {
        id:'p1',
        title:'Empire State Building',
        description:'Murica is Grate',
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/399px-Empire_State_Building_%28aerial_view%29.jpg',
        address:'20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'Empire State Building',
        description:'Murica is Grate',
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/399px-Empire_State_Building_%28aerial_view%29.jpg',
        address:'20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator:'u2'
    },
    {
        id:'p3',
        title:'Empire State Building',
        description:'Murica is Grate',
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/399px-Empire_State_Building_%28aerial_view%29.jpg',
        address:'20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator:'u3'
    },
];

const UpdateLocation = () => {
    const locationId = useParams().locationId;
    const identifiedLocation = DUMMY_LOCATIONS.find(loc => loc.id === locationId);
    const [isLoading, setIsLoading] = useState(true);
    
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
        if(identifiedLocation) {
            setFormData({
                title: {
                    value: identifiedLocation.title,
                    isValid: true,
                },
                description: {
                    value: identifiedLocation.description,
                    isValid: true,
                },
                
            }, true);
        }
        setIsLoading(false);
    }, [setFormData, identifiedLocation]);

    const handleLocationUpdateSubmit = event => {
        event.preventDefault();
        console.log(formState.input); //to send to backend
    }

    if(!identifiedLocation) {
        return <div className='center'>
            <Card>
                <h2>Location was not found!</h2>
            </Card>
        </div>
    };

    if(isLoading) {
        return <div>
            <h2 className='center'>Loading..</h2>
        </div>
    };

    return <form className='place-form' onSubmit={handleLocationUpdateSubmit}>
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

export default UpdateLocation;
