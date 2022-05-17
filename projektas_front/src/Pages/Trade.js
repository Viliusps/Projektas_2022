import * as React from 'react';
import '../App.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@material-ui/core';
import axios from 'axios'
import {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css';
import euroLogo from '../euro-symbol.png';
import { ContactSupportOutlined } from '@material-ui/icons';

//Bugas 193 line

export default function AppTrade() {
    const [coins, setCoins] = useState([]);
    const [databaseCurrencies, setCurrencies] = useState([]);
    const [databaseAmounts, setAmounts] = useState([]);

    useEffect(() => {
      getDatabaseData();
    }, []);

    const getDatabaseData = () => {
      let endpoints = [
        'http://localhost:5000/amounts',
        'http://localhost:5000/cryptos',
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=80&page=1&sparkline=false'
      ];

    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: amounts}, {data: currencies}, {data: coins}]) => {
      setCoins(coins);
      setAmounts(amounts);
      setCurrencies(currencies);
    })
  };


    const handleChange = (event) => {
        let values = document.getElementsByClassName('payment-currency-input');
        if (document.getElementsByClassName('payment-currency-input')[0].checked) {
          for (let i = 0;  i < values.length; i++) {
            values[i].innerHTML = event.target.value;
          }
        }
        document.getElementsByClassName('form-check-input')[0].checked = false;
    };

    const handleCheckbox = (event) => {
      let checkbox = document.getElementsByClassName('form-check-input');
      if (checkbox[0].checked) {
        let paymentCurrencyId = document.getElementById('paymentCurrency').value;
        let values = document.getElementsByClassName('payment-currency-input');
        for (let i = 0;  i < values.length; i++) {
          values[i].innerHTML =  databaseCurrencies[paymentCurrencyId - 1].name;
        }
      }
      else {
        let values = document.getElementsByClassName('payment-currency-input');
        for (let i = 0;  i < values.length; i++) {
          values[i].innerHTML =  "EUR";
        }
      }
  };

    const handleCheckmarkChange = (event) => {
      let last_th = document.querySelector(`[id='row${event.target.id}']`).lastChild;
      if (last_th.className == "remove custom-table-error") {
        last_th.parentNode.removeChild(last_th);
      }
     
    };
    const callFunction = (event) =>{
      CalculateValue(coins, databaseCurrencies, databaseAmounts);
    }
    
    return (
    <div>
    <div>
    <div className="header" id="head">
        <a href="/home" className="logo">Skete</a>
        <div className="header-right">
            <a href="/home">Home</a>
            <a href="/deposit">Deposit</a>
            <a className="active" href="/trade">Trade</a>
            <a href="/staking">Staking</a>
            <a href="/tradehistory">Trade History</a>
            <a href="/portfolio">Portfolio</a>
            <a onClick={Redirect} href="#" >Logout</a>
        </div>
    </div>
    </div>
    <div className="App">
      <header className="App-header">
    <div>
    <Form>
      <Container>
        <Row md={5} id="select-buy-form">
        <div>
          <h5>Pay with</h5>
          <Form.Select
          onChange={handleChange}
          id="paymentCurrency"
          >
            {databaseCurrencies.map(currency => (
              <option value={currency.id}>{currency.name}</option>
            ))
          }
          </Form.Select>
          <h5>Write the trading budget in the selected currency <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" onClick={handleCheckbox}/></h5>
          <Button variant="primary" size="lg" onClick={callFunction}>Buy</Button>
      </div>
        </Row>
      </Container>
    <Container fluid="md">
        <Row>
      <Table bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Cryptocurrency</th>
            <th>Current Price</th>
            <th>Current Holdings</th>
            <th>Buying Budget</th>
            <th>Selection</th>
          </tr>
        </thead>
    <tbody>
                        {databaseCurrencies.map(function (currency, index) {
                          if (currency.name !== "EUR") {
                            let coin = coins.find(coin => coin.symbol.toUpperCase() === currency.name.toUpperCase());
                            console.log(coin);
                            return (<tr className="row1" id={'row' + currency.id}>
                              <th><img src={coin.image} alt="cryptocurrency logo" className="cryptocurrency-logo" /></th>
                              <th>{coin.name}</th>
                              <th>€{parseFloat(coin.current_price).toFixed(2)}</th>
                              <th>{parseFloat(findAmountByPortfolioAndCryptoSymbol(databaseAmounts, localStorage.getItem("UserPortfolio"), currency)).toFixed(2)}</th>
                              <th>
                                <InputGroup className="mb-3">
                                  <Form.Control aria-label="amount" id={currency.id} className="payment-amount" type="number" />
                                  <InputGroup.Text className="payment-currency-input">EUR</InputGroup.Text>
                                </InputGroup>
                              </th>
                              <th>
                                <Form.Check
                                  type="switch"
                                  id={currency.id}
                                  value={currency.id}
                                  className="check"
                                  onChange={handleCheckmarkChange} />
                              </th>
                            </tr>)
                          }
                          else {
                            return (<tr className="row1" id={'row' + currency.id}>
                              <th><img src={euroLogo} alt="cryptocurrency logo" className="cryptocurrency-logo" /></th>
                              <th>Euro</th>
                              <th>€1</th>
                              <th>{findAmountByPortfolioAndCryptoSymbol(databaseAmounts, localStorage.getItem("UserPortfolio"), currency).toFixed(2)}</th>
                              <th>
                                <InputGroup className="mb-3">
                                  <Form.Control aria-label="amount" id={currency.id} className="payment-amount" type="number" />
                                  <InputGroup.Text className="payment-currency-input">EUR</InputGroup.Text>
                                </InputGroup>
                              </th>
                              <th>
                                <Form.Check
                                  type="switch"
                                  id={currency.id}
                                  value={currency.id}
                                  className="check"
                                  onChange={handleCheckmarkChange}
                                />
                              </th>
                            </tr>)
                          }
                        }
                        )}
      <tr>
      </tr>
    </tbody>
      </Table>
      </Row>
      </Container>
      </Form>
      </div>
       </header>
    </div>
    </div>
  );
}

function CalculateValue(coins, databaseCurrencies, databaseAmounts){
  const elements = document.getElementsByClassName("remove custom-table-error");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
  let selections = document.querySelectorAll('.check input[type=checkbox]:checked');
  let amounts = document.getElementsByClassName('payment-amount');
  let isChecked = document.querySelector('input[id=flexCheckChecked]').checked;
  let paymentCurrencyId = document.getElementById('paymentCurrency').value;
  let portfolioId = localStorage.getItem("UserPortfolio");
  let paymentCurrencyAmount = parseFloat(findAmountByPortfolioAndCryptoId(databaseAmounts, portfolioId, paymentCurrencyId));
  for (let i = 0; i < selections.length; i++) {
    let setBudget = parseFloat(getItemFromArrayById(amounts, selections[i].id).value);
    let currentAmount = parseFloat(findAmountByPortfolioAndCryptoId(databaseAmounts, portfolioId, selections[i].id));
    let currentSymbol = databaseCurrencies.find(currency => currency.id === parseInt(selections[i].value));
    if (currentSymbol == "EUR") {
      if ((isChecked && paymentCurrencyAmount >= setBudget && setBudget !== -1) || (!isChecked && paymentCurrencyAmount * parseFloat(findCoinPriceBySymbol(coins, databaseCurrencies[paymentCurrencyId - 1].name)) >= setBudget && setBudget !== -1)) {
        let boughtAmount;
        if (isChecked) {
          boughtAmount = setBudget * parseFloat(findCoinPriceBySymbol(coins, databaseCurrencies[paymentCurrencyId - 1].name)) / 1;
          updateAmount(databaseAmounts, portfolioId, selections[i].value, boughtAmount);
          updateAmount(databaseAmounts, portfolioId, paymentCurrencyId, paymentCurrencyAmount - setBudget);
          pushTradeHistory(databaseCurrencies[selections[i].value - 1], databaseCurrencies[paymentCurrencyId - 1], boughtAmount, coins);
        }
        else {
          boughtAmount = setBudget;
          updateAmount(databaseAmounts, portfolioId, selections[i].value, currentAmount + boughtAmount);
          updateAmount(databaseAmounts, portfolioId, selections[i].value, currentAmount - (setBudget / findCoinPriceBySymbol(coins, databaseCurrencies[paymentCurrencyId - 1].name)));
          pushTradeHistory(databaseCurrencies[selections[i].value - 1], databaseCurrencies[paymentCurrencyId - 1], boughtAmount, coins);
        }
        selections[i].checked = false;
        document.querySelector(`input.payment-amount.form-control[id='${selections[i].id}']`).value = "";
      }
      else {
        console.log(selections[i].id);
        document.querySelector(`[id=row${selections[i].id}]`).insertAdjacentHTML("beforeend", `<h5 class="remove custom-table-error">Error! Not enough money.</h5>`);
      }
    }
    else if((isChecked && paymentCurrencyAmount >= setBudget && setBudget !== -1) || (!isChecked && paymentCurrencyAmount >= setBudget)) {
      let boughtAmount;
      if (isChecked) {
        boughtAmount = setBudget * parseFloat(findCoinPriceBySymbol(coins, databaseCurrencies[paymentCurrencyId - 1].name)) / parseFloat(findCoinPriceBySymbol(coins, currentSymbol));
        updateAmount(databaseAmounts, portfolioId, selections[i].id, currentAmount + boughtAmount);
        updateAmount(databaseAmounts, portfolioId, paymentCurrencyId, paymentCurrencyAmount - setBudget);
        pushTradeHistory(databaseCurrencies[selections[i].value - 1], databaseCurrencies[paymentCurrencyId - 1], boughtAmount, coins);
      }
      else {
        boughtAmount = setBudget / parseFloat(findCoinPriceBySymbol(coins, currentSymbol));
        updateAmount(databaseAmounts, portfolioId, selections[i].id, currentAmount + boughtAmount);
        updateAmount(databaseAmounts, portfolioId, paymentCurrencyId, paymentCurrencyAmount - parseFloat(setBudget / findCoinPriceBySymbol(coins, databaseCurrencies[paymentCurrencyId - 1].name)));
        pushTradeHistory(databaseCurrencies[selections[i].value - 1], databaseCurrencies[paymentCurrencyId - 1], boughtAmount, coins);
      }
      selections[i].checked = false;
      document.querySelector(`input.payment-amount.form-control[id='${selections[i].id}']`).value = "";
    }
    else {
      document.querySelector(`[id=row${selections[i].id}]`).insertAdjacentHTML("beforeend", `<h5 class="remove custom-table-error">Error! Not enough money.</h5>`);
    }
  }
}


function findAmountByPortfolioAndCryptoId(databaseAmounts, portfolioId, cryptoId) {
  return databaseAmounts.find(amount => amount.fk_portfolio === portfolioId && amount.fk_crypto === cryptoId);
}

function findAmountByPortfolioAndCryptoSymbol(databaseAmounts, portfolioId, currency) {
  console.log(currency);
  return databaseAmounts.find(amount => parseInt(amount.fk_portfolio) === parseInt(portfolioId) && parseInt(amount.fk_crypto) === parseInt(currency.id)).amount;
}

function updateAmount(databaseAmounts, portfolioId, cryptoId, amountToUpdate) {
  let amount = databaseAmounts.find(amount => parseInt(amount.fk_portfolio) === parseInt(portfolioId) && parseInt(amount.fk_crypto) === parseInt(cryptoId));
  axios.patch(`http://localhost:5000/amounts/${amount.id}`,
            { 
              amount: parseFloat(amountToUpdate).toFixed(2)
            }
        ).then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error + " klaida!");
        })
}


function pushTradeHistory(boughtCurrency, boughtWithCurrency, boughtAmount, coins) {
  let firstPrice = findCoinPriceBySymbol(coins, boughtCurrency.name);
  let secondPrice = findCoinPriceBySymbol(coins, boughtWithCurrency.name);
  var today = new Date();
  axios.post('http://localhost:5000/tradehistories', {
    fk_Bought_currency: boughtCurrency.id,
    fk_Bought_with_currency: boughtWithCurrency.id,
    Amount: boughtAmount,
    Date: today.getFullYear() + '-' + (today.getMonth() + 1) + ' ' + today.getDate(),
    Price_of_first: firstPrice,
    Price_of_second: secondPrice,
    fk_portfolio: localStorage.getItem("UserPortfolio")
  });
}





function findCoinPriceBySymbol(coins, symbol) {
  for (let i = 0; i < coins.length; i++) {
    if (coins[i].symbol.toUpperCase() === symbol.toUpperCase()) {
      return coins[i].current_price;
    }
  }
  return 1;
}

function getItemFromArrayById(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return array[i];
    }
  }
  return -1;
}
function Clear(){
  localStorage.setItem("BTC", 0);
  localStorage.setItem("ETH", 0);
  window.location.reload(false);
}
function SaveHistory(listofcurrencies, balances, prices){

}
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}