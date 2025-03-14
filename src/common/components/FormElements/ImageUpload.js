import React, { useEffect, useState } from 'react';

import './ImageUpload.css';
import Button from './Button';
import { useRef } from 'react';

const ImageUpload = props => {
    const [previewUrl, setpreviewUrl] = useState();
    const [file, setFile] = useState();
    const [isValid, setIsValid] = useState(false);

    const fileChooserRef = useRef();

    useEffect(() => {
        if(!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setpreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file])

    const handleChosen = event => {
        let chosenFile;
        let fileIsValid = isValid;

        if (event.target.files && event.target.files.length === 1) {
            chosenFile = event.target.files[0];
            setFile(chosenFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, chosenFile, fileIsValid);

    }

    const handleChoosePicture = () => {
        fileChooserRef.current.click();
    }

    return (
        <div className='form-control'>
            <input ref={fileChooserRef} type="file" accepted=".jpg,.jpeg,.png" id={props.id} style={{display: "none"}} onChange={handleChosen} />
            <div className={`image-upload ${props.center && "center"} `}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="preview"/>}
                    {!previewUrl && <p>Please choose an image</p>}
                </div>
                <Button type="button" onClick={handleChoosePicture}>CHOOSE IMAGE</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
};

export default ImageUpload;