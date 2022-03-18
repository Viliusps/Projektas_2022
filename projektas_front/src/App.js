import logo from './logo.svg';
import './App.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Money deposit</h1>
       <a>Select how much you want to deposit</a>
       <TextField

          class="TextField"
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="outlined">Deposit</Button>
      </header>
    </div>
  );
}

export default App;
