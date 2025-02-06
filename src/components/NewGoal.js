import React, { useState } from 'react';

const NewGoal = props => {
    const [userInput, setUserInput] = useState('');

    const handleUserInput = event => {
        setUserInput(event.target.value);
    }

    const handleAddGoal = event => {
        event.preventDefault();

        const newGoal = {
            id: Math.random().toString(),
            goal:userInput
        };

        setUserInput('');
        
        props.onAddGoal(newGoal);
    }

    return (
        <form className='addGoalForm' onSubmit={handleAddGoal}>
            <input type='text' value={userInput} onChange={handleUserInput}></input>
            <button type='submit' >Submit</button>
        </form>
    );
}

export default NewGoal;