import React from 'react';
import { useParams } from 'react-router-dom';

import './UserLocations.css';
import LocationsList from '../../components/LocationsList/LocationsList';

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
]

const UserLocations = props => {
    const userId = useParams().userId;
    const loadedLocation = DUMMY_LOCATIONS.filter(location => location.creator === userId);
    
    return <LocationsList items={loadedLocation} />
}

export default UserLocations;