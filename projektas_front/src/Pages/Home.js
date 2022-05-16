import '../App.css';
import axios from 'axios'
import React, {useState, useEffect} from 'react';
import { TramRounded } from '@material-ui/icons';
import AppTrade from './Trade.js';
import logo from '../Bitcoin-Logo.png';
import CryptoList from './dbtest';

function App() {

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
        'http://localhost:5000/cryptos'
        ];
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: amounts}, {data: portfolios}, {data: cryptos}] )=> {
            setAmounts(amounts)
            setPortfolios(portfolios)
            setCryptos(cryptos)
    });
    setAmountsToZero(amounts, portfolios, cryptos);
  }
    return (
        <div>
            <div className="header" id="head">
                <a href="/home" className="logo">Skete</a>
                <div className="header-right">
                    <a className="active" href="/home">Home</a>
                    <a href="/deposit">Deposit</a>
                    <a href="/trade">Trade</a>
                    <a href="/tradehistory">Trade History</a>
                    <a href="/portfolio">Portfolio</a>
                    <a onClick={Redirect} href="#">Logout</a>
                </div>
            </div>
            <div className="App-header">
                <div className="toprightcorner">
                    <label id="assets"></label>
                    <br></br>
                    <label id="cryptoSum"></label>
                    <br></br>
                    <label id="change"></label>
                </div>
                <img className = "App-logo" src={logo}></img>
            </div> 
        </div>
    )
}

window.onload = function()
{
    
    //Trade langui reikalinga
    localStorage.setItem("Market1", -1);
    localStorage.setItem("Market2", -1);
    //--------------------------------
    
    
    const ALLcoins = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false%27').then(input => input.data);
    ALLcoins.then(function(coins) {
        var wallet=0;
        coins.forEach(coin => {
            if(localStorage.getItem(coin.symbol.toUpperCase()) > 0)
                wallet+=parseFloat(coin.current_price) * parseFloat(localStorage.getItem(coin.symbol.toUpperCase()))
        });

        if(localStorage.getItem("EUR") > 0)
            wallet+=parseFloat(localStorage.getItem("EUR"));
        
        localStorage.setItem("AssetValue", wallet)
        document.getElementById('assets').innerHTML = "Your portfolio value: " + "€" + wallet.toFixed(2);

        var changeAvg=0;
        var count=0;
        coins.forEach(coin => {
            if(localStorage.getItem(coin.symbol.toUpperCase()) > 0)
            {
                changeAvg+=parseFloat(coin.price_change_percentage_24h)*(parseFloat(localStorage.getItem(coin.symbol.toUpperCase()))*parseFloat(coin.current_price))
                count+=parseFloat(localStorage.getItem(coin.symbol.toUpperCase()))*parseFloat(coin.current_price)
            }      
        });
        var change=changeAvg/count;
        if(count==0)
            change=0;
        document.getElementById('cryptoSum').innerHTML = "Assets value: " + "€" + count.toFixed(2);
        document.getElementById('change').innerHTML = "24h Price Change: " + change.toFixed(2) + "%";
      });

      
}


  function existsInArray(array, portfolioId, currencyId) {
    array.forEach(element => {
      if (parseInt(element.fk_crypto) === parseInt(currencyId) && parseInt(element.fk_portfolio) === parseInt(portfolioId)) {
        return true;
      }
    })
    return false;
  }


function setAmountsToZero(databaseAmounts, databasePortfolios, databaseCurrencies) {
  let userId = parseInt(localStorage.getItem("userID"));
  if (userId === null || databaseAmounts.length > 0) return;


  databasePortfolios.forEach(portfolio => {
      if (parseInt(portfolio.fk_user) === userId) {
          databaseCurrencies.forEach(currency => {
            if (!existsInArray(databaseAmounts, portfolio.id, currency.id)) {
              axios.post('http://localhost:5000/amounts', {
                  amount: 0,
                  fk_crypto: currency.id,
                  fk_portfolio: portfolio.id
              }).then((response) => {
                console.log(response)});
            }
          });
      }
  });
}

//Visuose paages turi buti!
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}

export default App;