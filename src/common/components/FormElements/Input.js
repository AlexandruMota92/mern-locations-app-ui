import React, { useReducer, useEffect } from 'react';

import { validate } from '../../utils/validators';
import './Input.css';

const inputReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default: return state;
    }
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValidity || false,
        isTouched: false,
    });

    const { id, onInput } = props;
    const { isValid, value} = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const handleChange = event => {
        dispatch({ type:'CHANGE', val: event.target.value, validators:props.validators})
    }

    const handleTouch = () => {
        dispatch({ type:'TOUCH' })
    }

    const element = props.element === 'input' ? 
        <input id={props.id} 
               type={props.type} 
               placeholder={props.placeholder} 
               onChange={handleChange}
               onBlur={handleTouch}
               value={value}
        /> : 
        <textarea id={props.id} 
                  rows={props.rows || 3} 
                  onChange={handleChange}
                  onBlur={handleTouch}
                  value={value}
        />;

    return <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.validationErrorText}</p>}
    </div>
}

export default Input;
