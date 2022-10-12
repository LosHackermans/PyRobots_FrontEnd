import './App.css';
import Create_user from "./create_user/create_user";
import Create_match from './create_match/create_match';
import Home from './home/home';
import Login from './login/login';
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
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create_user" element={<Create_user/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/list_matches" element={<List_matches/>}/>
          <Route path="/create_match" element={<Create_match/>}/>
          <Route path="/upload_robot" element={<Upload/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
