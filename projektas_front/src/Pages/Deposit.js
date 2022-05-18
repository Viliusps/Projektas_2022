import '../App.css';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Button1 from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import settings_logo from '../settingslogo.png';
import logout_logo from '../logout.png';
import more_logo from '../more.jpg';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [chosenportfolio, setChosen] = React.useState('');

  const handleChange = (event) => {
    setChosen(event.target.value);
    ChangePortfolio(event.target.value)
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [amounts, setAmounts] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [prices, setPrices] = useState([]);
  useEffect(() => {
      getDatabaseData();
  }, []);
  const getDatabaseData = () => {
      let endpoints = [
      'http://localhost:5000/amounts',
      'http://localhost:5000/portfolios',
      'http://localhost:5000/cryptos',
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false%27'
      ];

  axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: amounts}, {data: portfolios}, {data: cryptos}, {data: prices}] )=> {
      setAmounts(amounts)
      setPortfolios(portfolios)
      setCryptos(cryptos)
      setPrices(prices)
  });
}

  //------------------------------------------------
  //localStorage.clear();
  var currentvalue=0;
  amounts.forEach((el)=>{
      if(el.fk_crypto == 6 && el.fk_portfolio == localStorage.getItem("ChosenPortfolio"))
      {
        currentvalue += el.amount;
      }
  })


  return (
    <div>
    <div>
    <div className="header" id="head">
        <a href="/home" className="logo">Skete</a>
        <p className="ChoosePortfolio"><Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Chosen portfolio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={localStorage.getItem("ChosenPortfolio")}
              label="Portfolio"
              onChange={(handleChange)}
            >
              { portfolios.filter(portfolio => (portfolio.fk_user == localStorage.getItem("userID"))).map((portfolio) => (
                
                <MenuItem value={portfolio.id}>{portfolio.name}</MenuItem>

                    )) }
            </Select>
          </FormControl>
        </Box>
        </p>
        <div className="header-right">
            <a href="/home">Home</a>
            <a className="active" href="/deposit">Deposit</a>
            <a href="/trade">Trade</a>
            <a href="/staking">Staking</a>
            <a href="/tradehistory">Trade History</a>
            <a href="/portfolio">Portfolio</a>
            <Button1
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className = "Settings-button-container"
                        >
                             <img className = "Settings-button" src={more_logo}></img>
                        </Button1>
                        <Menu
                            className="Settings-menu"
                            id="basicmenu2"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={()=>RedirectUser()}><img className = "Settings-button" src={settings_logo}></img> Settings</MenuItem>
                            <MenuItem onClick={Redirect}><img className = "Settings-button" src={logout_logo}></img> Logout</MenuItem>
                        </Menu>
        </div>
    </div>
    </div>
      <header className="App-header">
       <label className="Balance">Current balance: { parseFloat(currentvalue).toFixed(2) } €</label>
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
        <br></br>
        <Button variant="outlined" id="save" onClick={()=>Save(amounts, portfolios, cryptos)}>Deposit</Button>
        <br></br>
        <Button variant="outlined" id="clear" onClick={()=>Clear(amounts)}>Clear balance</Button>
      </header>
    </div>
  );
}
function Save(amounts, portfolios, cryptos){

  if(document.getElementById("outlined-number").value > 0)
  {
      var value = parseFloat(document.getElementById("outlined-number").value);
  }
  else
  {
    var value = 0;
  }
  var previousvalue = 0;
  amounts.forEach((el)=>{
      if(el.fk_crypto==6 && el.fk_portfolio == parseFloat(localStorage.getItem("ChosenPortfolio")))
      {
          previousvalue += el.amount;
      }
})

var currentvalue = parseFloat(previousvalue) + parseFloat(value);
if(currentvalue != previousvalue)
{
  var exists = false;
  amounts.forEach((el)=>{
    if(el.fk_portfolio == localStorage.getItem("ChosenPortfolio") && el.fk_crypto == 6)
    {
      exists = true;
        axios.patch('http://localhost:5000/amounts/' + el.id,{
          amount: currentvalue
      })
    }
  })
  if(!exists)
  {
    axios.post('http://localhost:5000/amounts', {
                        amount: currentvalue,
                        staked_amount: 0,
                        when_staked: "0000-00-00",
                        fk_crypto: 6,
                        fk_portfolio: localStorage.getItem("ChosenPortfolio")
                  })
  }

}
  var currentvalue = parseFloat(previousvalue) + parseFloat(value);

  if(parseFloat(value) < 0 || value == 0) localStorage.setItem("EUR", previousvalue.toFixed(2));
  else localStorage.setItem("EUR", currentvalue.toFixed(2));
  window.location.reload(false);
}
function Clear(amounts){
  amounts.forEach((el)=>{
    if(el.fk_portfolio == localStorage.getItem("ChosenPortfolio") && el.fk_crypto == 6)
    {
      axios.patch('http://localhost:5000/amounts/' + el.id,{
        amount: 0
    })
    }
  })
  window.location.reload(false);
}
function RedirectUser()
{
    window.location.replace('/usersettings');
}
function ChangePortfolio(chosenportfolio)
{
    localStorage.setItem("ChosenPortfolio", chosenportfolio);
    window.location.reload(false);
}
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}
export default App;