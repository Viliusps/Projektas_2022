import '../App.css';
import axios from 'axios'
import React, {useState, useEffect} from 'react';
import { CollectionsBookmarkOutlined, ContactSupportOutlined, TramRounded } from '@material-ui/icons';
import AppTrade from './Trade.js';
import logo from '../Bitcoin-Logo.png';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import settings_logo from '../settingslogo.png';
import { TextField } from '@material-ui/core';
import { Link, Navigate, useNavigate, useRoutes } from 'react-router-dom';

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
    return(
        
    <form>
    <div className="App">
      <header className="App-header">
        <h1>Change password</h1>
        <TextField
            inputProps={{ inputMode: 'text'}}
            required
            id="oldpassword"
            label="Enter old password"
            type="password"
            InputLabelProps={{
              style: { color: 'white'},
            }}
          />
        <TextField
            inputProps={{ inputMode: 'text'}}
            required
            id="newpassword"
            label="New password"
            type="password"
            InputLabelProps={{
              style: { color: 'white'},
            }}
          />
        <TextField
            inputProps={{ inputMode: 'text'}}
            required
            id="repassword"
            label="Re-enter new password"
            type="password"
            InputLabelProps={{
              style: { color: 'white'},
            }}
        />
        <br></br>
        <label id="error"></label>
        <Button variant="outlined" onClick={()=>Validate(users)}><a style={{ fontSize: '25px' }}>Save password</a></Button>
        <br></br>
        <Button variant="outlined" onClick={() => {navigate('/home')}}><a style={{ fontSize: '25px' }}>Back</a></Button>
        <br></br>
      </header>
    </div>
  </form>
    )
}
function Validate(users)
{
    var oldpass=document.getElementById("oldpassword").value;
    var newpass=document.getElementById("newpassword").value;
    var repass=document.getElementById("repassword").value;
    document.getElementById('error').innerHTML = '';
    var found = false;
    var userid = -1;
    users.forEach((el)=>{
      if(el.password == oldpass)
      {
        found=true;
        userid = el.id;
      }
      
    })
    if(!found)
    {
        document.getElementById('error').innerHTML = 'Password incorrect';
    }
    else if(!newpass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    {
      document.getElementById('error').innerHTML = 'Password is not in the correct format. There has to be at least one uppercase letter, lowercase letter, number, and 8 symbols';
    }
    else if(newpass!=repass)
    {
      document.getElementById('error').innerHTML = 'Passwords do not match';
    }
    else
    {
      
      axios.patch('http://localhost:5000/users/' + userid,{
        password: newpass
      });
      window.location.reload();
      alert("Succesfully changed password");
    }
}
//Visuose paages turi buti!
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}

export default App;