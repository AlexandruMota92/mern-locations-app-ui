import React from 'react';

import './UserItem.css';

const UserItem = props => {
    return <li className='user-item'>{console.log(props)}
        <div className='user-item__content'>
            <div className='user-item__image'>
                <img src={props.image} alt={props.name}/>
            </div>
            <div className='user-item__info'>
                <h2>{props.name}</h2>
                <h3>{props.locationsCount} {props.locationsCount === 1 ? 'Location' : 'Locations'}</h3>
            </div>
        </div>
    </li>
};

export default UserItem;