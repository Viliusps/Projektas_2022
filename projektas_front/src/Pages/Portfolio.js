import '../App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import React, {useState, useEffect} from 'react';
import logo from '../euro-symbol.png';
import { ReplayOutlined, SignalCellularConnectedNoInternet0BarSharp } from '@material-ui/icons';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import settings_logo from '../settingslogo.png';
import logout_logo from '../logout.png';
import more_logo from '../more.jpg';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@material-ui/core';
//const ariaLabel = { 'aria-label': 'description' };

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [chosenportfolio, setChosen] = React.useState('');
  const [refreshKey, setRefreshKey] = useState(0);

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
    const [coins, setCoins] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [portfolios, setPortfolios] = useState([]);
    const [cryptos, setCryptos] = useState([]);
    useEffect(() => {
        getDatabaseData();
    },[]);

    const getDatabaseData = () => {
        let endpoints = [
        'http://localhost:5000/amounts',
        'http://localhost:5000/portfolios',
        'http://localhost:5000/cryptos',
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false%27'
        ];
        
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: amounts}, {data: portfolios}, {data: cryptos}, {data: coins}] )=> {
      var exists = false;
      amounts.forEach(el => {

        if(el.fk_portfolio == localStorage.getItem("ChosenPortfolio"))
        {
          localStorage.setItem(GetCryptoNameById(cryptos, el.fk_crypto), el.amount);
        }
        if(el.fk_portfolio == portfolios[portfolios.length-1].id)
        {
          exists = true;
          
        }

      })
      
      if(!exists)
      {
        localStorage.setItem("ChosenPortfolio", portfolios[portfolios.length-1].id);
        for (let j = 0; j < cryptos.length; j++) {
          if (!existsInArray(amounts, localStorage.getItem("ChosenPortfolio"), cryptos[j].id)) {
              axios.post('http://localhost:5000/amounts', {
                    amount: 0,
                    staked_amount: 0,
                    when_staked: "0000-00-00",
                    fk_crypto: cryptos[j].id,
                    fk_portfolio: localStorage.getItem("ChosenPortfolio")
              });
            }
        }
      }

      setAmounts(amounts);
      setPortfolios(portfolios);
      setCryptos(cryptos);
      setCoins(coins);
    });
  }

  const portfolioSum = portfolioValuesSum(coins, amounts, cryptos);
  var portfolioString="";
  if (portfolioSum === 0) {
    portfolioString = "Your portfolio is empty";
  }
  else {
    portfolioString = "Your portfolio value: €" + parseInt(portfolioSum).toFixed(2);

  }
  return (
    <div>
    <div>
    <div className="header" id="head">
        <a href="/home" className="logo">Skete</a>
        <p className="ChoosePortfolio"><Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Chosen portfolio</InputLabel>
            <Select
            className="ChoosePortfolio"
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
            <a href="/deposit">Deposit</a>
            <a href="/trade">Trade</a>
            <a href="/staking">Staking</a>
            <a href="/tradehistory">Trade History</a>
            <a className="active" href="/portfolio">Portfolio</a>
            <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className = "Settings-button-container"
                        >
                             <img className = "Settings-button" src={more_logo}></img>
                        </Button>
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

        <div className="toprightcorner">
        <TextField className="PortfolioTextField" id="portfolio" label="New portfolio name" variant="outlined" />
        <br></br>
        <Button className="PortfolioButton"onClick={()=>(NewPortfolio(portfolios, cryptos, amounts, setRefreshKey))}>Create</Button>
        <br></br>
        <label id="error"></label>
        </div>
        
        <h3>{portfolioString}</h3>
      <TableContainer id="table" component={Paper} className="Table">
      <Table sx={{ minWidth: 700}} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center" className='tableHeader'></TableCell>
            <TableCell align="center" className='tableHeader'>Asset</TableCell>
            <TableCell align="center" className='tableHeader'>Symbol</TableCell>
            <TableCell align="center" className='tableHeader'>Amount</TableCell>
            <TableCell align="center" className='tableHeader'>Current Price</TableCell>
            <TableCell align="center" className='tableHeader'>Value</TableCell>
            <TableCell align="center" className='tableHeader'>24h price change</TableCell>
          </TableRow>
        </TableHead>
        { <TableBody>
          {amounts.filter(coin => (coin.fk_portfolio == localStorage.getItem("ChosenPortfolio") && coin.fk_crypto == 6 && coin.amount > 0)).map(coin => (
          <TableRow id="euro-row"
            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            hover
          >
            {/*Symbol link:  "https://cdn.icon-icons.com/icons2/1369/PNG/512/-euro-symbol_90430.png" */}
            
           <TableCell align="center" className='tableHeader'><img src={logo} alt="Euro logo" className="cryptocurrency-logo"/></TableCell>
            <TableCell align="center" className='tableHeader'>Euro</TableCell>
            <TableCell align="center" className='tableHeader'>EUR</TableCell>
            <TableCell align="center" className='tableHeader'>{parseFloat(coin.amount).toFixed(2)}</TableCell>
            <TableCell align="center" className='tableHeader'>1</TableCell>
            <TableCell align="center" className='tableHeader'>€{parseFloat(coin.amount).toFixed(2)}</TableCell>
            <TableCell align="center" className='tableHeader'></TableCell>
          </TableRow>
          ))}
          {coins.filter(coin => (CheckIfOwns(coin.symbol.toUpperCase(), amounts, cryptos) > 0)).map(coin => ( //Leaves only those cryptocurrencies that the user owns
            <TableRow
              key={coin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
              hover
            >
              <TableCell align="center" className='tableElement'><img src={coin.image} alt="Cryptocurrency logo" className="cryptocurrency-logo"/></TableCell>
              <TableCell align="center" className='tableElement'>{coin.name}</TableCell>
              <TableCell align="center" className='tableElement'>{coin.symbol.toUpperCase()}</TableCell>
              <TableCell align="center" className='tableHeader'>{parseFloat(localStorage.getItem(coin.symbol.toUpperCase())).toFixed(2)}</TableCell>
              <TableCell align="center" className='tableHeader'>€{parseFloat(coin.current_price).toFixed(2)}</TableCell>
              <TableCell align="center" className='tableElement'>€{(parseFloat((coin.current_price * localStorage.getItem(coin.symbol.toUpperCase())))).toFixed(2)}</TableCell>
              <TableCell align="center" className='tableHeader'>{coin.price_change_percentage_24h.toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody> }
      </Table>
          </TableContainer>
      {displayTable(portfolioSum)}
    </header>
    </div>
  );
}

function displayTable(portfolioSum) {
  if (parseInt(portfolioSum) === 0) {
    if (document.getElementById("table") != null)
      document.getElementById("table").style.display = "none";
  }

  if (parseFloat(localStorage.getItem("EUR")) === 0) {
    if (document.getElementById("euro-row") != null)
      document.getElementById("euro-row").style.display = "none";
  }
}

function GetCryptoNameById(cryptos, id)
{
    var finalcrypto;
    cryptos.forEach((el)=>{
        if(el.id == id) finalcrypto = el.name;
    })

    return finalcrypto;

}
function CheckIfOwns(crypto, amounts, cryptos)
{
    var result = -1;
    var portfolioid = localStorage.getItem("ChosenPortfolio");
    var cryptoid = GetCryptoIdByName(crypto, cryptos);
    amounts.forEach((el)=>{
      if(el.fk_crypto == cryptoid && el.fk_portfolio == portfolioid)
      {
        result=el.amount;
      }
    })
    return result;
}
function GetCryptoIdByName(name, cryptos)
{
  var id = -1;
  cryptos.forEach((el)=>{
    if(el.name == name) id = el.id;
  })
  return id;
}
function ChangePortfolio(chosenportfolio)
{
    localStorage.setItem("ChosenPortfolio", chosenportfolio);
    window.location.reload(false);
}

function RedirectUser()
{
    window.location.replace('/usersettings');
}
function NewPortfolio(portfolios, cryptos, amounts, setRefreshKey)
{

  document.getElementById('error').innerHTML = '';
  var portfolio_name = document.getElementById("portfolio").value;
  if(portfolio_name == "")
  {
    document.getElementById('error').innerHTML = 'Enter portfolio name';
  }
  else
  {
    var check = false;
    portfolios.forEach(el => {
      if(el.name == portfolio_name && el.fk_user == localStorage.getItem("userID"))
      {
        check = true;
      }    
    });
    if(check)
    {
      document.getElementById('error').innerHTML = 'Portfolio name already exists';
    }
    else{
        axios.post('http://localhost:5000/portfolios',{
          name: portfolio_name,
          fk_user: localStorage.getItem("userID"),
        });
      }
        window.location.reload(false);
    }

  }
  function existsInArray(array, portfolioId, currencyId) {
    for (let i = 0; i < array.length; i++) {
        if (parseInt(array[i].fk_crypto) === parseInt(currencyId) && parseInt(array[i].fk_portfolio) === parseInt(portfolioId)) {
            return true;
          }
    }
    return false;
  }
    
function portfolioValuesSum(coins, amounts, cryptos) {

  console.log(localStorage.getItem("ChosenPortfolio"));
  var values = 0;
  amounts.forEach((el)=>{
    coins.forEach((ell)=>{
      if(el.fk_portfolio == parseFloat(localStorage.getItem("ChosenPortfolio")) && GetCryptoNameById(cryptos, el.fk_crypto).toLowerCase() == ell.symbol)
      {
        console.log("veikia pirmas");
        values += el.amount * ell.current_price;
      }
    })
    if(el.fk_portfolio == localStorage.getItem("ChosenPortfolio") && el.fk_crypto == 6)
    {
      console.log("veikia antras");
      values += el.amount;
    }
  })
  return values;

}
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}
export default App;