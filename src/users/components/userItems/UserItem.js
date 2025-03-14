import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../../common/components/UIElements/Avatar';
import Card from '../../../common/components/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
    return <li className='user-item'>
        <Card className='user-item__content'>
            <Link to={`/${props.id}/locations`}>
                <div className='user-item__image'>
                    <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name}/>
                </div>
                <div className='user-item__info'>
                    <h2>{props.name}</h2>
                    <h3>{props.locationsCount} {props.locationsCount === 1 ? 'Location' : 'Locations'}</h3>
                </div>
            </Link>
        </Card>
    </li>
};

export default UserItem;