import React from 'react';
import CheckBox from './CheckBox';

export default function TodoItem(props) {
  const { data, changeStatus } = props;

  return (
    <li className={`todo-item ui-state-default ${data.completed ? 'completed' : 'pending'}`}>
      <div className="checkbox">
        <label>
          <CheckBox
            checked={data.completed}
            onChange={(checked) => changeStatus(data.id, checked)} // Trigger status change with confirmation on completion
          />
          {data.text}
        </label>
      </div>
    </li>
  );
}
