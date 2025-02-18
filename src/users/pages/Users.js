import React from 'react';

import UserList from '../components/userList/UserList';

const Users = () => {
    const USERS = [
        {id:'u1', name:'user 1', image: 'https://d197nivf0nbma8.cloudfront.net/uploads/2014/09/Guy-David-expert-2021-408x452.webp', locations:3},
        {id:'u2', name:'user 2', image: 'https://d197nivf0nbma8.cloudfront.net/uploads/2014/09/Guy-David-expert-2021-408x452.webp', locations:4},
        {id:'u3', name:'user 3', image: 'https://d197nivf0nbma8.cloudfront.net/uploads/2014/09/Guy-David-expert-2021-408x452.webp', locations:1},
        {id:'u4', name:'user 4', image: 'https://d197nivf0nbma8.cloudfront.net/uploads/2014/09/Guy-David-expert-2021-408x452.webp', locations:3},
        {id:'u5', name:'user 5', image: 'https://d197nivf0nbma8.cloudfront.net/uploads/2014/09/Guy-David-expert-2021-408x452.webp', locations:8},
    ];

    return <UserList items={USERS} />;
}

export default Users;