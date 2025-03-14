import React from 'react';
import { Link } from 'react-router-dom';
 
import LocationItem from '../LocationItem/LocationItem';
import Card from '../../../common/components/UIElements/Card';
import Button from '../../../common/components/FormElements/Button';
import './LocationsList.css';

const LocationsList = props => {
    if (props.items.length === 0) {
        console.warn(props.items)
        return <div className='place-list center'>
            <Card>
                <h2>No locations were found. Try adding one!</h2>
                <Link to='/locations/new'>
                    <div className='place-item__actions'>
                        <Button to='/locations/new'>SHARE LOCATION</Button>
                    </div>
                </Link>
            </Card>
        </div>
    }

    return <ul className='place-list'>
        { props.items.map((location) => 
            <LocationItem key={location._id} 
                          id={location._id} 
                          image={location.image} 
                          title={location.title} 
                          description={location.description} 
                          address={location.address} 
                          creatorId={location.creator}
                          coordinates={location.location}
                          onDelete={props.onDeleteLocation} />
            )
        }
    </ul>
}

export default LocationsList;