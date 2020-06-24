'use strict'

// Packages
import { SortableElement } from 'react-sortable-hoc'

// Components
import Snip from './../snip'

const SortableItem = SortableElement(({ snip, onMove, onDelete }) => {
  return <snip snip={snip} onMove={onMove} onDelete={onDelete} />
})

export default SortableItem
