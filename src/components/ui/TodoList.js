import React, { useState } from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import ConfirmationDialog from './ConfirmationDialog';
import { applyFilter, search, FILTER_ACTIVE } from '../../services/filter';

export default function TodoList(props) {
  const { list, filter, mode, query } = props.data;
  const { addNew, changeFilter, changeStatus, changeMode, setSearchQuery } = props.actions;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState(false);
  const [newPriority, setNewPriority] = useState('Medium'); // State for managing priority selection

  const activeItemCount = applyFilter(list, FILTER_ACTIVE).length;
  const items = search(applyFilter(list, filter), query);

  const showConfirmationDialog = (task, status) => {
    setSelectedTask(task);
    setNewStatus(status);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    changeStatus(selectedTask.id, newStatus);
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedTask(null);
  };

  // Handle adding a new task with priority

  const handleAddNewTask = (taskText, priority) => {
    if (typeof taskText === 'string' && taskText.trim() !== '') {
      addNew({
        text: taskText,
        completed: false,
        priority: priority 
      });
    } else {
      console.error("Task text is not a valid string:", taskText);
    }
  };
  
  
  return (
    <div className="container">
      <div className="row">
        <div className="todolist">
          <Header 
            {...{ addNew: handleAddNewTask, mode, query, setSearchQuery }} 
          />
          <FilteredList
            {...{
              items,
              changeStatus: (id, status) => showConfirmationDialog(list.find((item) => item.id === id), status),
            }}
          />
          <Footer
            {...{ activeItemCount, filter, changeFilter, mode, changeMode }}
          />
          <Info {...{ mode }} />
          <ConfirmationDialog
            isOpen={isDialogOpen}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            message={`Are you sure you want to change the task status to ${newStatus ? 'Completed' : 'Pending'}?`}
          />
        </div>
      </div>
    </div>
  );
}
