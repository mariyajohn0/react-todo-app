import React, { useState } from "react";
import InputBox from "./InputBox";
import SearchBox from "./SearchBox";
import { MODE_SEARCH, MODE_CREATE } from "../../services/mode";

export default function InputWrapper(props) {
    const { mode, addNew, query, setSearchQuery } = props;
    const [priority, setPriority] = useState("Medium"); // Default to 'Medium'

    const handleAddButtonClick = () => {
        const taskText = document.getElementById("taskInput").value; // Get the text value from input field
        if (taskText) {
            addNew(taskText, priority); // Add task with selected priority
            document.getElementById("taskInput").value = ""; // Reset the input field
        }
    };

    switch (mode) {
        case MODE_CREATE:
            return (
                <div>
                    <InputBox {...{ addNew, priority, setPriority }} />
                    <button onClick={handleAddButtonClick}>Add</button>{" "}
                    {/* Add Button */}
                </div>
            );
        case MODE_SEARCH:
            return <SearchBox {...{ query, setSearchQuery }} />;
        default:
            return null;
    }
}
