import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './UserLocations.css';
import LocationsList from '../../components/LocationsList/LocationsList';
import useHttpClient from '../../../common/hooks/http-hook';
import ErrorModal from '../../../common/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../common/components/UIElements/LoadingSpinner';

const UserLocations = props => {
    const [loadedLocations, setLoadedLocations] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const userId = useParams().userId;

    // TODO: deleting does not refresh item list
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/locations/user/${userId}`);
                setLoadedLocations(responseData.locations);
            }catch (err) {
                //
            }
        }
        fetchLocations();
    }, [sendRequest, userId]);

    const handleLocationDelete = deletedLocationId => {
        setLoadedLocations(prevLocations => prevLocations.filter(location => location.id !== deletedLocationId));
    }
    
    return (<React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
            <div className='center'>
                <LoadingSpinner />
            </div>
        )}
        {!isLoading && loadedLocations &&
            <LocationsList items={loadedLocations} onDeleteLocation={handleLocationDelete} />
        }
    </React.Fragment>) 
    
}

export default UserLocations;