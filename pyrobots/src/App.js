import './css/App.css';
import { RequireToken, setupAxios } from './helpers/Auth'
import CreateUser from "./components/create_user/create_user";
import CreateMatch from './components/match/CreateMatch';
import Home from './components/home/home';
import Login from './components/login/Login';
import ListMatches from './components/match/ListMatches';
import Logout from './components/login/Logout';
import Upload from './components/robot/upload';
import Simulation from "./components/simulation/Simulation";
import Navbar from "./components/navbar/navbar"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  setupAxios();
  return (
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create_user" element={<CreateUser />} />
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
