import './App.css';
import { RequireToken } from './common/Auth'
import Create_user from "./create_user/create_user";
import CreateMatch from './match/CreateMatch';
import Home from './home/home';
import Login from './login/Login';
import List_matches from './list_matches/list_matches';
import Upload from './robot/upload';
import Simulation from "./simulation/Simulation";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Form
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create_user">Create user</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/list_matches">List matches</Link>
            </li>
            <li>
              <Link to="/create_match">Create match</Link>
            </li>
            <li>
              <Link to="/upload_robot">Upload robot</Link>
            </li>
            <li>
              <Link to="/simulation">Simulation</Link>
            </li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create_user" element={<Create_user />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list_matches" element={<RequireToken><List_matches /></RequireToken>} />
          <Route path="/create_match" element={<RequireToken><CreateMatch /></RequireToken>} />
          <Route path="/upload_robot" element={<RequireToken><Upload /></RequireToken>} />
          <Route path="/simulation" element={<RequireToken><Simulation /></RequireToken>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
