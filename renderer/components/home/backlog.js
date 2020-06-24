'use strict'

// Components
import EmptyState from './../empty-state'
import SortableComponent from './../sortable/sortable-component'

const Backlog = ({ snips, onDelete, onMove, onSortEnd }) => {
  const list =
    snips.length === 0 ? (
      <EmptyState title="snips on backlog" />
    ) : (
      <SortableComponent
        snips={snips}
        onDelete={onDelete}
        onMove={onMove}
        onSortEnd={onSortEnd}
      />
    )

  return <div>{list}</div>
}

Backlog.defaultProps = {
  snips: []
}

export default Backlog
