import React from 'react';

const GoalList = props => {
    return (
        <div>
            <ul>
                {props.goals.map((goal) => {
                    return <li key={goal.id}>{goal.goal}</li>
                })}
            </ul>
        </div>
    );
};

export default GoalList;