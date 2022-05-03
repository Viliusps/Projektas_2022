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

    useEffect(() => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false')
      .then(input => {
        setCoins(input.data)
      }).catch(ex => console.log('Price error!'));
    });

    updateCryptoCurrencyDatabase(coins);

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
        let paymentCurrencySymbol = document.getElementById('paymentCurrency').value;
        let values = document.getElementsByClassName('payment-currency-input');
        for (let i = 0;  i < values.length; i++) {
          values[i].innerHTML =  paymentCurrencySymbol;
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
      CalculateValue(coins);
      SaveHistory(listofcurrencies, balances, prices);
    }

    //Order of values - EUR is the first and then the rest 
    const balances = updateBalances(coins);
    const prices = updatePrices(coins);
    const listofcurrencies = updateListOfCurrencies(coins);
    
    return (
    <div>
    <div>
    <div className="header" id="head">
        <a href="/home" className="logo">Skete</a>
        <div className="header-right">
            <a href="/home">Home</a>
            <a href="/deposit">Deposit</a>
            <a className="active" href="/trade">Trade</a>
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
            <option value="EUR">EUR</option>
            {coins.map(coin => (
              <option value={coin.symbol.toUpperCase()}>{coin.symbol.toUpperCase()}</option>
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
    <tr className="row1" id={'row' + (1)}>
          <th><img src={euroLogo} alt="cryptocurrency logo" className="cryptocurrency-logo"/></th>
          <th>Euro</th>
          <th>€1</th>
          <th>{parseFloat(localStorage.getItem("EUR")).toFixed(2)}</th>
          <th> 
             <InputGroup className="mb-3">
            <Form.Control aria-label="amount" id={1} className="payment-amount" type="number"/>
            <InputGroup.Text className="payment-currency-input">EUR</InputGroup.Text>
            </InputGroup>
          </th>
        <th>  
        <Form.Check 
          type="switch"
          id= {1}
          value="EUR"
          className="check"
          onChange={handleCheckmarkChange}
          />
          </th>
        </tr>
      {coins.map((coin, index) => (
        <tr className="row1" id={'row' + (index + 2)}>
          <th><img src={coin.image} alt="cryptocurrency logo" className="cryptocurrency-logo"/></th>
          <th>{coin.name}</th>
          <th>€{parseFloat(coin.current_price).toFixed(2)}</th>
          <th>{parseFloat(localStorage.getItem(coin.symbol.toUpperCase())).toFixed(2)}</th>
          <th> 
             <InputGroup className="mb-3">
            <Form.Control aria-label="amount" id={index + 2} className="payment-amount" type="number"/>
            <InputGroup.Text className="payment-currency-input">EUR</InputGroup.Text>
            </InputGroup>
          </th>
        <th>  
        <Form.Check 
          type="switch"
          id= {index + 2}
          value={coin.symbol.toUpperCase()}
          className="check"
          onChange={handleCheckmarkChange}/>
          </th>
        </tr>
        ))}
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

{/* <div className='Balance'>
        <label id="marketdisplay1"></label>
        <br></br>
        <label id="marketdisplay2"></label>
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
        <MenuItem value={0}>{"EUR"}</MenuItem>
          {
            coins.map(currency => {
              return <MenuItem value={coins.lastIndexOf(currency) + 1}>{currency.symbol.toUpperCase()}</MenuItem>
            })
          }
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
          <MenuItem value={0}>{"EUR"}</MenuItem>
          {
            coins.map(currency => {
              return <MenuItem value={coins.lastIndexOf(currency) + 1}>{currency.symbol.toUpperCase()}</MenuItem>
            })
          }
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
        <label id="error"></label>
      <Button variant="outlined" id="trade" onClick={callFunction}>Trade</Button>
      <Button variant="outlined" id="clear" onClick={Clear}>Clear crypto</Button>
      <Button variant="outlined" id="history" style={{position: 'absolute', bottom: 70, right: 10}} href="/tradehistory">History</Button>
      </header>
    </div>
    </div>
  );
}

function CalculateValue(listofcurrencies, balances, prices){
  if(parseInt(localStorage.getItem("Market1")) >= 0 && parseInt(localStorage.getItem("Market2")) >= 0)
  {
    const market1 = parseInt(localStorage.getItem("Market1"));
    const market2 = parseInt(localStorage.getItem("Market2"));
    var howmuch = parseFloat(document.getElementById("outlined-number").value);
    if(parseFloat(prices[market1]) * howmuch <= parseFloat(balances[market2]) * parseFloat(prices[market2])){
      balances[market1] = parseFloat(balances[market1]) + howmuch;
      balances[market2] = parseFloat(balances[market2]) - (parseFloat(prices[market1])/parseFloat(prices[market2]) * howmuch);
      localStorage.setItem(listofcurrencies[market1], balances[market1]);
      localStorage.setItem(listofcurrencies[market2], balances[market2]);
      document.getElementById('error').innerHTML = '';
      console.log(parseFloat(balances[market2]));
      document.getElementById('marketdisplay1').innerHTML = ("Current " + String(listofcurrencies[market1]) +  " balance: " + String(parseFloat(balances[market1]).toFixed(2)));
      document.getElementById('marketdisplay2').innerHTML = ("Current " + String(listofcurrencies[market2]) +  " balance: " + String(parseFloat(balances[market2]).toFixed(2)));
    }
    else{
      document.getElementById('error').innerHTML = 'Insufficient balance';
    }
  }

    else{
      document.getElementById('error').innerHTML = 'You have not selected a currency';
    }

} */}


function CalculateValue(coins){
  const elements = document.getElementsByClassName("remove custom-table-error");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
  let selections = document.querySelectorAll('.check input[type=checkbox]:checked');
  let amounts = document.getElementsByClassName('payment-amount');
  let isChecked = document.querySelector('input[id=flexCheckChecked]').checked;
  let paymentCurrencySymbol = document.getElementById('paymentCurrency').value;
  for (let i = 0; i < selections.length; i++) {
    let setBudget = parseFloat(getItemFromArrayById(amounts, selections[i].id).value);
    let currentAmount = parseFloat(localStorage.getItem(selections[i].value.toUpperCase()));
    if (selections[i].value.toUpperCase() == "EUR") {
      if (isChecked && localStorage.getItem(paymentCurrencySymbol) >= setBudget && setBudget !== -1 || !isChecked && localStorage.getItem(paymentCurrencySymbol) * parseFloat(findCoinPriceBySymbol(coins, paymentCurrencySymbol)) >= setBudget && setBudget !== -1) {
        let boughtAmount;
        if (isChecked) {
          boughtAmount = setBudget * parseFloat(findCoinPriceBySymbol(coins, paymentCurrencySymbol)) / 1;
          localStorage.setItem("EUR", currentAmount + boughtAmount);
          localStorage.setItem(paymentCurrencySymbol, parseFloat(localStorage.getItem(paymentCurrencySymbol)) - setBudget);
        }
        else {
          boughtAmount = setBudget;
          localStorage.setItem("EUR", currentAmount + boughtAmount);
          localStorage.setItem("EUR", parseFloat(localStorage.getItem("EUR")) - (setBudget / findCoinPriceBySymbol(coins, paymentCurrencySymbol)));
        }
        selections[i].checked = false;
        document.querySelector(`input.payment-amount.form-control[id='${selections[i].id}']`).value = "";
      }
      else {
        console.log(selections[i].id);
        document.querySelector(`[id=row${selections[i].id}]`).insertAdjacentHTML("beforeend", `<h5 class="remove custom-table-error">Error! Not enough money.</h5>`);
      }
    }
    else if(isChecked && localStorage.getItem(paymentCurrencySymbol) >= setBudget && setBudget !== -1 || !isChecked && localStorage.getItem(paymentCurrencySymbol) >= setBudget) {
      let boughtAmount;
      if (isChecked) {
        boughtAmount = setBudget * parseFloat(findCoinPriceBySymbol(coins, paymentCurrencySymbol)) / parseFloat(findCoinPriceBySymbol(coins, selections[i].value.toUpperCase()));
        localStorage.setItem(selections[i].value.toUpperCase(), currentAmount + boughtAmount);
        localStorage.setItem(paymentCurrencySymbol, parseFloat(localStorage.getItem(paymentCurrencySymbol)) - setBudget);
      }
      else {
        boughtAmount = setBudget / parseFloat(findCoinPriceBySymbol(coins, selections[i].value.toUpperCase()));
        localStorage.setItem(selections[i].value.toUpperCase(), currentAmount + boughtAmount);
        localStorage.setItem(paymentCurrencySymbol, parseFloat(localStorage.getItem(paymentCurrencySymbol)) - parseFloat((setBudget / findCoinPriceBySymbol(coins, paymentCurrencySymbol))));
      }
      selections[i].checked = false;
      document.querySelector(`input.payment-amount.form-control[id='${selections[i].id}']`).value = "";
    }
    else {
      document.querySelector(`[id=row${selections[i].id}]`).insertAdjacentHTML("beforeend", `<h5 class="remove custom-table-error">Error! Not enough money.</h5>`);
    }
  }
}

  //adds cryptocurrencies to the local storage
  function updateCryptoCurrencyDatabase(coins) {
    for (let i = 0; i < coins.length; i++) {
      let currentItem = localStorage.getItem(coins[i].symbol.toUpperCase());
      if (currentItem === null) { //if the item does not exist
        localStorage.setItem(coins[i].symbol.toUpperCase(), 0)
      }
    }
  }

function updateBalances(coins) {
  const balances = [];
  balances.push(localStorage.getItem("EUR"));
  for (let i = 0; i < coins.length; i++) {
    balances.push(localStorage.getItem(coins[i].symbol.toUpperCase()));
  }
  return balances;
}

function updatePrices(coins) {
  const prices = [];
  prices.push(1);
  for (let i = 0; i < coins.length; i++) {
    prices.push(coins[i].current_price);
  }
  return prices;
}

function updateListOfCurrencies(coins) {
  const list = []
  list.push("EUR");
  for (let i = 0; i < coins.length; i++) {
    list.push(coins[i].symbol.toUpperCase());
  }
  return list;
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