import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
    switch(action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(const inputId in state.input) {
                //kinda ghetto, but there were too many ? to add :D
                if(!state.input[inputId]) {
                    continue;
                }
                if(inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.input[inputId].isValid;
                }
            }
            return {
                ...state,
                input: {
                    ...state.input,
                    [action.inputId]: { value:action.value, isValid:action.isValid }
                },
                isValid: formIsValid
            };
        case 'SET_DATA':
            return {
                input: action.input,
                isValid: action.formIsValid
            }
        default: return state;
    }
};

const useForm = (initialInput, initialValidity) => {
    const [formState, dispatch] = useReducer(formReducer, {
        input: initialInput,
        isValid: initialValidity,
    });

    const handleInput = useCallback((id, value, isValid) => {
        dispatch({type:'INPUT_CHANGE', value:value, isValid:isValid, inputId:id})
    }, []);

    const setFormData = useCallback((inputData, formValidity) => {
        dispatch({
            type: 'SET_DATA',
            input: inputData,
            formIsValid: formValidity,
        })
    }, []);

    return [formState, handleInput, setFormData]
}

export default useForm;