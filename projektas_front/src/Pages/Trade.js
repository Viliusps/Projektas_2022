import * as React from 'react';
import '../App.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';

function App() {
    const [market1, setMarket] = React.useState('');
    const [market2, setMarket2] = React.useState('');
    const handleChange = (event) => {
        setMarket(event.target.value);
        localStorage.setItem("Market1", event.target.value);
    };
    const handleChange2 = (event) => {
      setMarket2(event.target.value);
      localStorage.setItem("Market2", event.target.value);
    };
    const callFunction = (event) =>{
      CalculateValue(listofcurrencies, balances, prices);
    }
    var listofcurrencies = ["BTC", "EUR", "ETH"];
    if(localStorage.getItem("BTC") == null) localStorage.setItem("BTC", 0);
    if(localStorage.getItem("EUR") == null) localStorage.setItem("EUR", 0);
    if(localStorage.getItem("ETH") == null) localStorage.setItem("ETH", 0);
    //Reiksmiu tvarka: btc, eur, eth
    const prices=[];
    prices.push(localStorage.getItem("BTCprice"));
    prices.push(localStorage.getItem("EURprice"));
    prices.push(localStorage.getItem("ETHprice"));

    const balances = [];
    balances.push(localStorage.getItem("BTC"));
    balances.push(localStorage.getItem("EUR"));
    balances.push(localStorage.getItem("ETH"));
    return (
    <div className="App">
      <header className="App-header">
      <div className='Balance'>
      <h2>Current EUR balance: { balances[1] }</h2>
      <h2>Current BTC balance: { balances[0] }</h2>
      <h2>Current ETH balance: { balances[2] }</h2>
      </div>

       <h1>Trade</h1>
       <div className='Market-choice'>
       <FormControl className='FormControl' required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="market-choice1">Buy</InputLabel>
        <Select
          labelId="market-choice1"
          id="market-choice1"
          label="Buy *"
          value={market1}
          onChange={handleChange}
        >
          <MenuItem value={0}>BTC</MenuItem>
          <MenuItem value={1}>EUR</MenuItem>
          <MenuItem value={2}>ETH</MenuItem>
        </Select>
      </FormControl>
      <FormControl className='FormControl' required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="market-choice2">With</InputLabel>
        <Select
          labelId="market-choice2"
          id="market-choice2"
          label="Buy with *"
          value={market2}
          onChange={handleChange2}
        >
          <MenuItem value={0}>BTC</MenuItem>
          <MenuItem value={1}>EUR</MenuItem>
          <MenuItem value={2}>ETH</MenuItem>
        </Select>
      </FormControl>
      </div>
      <a>Select how much you want to buy</a>
       <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          className="TextField"
          id="outlined-number"
          type="number"
          InputLabelProps={{
          shrink: true,
          }}
        />
      <Button variant="outlined" id="trade" onClick={callFunction}>Trade</Button>
      <Button variant="outlined" id="clear" onClick={Clear}>Clear crypto</Button>
      </header>
    </div>
  );
}

function CalculateValue(listofcurrencies, balances, prices){
    const market1 = parseInt(localStorage.getItem("Market1"));
    const market2 = parseInt(localStorage.getItem("Market2"));
    console.log("selected market1", market1); //Su kuo nori pirkti
    console.log("selected market2", market2); //ka nori pirkti
    console.log("pirmo balance", balances[market1]); //Su kuo nori pirkti
    console.log("antro balance", balances[market2]); //ka nori pirkti
    console.log("pirmo price", prices[market1]); //Su kuo nori pirkti
    console.log("antro price", prices[market2]); //ka nori pirkti
    var howmuch = parseInt(document.getElementById("outlined-number").value);
    console.log("Kiek nori pirkti", howmuch);
    if(parseInt(prices[market1]) * howmuch <= parseInt(balances[market2]) * parseInt(prices[market2])){
      balances[market1] = parseInt(balances[market1]) + howmuch;
      balances[market2] = parseInt(balances[market2]) - (parseInt(prices[market1])/parseInt(prices[market2]) * howmuch);
    }
    console.log("pasikeites pirmo balance", balances[market1]); //Su kuo nori pirkti
    console.log("pasikeites antro balance", balances[market2]); //ka nori pirkti
    localStorage.setItem(listofcurrencies[market1], balances[market1].toFixed(2));
    localStorage.setItem(listofcurrencies[market2], balances[market2].toFixed(2));
    window.location.reload(false);
}
function Clear(){
  localStorage.setItem("BTC", 0);
  localStorage.setItem("ETH", 0);
  window.location.reload(false);
}
export default App;