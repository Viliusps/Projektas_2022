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

//const ariaLabel = { 'aria-label': 'description' };

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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


  //gets updated cryptocurrency prices from CoinGecko
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false')
    .then(input => {
      setCoins(input.data)
    }).catch(ex => console.log('Price error!'));
  });


  //adds cryptocurrency prices to the local storage, may transfer this function to another file in the future
  updateCryptoCurrencyDatabase(coins);

  /* //For (if) search implementation
  const handleChange = change => {
    setSearch(change.target.value) 
  }

  //For (if) search implementation
  const filteredCoins = coins.filter(coin => {
    coin.name.toLowerCase().includes(search.toLowerCase())
  }) */

  const portfolioSum = portfolioValuesSum(coins);
  var portfolioString=""
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
        <div className="header-right">
            <a href="/home">Home</a>
            <a href="/deposit">Deposit</a>
            <a href="/trade">Trade</a>
            <a href="/tradehistory">Trade History</a>
            <a className="active" href="/portfolio">Portfolio</a>
            <a><Button
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
                            id="basic-menu"
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
                    </a>  
        </div>
    </div>
    </div>
      <header className="App-header">
        <h3>{portfolioString}</h3>
{/*       <form style={{marginLeft: '50%', marginBottom: '30px'}}>
         Useful if the user owns lots of cryptocurrencies 
        <Input placeholder="Search" inputProps={ariaLabel} onChange={handleChange} defaultValue=""/>
      </form> */}
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
          <TableRow id="euro-row"
            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            hover
          >
            {/*Symbol link:  "https://cdn.icon-icons.com/icons2/1369/PNG/512/-euro-symbol_90430.png" */}
           <TableCell align="center" className='tableHeader'><img src={logo} alt="Euro logo" className="cryptocurrency-logo"/></TableCell>
            <TableCell align="center" className='tableHeader'>Euro</TableCell>
            <TableCell align="center" className='tableHeader'>EUR</TableCell>
            <TableCell align="center" className='tableHeader'>{parseFloat(localStorage.getItem("EUR")).toFixed(2)}</TableCell>
            <TableCell align="center" className='tableHeader'>1</TableCell>
            <TableCell align="center" className='tableHeader'>€{parseFloat(localStorage.getItem("EUR")).toFixed(2)}</TableCell>
            <TableCell align="center" className='tableHeader'></TableCell>
          </TableRow>
          {coins.filter(coin => (localStorage.getItem(coin.symbol.toUpperCase()) > 0)).map(coin => ( //Leaves only those cryptocurrencies that the user owns
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

  //adds cryptocurrency prices to the local storage
function updateCryptoCurrencyDatabase(coins) {
  for (let i = 0; i < coins.length; i++) {
    let currentItem = localStorage.getItem(coins[i].symbol.toUpperCase());
    if (currentItem === null) { //if the item does not exist
      localStorage.setItem(coins[i].symbol.toUpperCase(), 0)
    }
  }
}

function RedirectUser()
{
    window.location.replace('/usersettings');
}
function portfolioValuesSum(coins) {
  var filtered = coins.filter(coin => localStorage.getItem(coin.symbol.toUpperCase()) > 0);
  if (filtered.length === 0) {
    if (localStorage.getItem("EUR") !== null)
      return localStorage.getItem("EUR");
    else return 0;
  }
  else {
    let sum = 0;
    for (let i = 0; i < filtered.length; i++) {
      sum += parseFloat(filtered[i].current_price * localStorage.getItem(filtered[i].symbol.toUpperCase()));
    }
    sum += parseFloat(localStorage.getItem("EUR"));
    return sum;
  }

}
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}
export default App;