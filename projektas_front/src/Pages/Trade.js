import * as React from 'react';
import '../App.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@material-ui/core';
//import { Button } from '@material-ui/core';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Col'
import Col from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack'
import { ContactSupportOutlined } from '@material-ui/icons';



export default function AppTrade() {
    const [market1, setMarket] = React.useState('');
    const [market2, setMarket2] = React.useState('');
    const [coins, setCoins] = useState([]);

    useEffect(() => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(input => {
        setCoins(input.data)
      }).catch(ex => console.log('Price error!'));
    });

    updateCryptoCurrencyDatabase(coins);

    const handleChange = (event) => {
      console.log("Pakeiciamas i " + event.target.value);
        setMarket(event.target.value);
        localStorage.setItem("Market1", event.target.value);
        document.getElementById('marketdisplay1').innerHTML = ("Current " + String(listofcurrencies[event.target.value]) +  " balance: " +  String(balances[event.target.value]));
    };
    const handleChange2 = (event) => {
      setMarket2(event.target.value);
      localStorage.setItem("Market2", event.target.value);
      document.getElementById('marketdisplay2').innerHTML = ("Current " + String(listofcurrencies[event.target.value]) +  " balance: " + String(balances[event.target.value]));
    };
    const callFunction = (event) =>{
      CalculateValue(listofcurrencies, balances, prices);
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
            <a onClick={Redirect}>Logout</a>
        </div>
    </div>
    </div>
    <div className="App">
      <header className="App-header">
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
      <Button variant="outlined" id="clear" onClick={Clear}>Clear crypto</Button> */}
    <Container fluid="md">
      <Row md={4}>
        <Col><DropdownButton title="Pay with">
        <Dropdown.Item eventKey="1">EUR</Dropdown.Item>
        <Dropdown.Item eventKey="2">BTC</Dropdown.Item>
          </DropdownButton></Col>
        <Col><Button variant="success">BUY</Button></Col>
      </Row>
      <Row>
      <Table bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Cryptocurrency</th>
            <th>Current Price</th>
            <th>Current Holdings</th>
            <th>Amount To Buy</th>
            <th>Selection</th>
          </tr>
        </thead>
    <tbody>
      {coins.map((coin, index) => (
        <tr>
          <th><img src={coin.image} alt="cryptocurrency logo" className="cryptocurrency-logo"/></th>
          <th>{coin.name}</th>
          <th>€{parseFloat(coin.current_price).toFixed(2)}</th>
          <th>{parseFloat(localStorage.getItem(coin.symbol.toUpperCase())).toFixed(2)}</th>
          <th> 
            <Form>
             <InputGroup className="mb-3">
            <InputGroup.Text>€</InputGroup.Text>
            <Form.Control aria-label="euros"/>
            </InputGroup>
            </Form>
  </th>
        <th>  
        <Form>
        <Form.Check 
          type="switch"
          id= {index + 1}/>
          </Form>
          </th>
        </tr>
        ))}
      <tr>
      </tr>
    </tbody>
      </Table>
      </Row>
      </Container>


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
function Clear(){
  localStorage.setItem("BTC", 0);
  localStorage.setItem("ETH", 0);
  window.location.reload(false);
}
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}