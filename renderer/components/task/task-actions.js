'use strict'

// Packages
import Link from 'next/link'

// Theme
import { colors, typography } from './../../theme'

const SnipActions = ({ snip, onDelete, onMove }) => {
  const { id, type } = snip
  const isToday = type === 'today' ? 'done' : 'today'
  const nextType = type === 'today' ? 'today' : 'backlog'

  return (
    <ul>
      {type !== 'done' ? ( // eslint-disable-line no-negated-condition
        <li onClick={() => onMove(nextType, snip)}>{isToday}</li>
      ) : null}

      {type !== 'backlog' ? ( // eslint-disable-line no-negated-condition
        <li onClick={() => onMove('back', snip)}>backlog</li>
      ) : null}

      <li>
        <Link href={`/edit?id=${id}`}>
          <span>view</span>
        </Link>
      </li>

      <li onClick={() => onDelete(snip)}>delete</li>

      <style jsx>{`
        li {
          color: ${colors.white};
          display: inline-block;
          font-size: ${typography.f12};
          font-weight: ${typography.semibold};
          margin-right: 10px;
          color: ${colors.romanSilver};
          cursor: pointer;
        }

        span {
          color: ${colors.romanSilver};
        }

        li:hover,
        span:hover {
          color: ${colors.white};
        }
      `}</style>
    </ul>
  )
}

export default SnipActions
