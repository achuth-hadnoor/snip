'use strict'

// Components
import EmptyState from './../empty-state'
import SortableComponent from './../sortable/sortable-component'

const Today = ({ snips, onDelete, onMove, onSortEnd }) => {
  const list =
    snips.length === 0 ? (
      <EmptyState title="snips today" />
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

Today.defaultProps = {
  snips: []
}

export default Today
