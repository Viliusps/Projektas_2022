import '../App.css';
import axios from 'axios'
import React, {useState, useEffect} from 'react';
import { TramRounded } from '@material-ui/icons';
import AppTrade from './Trade.js';

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
                    <br></br>
                    <label id="cryptoSum"></label>
                    <br></br>
                    <label id="change"></label>
                </div>
            </div> 
        </div>
    )
}

window.onload = function()
{
    //Trade langui reikalinga
    localStorage.setItem("Market1", -1);
    localStorage.setItem("Market2", -1);
    AppTrade.handleChange("-1");
    AppTrade.handleChange2("-1");
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

function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}

export default App;