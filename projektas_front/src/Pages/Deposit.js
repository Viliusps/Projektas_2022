import '../App.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

function App() {
  var currentvalue = localStorage.getItem("EUR");
  return (
    <div>
    <div>
    <div className="header" id="head">
        <a href="/home" className="logo">Skete</a>
        <div className="header-right">
            <a href="/home">Home</a>
            <a className="active" href="/deposit">Deposit</a>
            <a href="/trade">Trade</a>
            <a href="/portfolio">Portfolio</a>
            <a onClick={Redirect}>Logout</a>
        </div>
    </div>
    </div>
      <header className="App-header">
       <label className="Balance">Current balance: { currentvalue }</label>
       <h1>Money deposit</h1>
       <a>Select how much you want to deposit</a>
       <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          className="TextField"
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="outlined" id="save" onClick={Save}>Deposit</Button>
        <Button variant="outlined" id="clear" onClick={Clear}>Clear balance</Button>
      </header>
    </div>
  );
}
function Save(){
  var previousvalue = localStorage.getItem("EUR");
  var value = document.getElementById("outlined-number").value;
  var currentvalue = parseInt(previousvalue) + parseInt(value);
  console.log(currentvalue);
  if(previousvalue==null)
    localStorage.setItem("EUR", 0);
  if(parseInt(value) < 0 || value == '') localStorage.setItem("EUR", previousvalue.toFixed(2));
  else localStorage.setItem("EUR", currentvalue.toFixed(2));
  window.location.reload(false);
}
function Clear(){
  localStorage.setItem("EUR", 0);
  window.location.reload(false);
}
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}
export default App;