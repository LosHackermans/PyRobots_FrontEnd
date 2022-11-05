import '../../css/navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-color">
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link link-light" href="/">Home</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link link-light" href="/login">Login</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link link-light" href="/create_user">Create user</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link link-light" href="/matches">Matches</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link link-light" href="/create_match">Create match</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link link-light" href="/upload_robot">Upload robot</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link link-light" href="/simulation">Simulation</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link link-light" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
  );
}

export default Navbar;