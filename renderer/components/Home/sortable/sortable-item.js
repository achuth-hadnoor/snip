import React from "react";

// Packages
import { SortableElement } from "react-sortable-hoc";

// Components
import Task from '../tasks'

const SortableItem = SortableElement(
  ({ note,project,onDone,commands}) => {
    return (
      <Task
        note = {note}
        project = {project}
        onDone={onDone} 
        commands = {commands}
      />
    );
  }
);

//   <Tasks snips={task} onMove={onMove} onDelete={onDelete} />
export default SortableItem;
