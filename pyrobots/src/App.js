import './App.css';
import { RequireToken } from './common/Auth'
import Create_user from "./create_user/create_user";
import CreateMatch from './match/CreateMatch';
import Home from './home/home';
import Login from './login/Login';
import List_matches from './list_matches/list_matches';
import Upload from './robot/upload';
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create_user" element={<Create_user />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list_matches" element={<RequireToken><List_matches /></RequireToken>} />
        <Route path="/create_match" element={<RequireToken><CreateMatch /></RequireToken>} />
        <Route path="/upload_robot" element={<RequireToken><Upload /></RequireToken>} />
      </Routes>

    </Router>
  );
}

export default App;
