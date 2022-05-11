import '../App.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Email } from '@material-ui/icons';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const navigate = useNavigate();

  const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUser(response.data);
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
        <Button variant="outlined" onClick={()=>CheckInfo(users)}>Login</Button>
        <br></br>
        <Button variant="outlined" onClick={() => {navigate('/registration')}}>Registration</Button>
      </header>
    </div>
  );
}

function CheckInfo(users){
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;

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
    window.location.href=('/home');
  }
  else
  {
    document.getElementById('error').innerHTML = 'Login information is incorrect';
  }
}

export default App;
