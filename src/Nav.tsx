import { Link } from '@tanstack/react-location';

export const Nav = () => (
  <ul>
    <li>
      <Link to={'/'} getActiveProps={() => ({ style: { fontWeight: 'bold' } })}>
        Top
      </Link>
    </li>
    <li>
      <Link
        to={'/page2'}
        getActiveProps={() => ({ style: { fontWeight: 'bold' } })}
      >
        page2
      </Link>
    </li>
    <li>
      with Params
      <ul>
        <li>
          <Link
            to={'/params/foo/bar/baz'}
            getActiveProps={() => ({ style: { fontWeight: 'bold' } })}
          >
            with Nested params
          </Link>
        </li>
        <li>
          <Link
            to={'/params/foo/bar'}
            getActiveProps={() => ({ style: { fontWeight: 'bold' } })}
          >
            Index page in Neste directory
          </Link>
        </li>
      </ul>
    </li>
  </ul>
);
