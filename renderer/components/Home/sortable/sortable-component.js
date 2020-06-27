import React from "react";

// Components
import SortableList from "./sortable-list";

const SortableComponent = ({
  title,
  notes,
  onSortEnd,
  onDone,
  onMove, 
}) => {
  return (
    <SortableList
      title = {title}
      notes={notes}
      onSortEnd={onSortEnd}
      onDone={onDone} 
      onMove={onMove} 
      useDragHandle={true}
    />
  );
};

export default SortableComponent;
