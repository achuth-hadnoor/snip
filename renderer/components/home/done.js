'use strict'

// Components
import EmptyState from './../empty-state'
import Snip from './../snip'

const Done = ({ snips, onDelete, onMove }) => {
  const list =
    snips.length === 0 ? (
      <EmptyState title="Snips done" />
    ) : (
      snips.map(snip => (
        <Snip key={snip.id} snip={snip} onDelete={onDelete} onMove={onMove} />
      ))
    )

  return <ul>{list}</ul>
}

Done.defaultProps = {
  Snips: []
}

export default Done
