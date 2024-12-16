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

  const activeItemCount = applyFilter(list, FILTER_ACTIVE).length;
  const items = search(applyFilter(list, filter), query);

  const showConfirmationDialog = (task, status) => {
    setSelectedTask(task);
    setNewStatus(status);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    changeStatus(selectedTask.id, newStatus);
    setIsDialogOpen(false); // Close the dialog after confirmation
    setSelectedTask(null); // Reset selected task
  };

  const handleCancel = () => {
    setIsDialogOpen(false); // Close the dialog without any changes
    setSelectedTask(null); // Reset selected task
  };

  return (
    <div className="container">
      <div className="row">
        <div className="todolist">
          <Header {...{ addNew, mode, query, setSearchQuery }} />
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

          {/* Render the confirmation dialog */}
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
