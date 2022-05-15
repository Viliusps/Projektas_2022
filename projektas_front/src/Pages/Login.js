import '../App.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Email, SettingsBackupRestoreSharp } from '@material-ui/icons';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const navigate = useNavigate();
  const [users, setUser] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [databaseAmounts, setAmounts] = useState([]);

    useEffect(() => {
      getDatabaseData();
    }, []);

    const getDatabaseData = () => {
      let endpoints = [
        'http://localhost:5000/users',
        'http://localhost:5000/portfolios',
        'http://localhost:5000/cryptos',
        'http://localhost:5000/amounts'
      ]

      axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: users}, {data: portfolios}, {data: currencies}, {data: amounts}]) => {
        setAmounts(amounts);
        setCryptos(currencies);
        setUser(users);
        setPortfolios(portfolios);
      })
    }


  return (
    <div className="App">
      <header className="App-header">
       <h1>Login</h1>
       <TextField
          required
          id="email"
          label="E-mail"
          InputLabelProps={{
            style: { color: 'white'},
          }}
        />
        <br></br>
        <TextField
            required
            id="password"
            label="Password"
            type="password"
            InputLabelProps={{
              style: { color: 'white'},
            }}
          />
          <br></br>
          <label id="error"></label>
        <Button variant="outlined" onClick={()=> (CheckInfo(users), CheckPortfolio(portfolios, cryptos))}>Login</Button>
        <br></br>
        <Button variant="outlined" onClick={() => {navigate('/registration')}}>Registration</Button>
      </header>
    </div>
  );
}

function CheckPortfolio(portfolios, cryptos)
{
    console.log("as");

      var userid = localStorage.getItem("userID");
      var portfolioid;
      var exists = false;
      portfolios.forEach((el)=>{
        if(el.fk_user == userid && !exists) 
        {
            portfolioid = el.id;
            exists = true;
        }
    })
    
    if(exists == false && portfolioid == undefined)
    {
        var name = "Default";
        axios.post('http://localhost:5000/portfolios',{
            name: name,
            fk_user: userid
        });
    }
}

function CheckInfo(users){
  localStorage.clear();
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var id;
  var exists = false;
  var id;
  users.forEach((el)=>{
    if(el.email == email && el.password==password)
    {
      exists=true;
      id=el.id;
    }
  })
  if(exists)
  {
    localStorage.setItem("auth", true);
    localStorage.setItem("userID", id);
    window.location.href=('/home');
  }
  else
  {
    document.getElementById('error').innerHTML = 'Login information is incorrect';
  }
}

export default App;
