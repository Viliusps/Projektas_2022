import '../App.css';
import axios from 'axios'
import React, {useState, useEffect} from 'react';

function App() {
    return (
        <div>
            <div className="header" id="head">
                <a href="/home" className="logo">Skete</a>
                <div className="header-right">
                    <a className="active" href="/home">Home</a>
                    <a href="/deposit">Deposit</a>
                    <a href="/trade">Trade</a>
                    <a href="/portfolio">Portfolio</a>
                    <a onClick={Redirect}>Logout</a>
                </div>
            </div>
            <div className="App-header">
                <div className="toprightcorner">
                    <label id="assets"></label>
                </div>
            </div> 
        </div>
    )
}

window.onload = function()
{
    const ALLcoins = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1&sparkline=false%27').then(input => input.data);
    
    const balances = [];
    balances.push(localStorage.getItem("BTC"));
    balances.push(localStorage.getItem("EUR"));
    balances.push(localStorage.getItem("ETH"));

    ALLcoins.then(function(coins) {
        var wallet=0;
        coins.forEach(coin => {
            wallet+=parseInt(coin.current_price) * parseInt(localStorage.getItem(coin.symbol.toUpperCase()))
        });
        wallet+=parseInt(localStorage.getItem("EUR"));
        localStorage.setItem("AssetValue", wallet)
        document.getElementById('assets').innerHTML = "Your portfolio value: " + wallet + "€";
      });


    //Reiksmiu tvarka: btc, eur, eth
    const prices = [37940, 1, 2645];
    //----------------------------
    localStorage.setItem("BTCprice",prices[0]);
    localStorage.setItem("EURprice",prices[1]);
    localStorage.setItem("ETHprice",prices[2]);
    //----------------------------
    var sum=0;
    for(let i=0; i<balances.length; i++)
    {
      sum+=balances[i]*prices[i];
    }
    /*localStorage.setItem("AssetValue", wallet);
    document.getElementById('assets').innerHTML = "Your portfolio value: " + sum + "€";*/
}

function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}

export default App;