'use strict'

// Packages
import { shell } from 'electron'

// Components
import TwitterIcon from './../../icons/twitter'
import GithubIcon from './../../icons/github'
import ProductHuntIcon from './../../icons/product-hunt'

const Social = () => {
  return (
    <ul>
      <li onClick={() => shell.openExternal('https://twitter.com/getsnipapp')}>
        <TwitterIcon />
      </li>

      <li
        onClick={() =>
          shell.openExternal('https://github.com/achuth-hadnoor/snip')
        }
      >
        <GithubIcon />
      </li>

      <li
        onClick={() =>
          shell.openExternal('https://producthunt.com/posts/snip')
        }
      >
        <ProductHuntIcon />
      </li>

      <style jsx>{`
        ul {
          display: flex;
          justify-content: space-between;
          width: 100px;
          margin-left: auto;
          margin-right: auto;
        }

        li {
          cursor: pointer;
        }
      `}</style>
    </ul>
  )
}

export default Social
