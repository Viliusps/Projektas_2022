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

function App() {
    const [coins, setCoins] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [portfolios, setPortfolios] = useState([]);
    const [cryptos, setCryptos] = useState([]);

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
        
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: amounts}, {data: portfolios}, {data: cryptos}, {data: coins}] )=> {
        cryptos.forEach(el=> {
            if(el.staking_percentage>0)
            {
                localStorage.setItem(el.name+"stakePercentage",el.staking_percentage);
            }
        })
      
        amounts.forEach(el => {
        if(el.fk_portfolio == localStorage.getItem("UserPortfolio"))
        {
          localStorage.setItem(GetCryptoNameById(cryptos, el.fk_crypto), el.amount);
          localStorage.setItem(GetCryptoNameById(cryptos, el.fk_crypto)+"stake", el.staking_amount);
        }
      })

      setAmounts(amounts)
      setPortfolios(portfolios)
      setCryptos(cryptos)
      setCoins(coins)
    });
  }
  //adds cryptocurrency prices to the local storage, may transfer this function to another file in the future
 // updateCryptoCurrencyDatabase(coins);

  /* //For (if) search implementation
  const handleChange = change => {
    setSearch(change.target.value) 
  }
  //For (if) search implementation
  const filteredCoins = coins.filter(coin => {
    coin.name.toLowerCase().includes(search.toLowerCase())
  }) */

  /*const portfolioSum = portfolioValuesSum(coins);
  var portfolioString=""
  var portfolioString="";
  if (portfolioSum === 0) {
    portfolioString = "Your portfolio is empty";
  }
  else {
    portfolioString = "Your portfolio value: €" + parseInt(portfolioSum).toFixed(2);

  }*/
  return (
    <div>
    <div>
    <div className="header" id="head">
        <a href="/home" className="logo">Skete</a>
        <div className="header-right">
            <a href="/home">Home</a>
            <a href="/deposit">Deposit</a>
            <a href="/trade">Trade</a>
            <a className="active" href="/staking">Staking</a>
            <a href="/tradehistory">Trade History</a>
            <a href="/portfolio">Portfolio</a>
            <a onClick={Redirect} href="#" >Logout</a>
        </div>
    </div>
    </div>
      <header className="App-header">
       <h3>{/*portfolioString*/}</h3>
        {/*<form style={{marginLeft: '50%', marginBottom: '30px'}}>
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
            <TableCell align="center" className='tableHeader'>Rewards</TableCell>
            <TableCell align="center" className='tableHeader'>Amount</TableCell>
            <TableCell align="center" className='tableHeader'>Staked amount</TableCell>
            <TableCell align="center" className='tableHeader'></TableCell>
            <TableCell align="center" className='tableHeader'></TableCell>
          </TableRow>
        </TableHead>
        { <TableBody>
          {coins.filter(coin => (localStorage.getItem(coin.symbol.toUpperCase()+"stakePercentage") > 0)).map(coin => ( //Leaves only those cryptocurrencies that the user owns
            <TableRow
              key={coin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
              hover
            >
              <TableCell align="center" className='tableElement'><img src={coin.image} alt="Cryptocurrency logo" className="cryptocurrency-logo"/></TableCell>
              <TableCell align="center" className='tableElement'>{coin.name}</TableCell>
              <TableCell align="center" className='tableElement'>{coin.symbol.toUpperCase()}</TableCell>
              <TableCell align="center" className='tableElement'>{localStorage.getItem(coin.symbol.toUpperCase()+"stakePercentage")}</TableCell>
              <TableCell align="center" className='tableElement'>{localStorage.getItem(coin.symbol.toUpperCase())}</TableCell>
              <TableCell align="center" className='tableElement'>{localStorage.getItem(coin.symbol.toUpperCase()+"stake")}</TableCell>
            </TableRow>
        ))}
        </TableBody> }
      </Table>
          </TableContainer>
      
      {/*displayTable(portfolioSum)*/}
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

function GetCryptoPercentageById(cryptos, id)
{
    var finalcrypto;
    cryptos.forEach((el)=>{
        if(el.id == id) finalcrypto = el.staking_percentage;
    })

    return finalcrypto;
}
  //adds cryptocurrency prices to the local storage
/*function updateCryptoCurrencyDatabase(coins) {
  for (let i = 0; i < coins.length; i++) {
    let currentItem = localStorage.getItem(coins[i].symbol.toUpperCase());
    if (currentItem === null) { //if the item does not exist
      localStorage.setItem(coins[i].symbol.toUpperCase(), 0)
    }
  }
}*/


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