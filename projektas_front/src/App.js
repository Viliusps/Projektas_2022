import "./App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Deposit from "./Pages/Deposit";

function App() {
  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/registration" element={<Registration/>}/>
        <Route exact path="/deposit" element={<Deposit/>}/>
      </Routes>
    </Router>
  );
}

export default App;