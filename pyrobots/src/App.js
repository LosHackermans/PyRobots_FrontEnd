import './css/App.css';
import { RequireToken, setupAxios } from './helpers/Auth'
import CreateUser from "./components/create_user/create_user";
import CreateMatch from './components/match/CreateMatch';
import Login from './components/login/Login';
import ListMatches from './components/match/ListMatches';
import Logout from './components/login/Logout';
import Upload from './components/robot/upload';
import Simulation from "./components/simulation/Simulation";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ListRobots from './components/robot/ListRobots';

function App() {
  setupAxios();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create_user" element={<CreateUser />} />
        <Route path="/matches" element={<RequireToken><ListMatches /></RequireToken>} />
        <Route path="/logout" element={<RequireToken><Logout /></RequireToken>} />
        <Route path="/create_match" element={<RequireToken><CreateMatch /></RequireToken>} />
        <Route path="/upload_robot" element={<RequireToken><Upload /></RequireToken>} />
        <Route path="/robots" element={<RequireToken><ListRobots /></RequireToken>} />
        <Route path="/simulation" element={<RequireToken><Simulation /></RequireToken>} />
      </Routes>
    </Router>
  );
}

export default App;
