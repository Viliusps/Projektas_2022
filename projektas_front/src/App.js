import "./App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Deposit from "./Pages/Deposit";
import Trade from "./Pages/Trade";
function App() {
  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/registration" element={<Registration/>}/>
        <Route exact path="/deposit" element={<Deposit/>}/>
        <Route exact path="/trade" element={<Trade/>}/>
      </Routes>
    </Router>
  );
}

export default App;