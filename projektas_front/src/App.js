import "./App.css";
import { Navigate, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Deposit from "./Pages/Deposit";
import Trade from "./Pages/Trade";
import Home from "./Pages/Home";
import Portfolio from "./Pages/Portfolio";
import TradeHistory from "./Pages/TradeHistory";
import Staking from "./Pages/Staking";
import UserSettings from "./Pages/UserSettings";

function App() {
  var Auth = localStorage.getItem("auth");
  var authent;
  if(Auth=="false")
    authent=false;
    else
    authent=true;
  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/registration" element={<Registration/>}/>
        <Route exact path="/deposit" element={<PrivateRoute auth={{isAuthenticated: authent }}><Deposit/></PrivateRoute>}/>
        <Route exact path="/trade" element={<PrivateRoute auth={{isAuthenticated: authent }}><Trade/></PrivateRoute>}/>
        <Route exact path="/staking" element={<PrivateRoute auth={{isAuthenticated: authent }}><Staking/></PrivateRoute>}/>
        <Route exact path="/home" element={<PrivateRoute auth={{isAuthenticated: authent }}><Home/></PrivateRoute>}/>
        <Route exact path="/portfolio" element={<PrivateRoute auth={{isAuthenticated: authent }}><Portfolio/></PrivateRoute>}/>
        <Route exact path="/tradehistory" element={<PrivateRoute auth={{isAuthenticated: authent }}><TradeHistory/></PrivateRoute>}/>
        <Route exact path="/usersettings" element={<PrivateRoute auth={{isAuthenticated: authent }}><UserSettings/></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
  return isAuthenticated ? children : <Navigate to='/' />;
};
export default App;