import React, { useState } from 'react';

import GoalList from './components/GoalList';
import NewGoal from './components/NewGoal';
import './App.css';

const App = () => 
{
  const [goalList, setGoalList] = useState([
    {id:'1', goal:'goal 1'},
    {id:'2', goal:'goal 2'},
    {id:'3', goal:'goal 3'}
  ]);

  const addNewGoal = (newGoal) => {
    // setGoalList(goalList.concat(newGoal));
    setGoalList(previousGoalList => previousGoalList.concat(newGoal));
  }

  return (
    <div className="course-goals">
      <NewGoal onAddGoal={addNewGoal}/>
      <GoalList goals={goalList} />
    </div>
  )
}

export default App;
