import '../App.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Email } from '@material-ui/icons';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {

  //Patikrina ar yra portfolio



  const navigate = useNavigate();

  const [users, setUser] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        getUsers();
        getPortfolio();
        getCrypto();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUser(response.data);
    }
    const getPortfolio = async () => {
      const response = await axios.get('http://localhost:5000/portfolios');
      setPortfolios(response.data);
  }
  const getCrypto = async () => {
    const response = await axios.get('http://localhost:5000/cryptos');
    setCryptos(response.data);
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
      var userid = localStorage.getItem("userid");
      var portfolioid;
      var exists = false;
      portfolios.forEach((el)=>{
        if(el.fk_user == userid) 
        {
            //console.log(el.id);
            //console.log(el.fk_user, userid);
            portfolioid = el.id;
            exists = true;
        }
    })
    localStorage.setItem("loggedInUserPortfolio", portfolioid);
    console.log(exists);
    console.log(portfolioid);
    if(exists == false && portfolioid == undefined)
    {
        console.log('a');
        var name = "Default";
        axios.post('http://localhost:5000/portfolios',{
            name: name,
            fk_user: userid
        });
        var cryptoId = GetCryptoByName("EUR", cryptos);
        axios.post('http://localhost:5000/amounts',{
            amount: 0,
            fk_crypto: cryptoId,
            fk_portfolio: portfolioid 
        });
    }
}
function GetCryptoByName(name, cryptos)
{
  var finalcrypto = '';
  cryptos.forEach((el)=>{
    console.log(el.id);
    if(el.name == name) finalcrypto = el.id;
})
  
return finalcrypto;
}
function CheckInfo(users){
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var id;
  var exists = false;
  var id;
  users.forEach((el)=>{
    console.log(el.id);
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
    console.log(localStorage.getItem("auth"));
   // window.location.href=('/home');
  }
  else
  {
    document.getElementById('error').innerHTML = 'Login information is incorrect';
  }
}

export default App;
