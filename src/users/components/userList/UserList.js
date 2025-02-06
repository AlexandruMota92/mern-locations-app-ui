import React from 'react';

import './UserList.css';
import UserItem from '../userItems/UserItem';

const UserList = props => {
    if(props.items.length === 0) {
        return(
            <div>
                <h2>No Users Found!</h2>
            </div>
        )
    }

    return <ul className='users-list'> {
        props.items.map(user => (
            <UserItem 
                key={user.key}
                id={user.id}
                image={user.image}
                name={user.name}
                locationsCount={user.locations}
            />
        ))
    } </ul>
};

export default UserList;