import React from 'react';
import CheckBox from './CheckBox';

export default function TodoItem(props) {
    const { data, changeStatus } = props;
    const taskText = data.text?.text || data.text;

    console.log(data);
  
    return (
      <li className={`todo-item ui-state-default ${data.completed ? 'completed' : 'pending'}`}>
        <div className="checkbox">
          <label>
            <CheckBox
              checked={data.completed}
              onChange={(checked) => changeStatus(data.id, checked)} 
            />
            {data.text}
          </label>
        </div>
        <span className="priority-label">{data.priority}</span> 
      </li>
    );
  }
  
  
  
  
