import {NavLink} from 'react-router-dom';

function Navigation(){
  return (
    <>
      <nav className="nav">
        <ul>
          <li >
            <NavLink
              className="nav-item"
              activeClassName="active"
              exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-item"
              activeClassName="active"
              to="/new-poll">
              New Poll
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation;
