import React from 'react';
import enhance from '../hoc/wrapInputBox';

function InputBox(props) {
  const { value, handleChange, handleKeyUp, priority, setPriority } = props;

  return (
    <div>
      <input 
        id="taskInput"
        autoFocus
        type="text"
        className="form-control add-todo"
        value={value}
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        placeholder="Add New"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="priority-dropdown">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}

export default enhance(InputBox);
