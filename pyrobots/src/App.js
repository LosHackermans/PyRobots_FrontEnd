import "./css/App.css";
import { RequireToken } from './helpers/Auth'
import { CreateUser } from "./components/CreateUser";
import { CreateMatch } from './components/CreateMatch';
import Home from './components/Home';
import Login from './components/Login';
import ListMatches from './components/ListMatches';
import Upload from './components/Upload';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            PyRobots
          </a>
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/create_user">Create user</Link>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/list_matches">List matches</Link>
          <Link className="link" to="/create_match">Create match</Link>
          <Link className="link" to="/upload_robot">Upload robot</Link>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create_user" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list_matches" element={<RequireToken><ListMatches /></RequireToken>} />
          <Route path="/create_match" element={<CreateMatch />} />
          <Route path="/upload_robot" element={<RequireToken><Upload /></RequireToken>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
