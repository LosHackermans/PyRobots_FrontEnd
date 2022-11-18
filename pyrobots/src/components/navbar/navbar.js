import '../../css/navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-color">
      <div className="container-fluid">
        <button className="navbar-toggler ml-auto custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link my-link-light" href="/matches">Matches</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link my-link-light" href="/robots">Robots</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link my-link-light" href="/simulation">Simulation</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link my-link-light" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;