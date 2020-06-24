'use strict'

// Components
import SortableList from './sortable-list'

const SortableComponent = ({ snips, onSortEnd, onDelete, onMove }) => {
  return (
    <SortableList
      snips={snips}
      onSortEnd={onSortEnd}
      onDelete={onDelete}
      onMove={onMove}
      useDragHandle={true}
    />
  )
}

export default SortableComponent
