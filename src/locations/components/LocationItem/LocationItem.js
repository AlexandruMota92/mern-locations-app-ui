import React from 'react';
import { useState } from 'react';

import Card from '../../../common/components/UIElements/Card';
import Button from '../../../common/components/FormElements/Button';
import Modal from '../../../common/components/UIElements/Modal';
import './LocationItem.css';

const LocationItem = props => {
    const [showMap, setShowMap] = useState(false);

    const handleOpenMap = () => { setShowMap(true) };
    const handleCloseMap = () => { setShowMap(false) };

    return <React.Fragment>
        <Modal show={showMap}
               onCancel={handleCloseMap} 
               header={props.address} 
               contentClass='place-item__modal-content' 
               footerClass='place-item__modal-actions' 
               footer={<Button onClick={handleCloseMap}>CLOSE</Button>}>
            <div className='map-container'>
                <h2>The Map</h2>
            </div>
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
                    <Button to={`locations/${props.id}`}>EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
            </Card> 
        </li>
    </React.Fragment>   
};

export default LocationItem;
