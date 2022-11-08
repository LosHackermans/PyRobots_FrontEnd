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
              <a className="nav-link my-link-light" href="/">Home</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link my-link-light" href="/login">Login</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link my-link-light" href="/create_user">Create user</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link my-link-light" href="/matches">Matches</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link my-link-light" href="/create_match">Create match</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link my-link-light" href="/upload_robot">Upload robot</a>
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
    // <nav className="navbar navbar-expand-lg navbar-color">
    //   <div className="container-fluid">
    //     <div>
    //       <input type="checkbox" id="btn-menu" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation" />
    //       <label for="btn-menu" className="lbl-menu">
    //         <span id="spn1" />
    //         <span id="spn2" />
    //         <span id="spn3" />
    //       </label>
    //     </div>
    //     <div className="collapse navbar-collapse" id="menu">
    //      
    //     </div>
    //   </div>
    // </nav>
  );
}

export default Navbar;