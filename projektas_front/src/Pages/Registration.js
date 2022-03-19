import logo from '../logo.svg';
import '../App.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
       <h1>Registration</h1>
       <TextField
          required
          id="outlined-required"
          label="Username"
          InputLabelProps={{
            style: { color: 'white'},
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="E-mail"
          InputLabelProps={{
            style: { color: 'white'},
          }}
        />
        <TextField
            required
            id="outlined-required"
            label="Password"
            type="password"
            InputLabelProps={{
              style: { color: 'white'},
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Re-enter password"
            type="password"
            InputLabelProps={{
              style: { color: 'white'},
            }}
          />
        <Button variant="outlined" onClick={() => {navigate('/')}}>Sign-up</Button>

        <Button variant="outlined" onClick={() => {navigate('/')}}>Back</Button>
        <br></br>
      </header>
    </div>
  );
}

export default App;
