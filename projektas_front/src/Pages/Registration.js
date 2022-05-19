import '../App.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link, Navigate, useNavigate, useRoutes } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { SettingsInputCompositeTwoTone } from '@material-ui/icons';

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
    <form>
      <div className="App">
        <header className="App-header">
          <h1>Registration</h1>
          <TextField
            inputProps={{ inputMode: 'email'}}
            required
            id="email"
            label="E-mail"
            type="email"
            InputLabelProps={{
              style: { color: 'white'},
            }}
          />
          <TextField
              inputProps={{ inputMode: 'text'}}
              required
              id="password"
              label="Password"
              type="password"
              InputLabelProps={{
                style: { color: 'white'},
              }}
            />
          <TextField
              inputProps={{ inputMode: 'text'}}
              required
              id="repassword"
              label="Re-enter password"
              type="password"
              InputLabelProps={{
                style: { color: 'white'},
              }}
          />
          <br></br>
          <label id="error"></label>
          <Button variant="outlined" onClick={()=>SaveValues(users)}>Sign-up</Button>
          <br></br>
          <Button variant="outlined" onClick={() => {navigate('/')}}>Back</Button>
          <br></br>
        </header>
      </div>
    </form>
  );
}

function SaveValues(users){
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var Repassword=document.getElementById("repassword").value;
  document.getElementById('error').innerHTML = '';
  var exists=false;
  users.forEach((el)=>{
    if(el.email == email)
    exists=true;
  })
  if(exists)
  {
    document.getElementById('error').innerHTML = 'This user is already registered';
  }
  else if(!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
  {
    document.getElementById('error').innerHTML = 'Email is not in a correct format';
  }
  else if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
  {
    document.getElementById('error').innerHTML = 'Password is not in the correct format. There has to be at least one uppercase letter, lowercase letter, number, and 8 symbols';
  }
  else if(password!=Repassword)
  {
    document.getElementById('error').innerHTML = 'Passwords do not match';
  }
  else
  {
    
    axios.post('http://localhost:5000/users',{
      email: email,
      password: password
    });
    window.location.reload();
    alert("Succesfully registered");
  }
}

export default App;