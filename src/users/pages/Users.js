import React, { useEffect, useState } from 'react';

import UserList from '../components/userList/UserList';
import ErrorModal from '../../common/components/UIElements/ErrorModal';
import LoadingSpinner from '../../common/components/UIElements/LoadingSpinner';
import useHttpClient from '../../common/hooks/http-hook';

const Users = () => {
    const [loadedUsers, setLoadedUsers] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/users');
    
                setLoadedUsers(responseData.users);
            } catch (err) {
                //
            }
        };

        fetchUsers();
    }, [sendRequest]);

    return (<React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {
            isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )
        }
        {
            !isLoading && <UserList items={loadedUsers} />
        }
    </React.Fragment>);
}

export default Users;