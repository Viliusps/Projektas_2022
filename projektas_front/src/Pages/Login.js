import '../App.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Email } from '@material-ui/icons';

function App() {
  const navigate = useNavigate();

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
        <Button variant="outlined" onClick={CheckInfo}>Login</Button>
        <br></br>
        <Button variant="outlined" onClick={() => {navigate('/registration')}}>Registration</Button>
      </header>
    </div>
  );
}

function CheckInfo(){
  if (localStorage && 'Email' in localStorage) {
    var Email = localStorage.getItem("Email");
  }
  if (localStorage && 'Password' in localStorage) {
    var Password = localStorage.getItem("Password");
  }

  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;

  if(email==Email && password==Password)
  {
    window.location.href='/deposit';
  }
  else
  {
    document.getElementById('error').innerHTML = 'Login information is incorrect';
  }
}

export default App;
