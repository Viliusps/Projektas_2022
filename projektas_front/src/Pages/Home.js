import '../App.css';
import axios from 'axios'
import React, {useState, useEffect} from 'react';
import { TramRounded } from '@material-ui/icons';
import AppTrade from './Trade.js';
import logo from '../Bitcoin-Logo.png';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import settings_logo from '../settingslogo.png';
import logout_logo from '../logout.png';
import more_logo from '../more.jpg';

function App() {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    const [amounts, setAmounts] = useState([]);
    const [portfolios, setPortfolios] = useState([]);
    const [cryptos, setCryptos] = useState([]);
    useEffect(() => {
        getDatabaseData();
        setAmountsToZero(amounts, portfolios, cryptos);
    }, []);
    const getDatabaseData = () => {
        let endpoints = [
        'http://localhost:5000/amounts',
        'http://localhost:5000/portfolios',
        'http://localhost:5000/cryptos'
        ];

    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: amounts}, {data: portfolios}, {data: cryptos}, {data: prices}] )=> {
        setAmounts(amounts)
        setPortfolios(portfolios)
        setCryptos(cryptos)
        setPrices(prices)
        setAmountsToZero(amounts, portfolios, cryptos)

        var userid=localStorage.getItem("userID");
        var portfolioid;
        portfolios.forEach((el)=>{
            if(el.fk_user==userid)
            {
                portfolioid=el.id;
            }
        })

        var exist=false;
        amounts.forEach((el)=>{
            if(el.fk_portfolio==portfolioid && el.fk_crypto == 6)
            {
                exist=true;
            }
        })

        if(!exist)
        {
            var finalcrypto;
            cryptos.forEach((el)=>{
                if(el.name == "EUR") finalcrypto = el.id;
            })
            
            axios.post('http://localhost:5000/amounts',{
                amount: 0,
                fk_crypto: finalcrypto,
                fk_portfolio: portfolioid
            });
            document.getElementById('assets').innerHTML = "Your portfolio value: " + "€" + 0;
        }
        else{
            portfolios.forEach((el)=>{
                if(el.fk_user==localStorage.getItem("userID"))
                {
                    localStorage.setItem("UserPortfolio", el.id);
                }
            })
            var connecteduserportfolio = localStorage.getItem("UserPortfolio");
            var cryptoname;
            var sum=0;
            var assetsum=0;
            amounts.forEach((el)=>{
                if(el.fk_portfolio==connecteduserportfolio)
                {
                    cryptoname = GetCryptoNameById(cryptos, el.fk_crypto).toLowerCase();
                    console.log("CRYPTONAME" + cryptoname);
                    prices.forEach((ell)=>{
                        if(ell.symbol == cryptoname && cryptoname != "eur")
                        {
                            sum += el.amount * ell.current_price;
                            assetsum += el.amount * ell.current_price;
                        }
                        

                    })
                    if (el.fk_crypto == 6)
                        {
                            sum += el.amount;
                            console.log(el.amount);
                        }

                }
            })
            document.getElementById('assets').innerHTML = "Your portfolio value: " + "€" + sum.toFixed(2);
            document.getElementById('cryptoSum').innerHTML = "Assets value: " + "€" + assetsum.toFixed(2);
            console.log(prices);
        }


        var changeAvg=0;
        var count=0;

        amounts.forEach(el => {
            prices.forEach(coin=>{
                
                if(el.fk_portfolio == localStorage.getItem("UserPortfolio") && el.fk_crypto != 6 && GetCryptoNameById(cryptos,el.fk_crypto).toLowerCase()==coin.symbol)
                {
                    console.log("suveikia");
                    changeAvg+=parseFloat(coin.price_change_percentage_24h)*(parseFloat(el.amount)*parseFloat(coin.current_price));
                    count+=parseFloat(el.amount)*parseFloat(coin.current_price)
                }
            })
        })
        console.log(count);
        var change=0;
        if(count!=0)
            var change=changeAvg/count;
        
        document.getElementById('change').innerHTML = "24h Price Change: " + change.toFixed(2) + "%";
        
        
    });

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
function GetCryptoNameById(cryptos, id)
{
    var finalcrypto;
    cryptos.forEach((el)=>{
        if(el.id == id) finalcrypto = el.name;
    })
    return finalcrypto;
}

function existsInArray(array, portfolioId, currencyId) {
    for (let i = 0; i < array.length; i++) {
        if (parseInt(array[i].fk_crypto) === parseInt(currencyId) && parseInt(array[i].fk_portfolio) === parseInt(portfolioId)) {
            return true;
          }
    }
    return false;
  }

function setAmountsToZero(databaseAmounts, databasePortfolios, databaseCurrencies) {
  let userId = parseInt(localStorage.getItem("userID"));
  if (userId === null) return;

    for (let i = 0; i < databasePortfolios.length; i++) {
        if (parseInt(databasePortfolios[i].fk_user) === userId) {
            for (let j = 0; j < databaseCurrencies.length; j++) {
              if (!existsInArray(databaseAmounts, databasePortfolios[i].id, databaseCurrencies[j].id)) {
                  axios.post('http://localhost:5000/amounts', {
                      amount: 0,
                      fk_crypto: databaseCurrencies[j].id,
                      fk_portfolio: databasePortfolios[i].id
                  }).then((response) => {
                    console.log(response)});
                }
            }
        }
    }
}

function RedirectUser()
{
    window.location.replace('/usersettings');
}
//Visuose paages turi buti!
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}

export default App;