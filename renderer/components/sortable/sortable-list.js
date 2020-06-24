'use strict'

// Packages
import { SortableContainer } from 'react-sortable-hoc'

// Components
import SortableItem from './sortable-item'

const SortableList = SortableContainer(({ snips, onDelete, onMove }) => {
  return (
    <ul>
      {snips.map((snip, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          snip={snip}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </ul>
  )
})

export default SortableList
