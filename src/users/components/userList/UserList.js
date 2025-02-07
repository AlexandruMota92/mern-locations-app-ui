import React from 'react';

import UserItem from '../userItems/UserItem';
import Card from '../../../common/components/UIElements/Card';
import './UserList.css';

const UserList = props => {
    if(props.items.length === 0) {
        return(
            <Card>
                <h2>No Users Found!</h2>
            </Card>
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