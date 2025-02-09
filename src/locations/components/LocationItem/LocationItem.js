import React, { useContext } from 'react';
import { useState } from 'react';

import Card from '../../../common/components/UIElements/Card';
import Button from '../../../common/components/FormElements/Button';
import Modal from '../../../common/components/UIElements/Modal';
import Map from '../../../common/components/UIElements/Map';
import './LocationItem.css';
import { AuthContext } from '../../../common/context/auth-context';

const LocationItem = props => {
    const auth = useContext(AuthContext);

    const [showMap, setShowMap] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleOpenMap = () => { setShowMap(true) };
    const handleCloseMap = () => { setShowMap(false) };

    const handleShowDeleteWarning = () => { setShowDeleteModal(true) };
    const handleCloseDeleteWarning = () => { setShowDeleteModal(false) }

    const handleDeleteLocation = () => {
        console.log('LOCATION DELETED');
        handleCloseDeleteWarning();
    }

    return <React.Fragment>
        <Modal show={showMap}
               onCancel={handleCloseMap} 
               header={props.address} 
               contentClass='place-item__modal-content' 
               footerClass='place-item__modal-actions' 
               footer={<Button onClick={handleCloseMap}>CLOSE</Button>}>
            <div className='map-container'>
                <Map center={props.coordinates} zoom={16}/>
            </div>
        </Modal>
        <Modal show={showDeleteModal}
               onCancel={handleCloseDeleteWarning}
               header='Are you sure?'
               footerClass='place-item__modal-actions'
               footer={
                    <React.Fragment>
                        <Button inverse onClick={handleCloseDeleteWarning}>Cancel</Button>
                        <Button danger onClick={handleDeleteLocation}>Delete</Button>
                    </React.Fragment>
               }>
            <p>Really delete this location? This operation's consequences will follow you forever..</p>
        </Modal>
        <li className='place-item'>
            <Card className='place-item__content'>
                <div className='place-item__image'>
                    <img src={props.image} alt={props.title}/>
                </div>
                <div className='place-item__info'>
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className='place-item__actions'>
                    <Button inverse onClick={handleOpenMap}>VIEW ON MAP</Button>
                    {auth.isLoggedIn && (<Button to={`/locations/${props.id}`}>EDIT</Button>)}
                    {auth.isLoggedIn && (<Button danger onClick={handleShowDeleteWarning}>DELETE</Button>)}  
                </div>
            </Card> 
        </li>
    </React.Fragment>   
};

export default LocationItem;
