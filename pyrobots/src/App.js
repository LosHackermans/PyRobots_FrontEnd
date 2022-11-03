import './App.css';
import { RequireToken, setupAxios } from './common/Auth'
import Create_user from "./create_user/create_user";
import CreateMatch from './match/CreateMatch';
import Home from './home/home';
import Login from './login/Login';
import ListMatches from './match/ListMatches';
import Logout from './login/Logout';
import Upload from './robot/upload';
import Simulation from "./simulation/Simulation";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  setupAxios();
  return (
    <Router>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/create_user">Create user</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/matches">Matches</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/create_match">Create match</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/upload_robot">Upload robot</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/simulation">Simulation</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create_user" element={<Create_user />} />
          <Route path="/login" element={<Login />} />
          <Route path="/matches" element={<RequireToken><ListMatches /></RequireToken>} />
          <Route path="/logout" element={<RequireToken><Logout /></RequireToken>} />
          <Route path="/create_match" element={<RequireToken><CreateMatch /></RequireToken>} />
          <Route path="/upload_robot" element={<RequireToken><Upload /></RequireToken>} />
          <Route path="/simulation" element={<RequireToken><Simulation /></RequireToken>} />
        </Routes>
    </Router>
  );
}

export default App;
