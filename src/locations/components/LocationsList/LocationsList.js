import React from 'react';
import { Link } from 'react-router-dom';
 
import LocationItem from '../LocationItem/LocationItem';
import Card from '../../../common/components/UIElements/Card';
import './LocationsList.css';

const LocationsList = props => {
    if (props.items.length === 0) {
        return <div className='place-list center'>
            <Card>
                <h2>No locations were found. Try adding one!</h2>
                <Link to='/locations/new'>
                    <div className='place-item__actions'>
                        <button>ADD LOCATION</button>
                    </div>
                </Link>
            </Card>
        </div>
    }

    return <ul className='place-list'>
        { props.items.map((location) => 
            <LocationItem key={location.id} 
                          id={location.id} 
                          image={location.imageUrl} 
                          title={location.title} 
                          description={location.description} 
                          address={location.address} 
                          creatorId={location.creator}
                          coordinates={location.location} />
            )
        }
    </ul>
}

export default LocationsList;