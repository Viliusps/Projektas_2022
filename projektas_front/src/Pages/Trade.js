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
import Button1 from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import settings_logo from '../settingslogo.png';
import logout_logo from '../logout.png';
import more_logo from '../more.jpg';
import Pagination from "./Components/Pagination.js";
import Coins from "./Components/Coins.js";
import Box from '@mui/material/Box';


export default function AppTrade() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [checked, setChecked] = useState(true);
  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState([]);
  const [databaseCurrencies, setCurrencies] = useState([]);
  const [databaseAmounts, setAmounts] = useState([]);
  const [selectionsChecked, setSelectionsChecked] = useState(new Array(51).fill(false));
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);
  const [chosenportfolio, setChosen] = React.useState('');
  const [portfolios, setPortfolios] = useState([]);

  const handleChangee = (event) => {

    setChosen(event.target.value);
    ChangePortfolio(event.target.value);
    
  };


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    useEffect(() => {
      getDatabaseData();
    }, [refreshKey, selectionsChecked]);

    const handleBuyButton = () => {
      CalculateValue(coins, databaseCurrencies, databaseAmounts, selectionsChecked, setSelectionsChecked, setRefreshKey);
      setRefreshKey(oldKey => oldKey + 1);
  };

    const getDatabaseData = () => {
      let endpoints = [
        'http://localhost:5000/amounts',
        'http://localhost:5000/cryptos',
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=80&page=1&sparkline=false',
        'http://localhost:5000/portfolios'
      ];

    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: amounts}, {data: currencies}, {data: coins}, {data: portfolios}]) => {
      setCoins(coins);
      setAmounts(amounts);
      setCurrencies(currencies);
      setPortfolios(portfolios);
    })
  };


    const handleChange = (event) => {
        let values = document.getElementsByClassName('payment-currency-input');
        if (document.getElementsByClassName('payment-currency-input')[0].checked) {
          for (let i = 0;  i < values.length; i++) {
            values[i].innerHTML = event.target.value;
          }
        }
        else if (document.getElementsByClassName('form-check-input')[0].checked) {
          for (let i = 0;  i < values.length; i++) {
            values[i].innerHTML = databaseCurrencies[parseInt(event.target.value) - 1].name;
          }
        }
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
      const updatedSelectionsState = selectionsChecked.map((element, index) => 
      index === (parseInt(event.target.value) - 1)  ? !element : element );
      setSelectionsChecked(updatedSelectionsState);
      console.log(updatedSelectionsState);
    };

    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = databaseCurrencies.slice(indexOfFirstCoin, indexOfLastCoin);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    
  return (
    <div>
    <div>
    <div className="header" id="head">
        <a href="/home" className="logo">Skete</a>
        <p className="ChoosePortfolio"><Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Chosen portfolio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ localStorage.getItem("ChosenPortfolio")}
              label="Portfolio"
              onChange={(handleChangee)}
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
            <a className="active" href="/trade">Trade</a>
            <a href="/staking">Staking</a>
            <a href="/tradehistory">Trade History</a>
            <a href="/portfolio">Portfolio</a>
            <Button1
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            className = "Settings-button-container"
                        >
                             <img className = "Settings-button" src={more_logo}></img>
                        </Button1>
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
      <div className="App">
        <header className="App-header">
          <div>
            <Form>
              <Container className="margin-top-buying-options">
                <Row md={5} id="select-buy-form">
                  <div>
                    <h5>Pay with</h5>
                    <Form.Select
                      onChange={handleChange}
                      id="paymentCurrency"
                    >
                      <option value={6}>EUR</option>
                      {
                        databaseCurrencies.filter(currency => currency.id !== 6).map(currency => (
                          <option value={currency.id}>{currency.name}</option>)
                        )
                      }
                    </Form.Select>
                  </div>
                  <h5>Write the trading budget in the selected currency <input defaultChecked={checked} class="form-check-input" type="checkbox" value="" id="flexCheckChecked" onClick={(e) => { handleCheckbox(e); setChecked(!checked) }} /></h5>
                  <Button variant="primary" size="lg" onClick={handleBuyButton}>Buy</Button>

                  <div className="Search-Button">
                    <input className="form-control w-90" type="text" placeholder="Search" variant="link" id="select-buy-form" onChange={event => { setSearch(event.target.value) }} />
                  </div>
                </Row>
              </Container>
              <Container fluid="md">
                <Row>
                  <Coins currentCoins={currentCoins} coins={coins} selectionsChecked={selectionsChecked} handleCheckmarkChange={handleCheckmarkChange} search={search} databaseAmounts={databaseAmounts} databaseCurrencies={databaseCurrencies} />
                </Row>
              </Container>
            </Form>
            <Pagination coinsPerPage={coinsPerPage} totalCoins={databaseCurrencies.length} paginate={paginate}></Pagination>
          </div>
        </header>
      </div>
    </div>
  );
}

function CalculateValue(coins, databaseCurrencies, databaseAmounts, selectionsChecked, setSelectionsChecked, setRefreshKey){
  const elements = document.getElementsByClassName("remove custom-table-error");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
  let selections = document.querySelectorAll('.check input[type=checkbox]:checked');
  let amounts = document.getElementsByClassName('payment-amount');
  let isChecked = document.querySelector('input[id=flexCheckChecked]').checked;
  let paymentCurrencyId = document.getElementById('paymentCurrency').value;
  let portfolioId = localStorage.getItem("ChosenPortfolio");
  let paymentCurrencyAmount = parseFloat(findAmountByPortfolioAndCryptoId(databaseAmounts, portfolioId, paymentCurrencyId).amount);
  for (let i = 0; i < selections.length; i++) {
    let setBudget = parseFloat(getItemFromArrayById(amounts, selections[i].id).value);
    let currentAmount = parseFloat(findAmountByPortfolioAndCryptoId(databaseAmounts, portfolioId, selections[i].id).amount);
    let currentCurrency = databaseCurrencies.find(currency => currency.id === parseInt(selections[i].value));
    if (currentCurrency.name == "EUR") {
      if ((isChecked && paymentCurrencyAmount >= setBudget && setBudget !== -1) || (!isChecked && paymentCurrencyAmount * parseFloat(findCoinPriceBySymbol(coins, databaseCurrencies[paymentCurrencyId - 1].name)) >= setBudget && setBudget !== -1)) {
        let boughtAmount;
        if (currentCurrency.id == paymentCurrencyId) {
          selectionsChecked = selectionsChecked.map((selection, index) => index === parseInt(selections[i].value) - 1 ? !selection : selection);
          setSelectionsChecked(selectionsChecked);
          document.querySelector(`input.payment-amount.form-control[id='${selections[i].id}']`).value = "";
          continue;
        }
        if (isChecked) {
          boughtAmount = setBudget * parseFloat(findCoinPriceBySymbol(coins, databaseCurrencies[paymentCurrencyId - 1].name)) / 1;
          updateAmount(databaseAmounts, portfolioId, selections[i].value, currentAmount + boughtAmount);
          updateAmount(databaseAmounts, portfolioId, paymentCurrencyId, paymentCurrencyAmount - setBudget);
          pushTradeHistory(databaseCurrencies[selections[i].value - 1], databaseCurrencies[paymentCurrencyId - 1], boughtAmount, coins);
        }
        else {
          boughtAmount = setBudget;
          updateAmount(databaseAmounts, portfolioId, selections[i].value, currentAmount + boughtAmount);
          updateAmount(databaseAmounts, portfolioId, selections[i].value, currentAmount - (setBudget / findCoinPriceBySymbol(coins, databaseCurrencies[paymentCurrencyId - 1].name)));
          pushTradeHistory(databaseCurrencies[selections[i].value - 1], databaseCurrencies[paymentCurrencyId - 1], boughtAmount, coins);
        }
        selectionsChecked = selectionsChecked.map((selection, index) => index === parseInt(selections[i].value) - 1 ? !selection : selection);
        setSelectionsChecked(selectionsChecked);
        document.querySelector(`input.payment-amount.form-control[id='${selections[i].id}']`).value = "";
      }
      else {
        document.querySelector(`[id=row${selections[i].id}]`).insertAdjacentHTML("beforeend", `<h5 class="remove custom-table-error">Error! Not enough money.</h5>`);
      }
    }
    else if((isChecked && paymentCurrencyAmount >= setBudget && setBudget !== -1) || (!isChecked && paymentCurrencyAmount >= setBudget)) {
      let boughtAmount;
      if (currentCurrency.id == paymentCurrencyId) {
        selectionsChecked = selectionsChecked.map((selection, index) => index === parseInt(selections[i].value) - 1 ? !selection : selection);
        setSelectionsChecked(selectionsChecked);
        document.querySelector(`input.payment-amount.form-control[id='${selections[i].id}']`).value = "";
        continue;
      }
      if (isChecked) {
        boughtAmount = setBudget * parseFloat(findCoinPriceBySymbol(coins, databaseCurrencies[paymentCurrencyId - 1].name)) / parseFloat(findCoinPriceBySymbol(coins, currentCurrency.name));
        updateAmount(databaseAmounts, portfolioId, selections[i].id, parseFloat(currentAmount + boughtAmount));
        updateAmount(databaseAmounts, portfolioId, paymentCurrencyId, parseFloat(paymentCurrencyAmount - setBudget));
        pushTradeHistory(databaseCurrencies[selections[i].value - 1], databaseCurrencies[paymentCurrencyId - 1], boughtAmount, coins);
      }
      else {
        boughtAmount = setBudget / parseFloat(findCoinPriceBySymbol(coins, currentCurrency.name));
        updateAmount(databaseAmounts, portfolioId, selections[i].id, currentAmount + boughtAmount);
        updateAmount(databaseAmounts, portfolioId, paymentCurrencyId, paymentCurrencyAmount - parseFloat(setBudget / findCoinPriceBySymbol(coins, databaseCurrencies[paymentCurrencyId - 1].name)));
        pushTradeHistory(databaseCurrencies[selections[i].value - 1], databaseCurrencies[paymentCurrencyId - 1], boughtAmount, coins);
      }
      selectionsChecked = selectionsChecked.map((selection, index) => index === parseInt(selections[i].value) - 1 ? !selection : selection);
      setSelectionsChecked(selectionsChecked);
      document.querySelector(`input.payment-amount.form-control[id='${selections[i].id}']`).value = "";
    }
    else {
      document.querySelector(`[id=row${selections[i].id}]`).insertAdjacentHTML("beforeend", `<h5 class="remove custom-table-error">Error! Not enough money.</h5>`);
    }
  }
}


function findAmountByPortfolioAndCryptoId(databaseAmounts, portfolioId, cryptoId) {
  return databaseAmounts.find(amount => parseInt(amount.fk_portfolio) === parseInt(portfolioId) && parseInt(amount.fk_crypto) === parseInt(cryptoId));
}

function findAmountByPortfolioAndCryptoSymbol( databaseAmounts, portfolioId, currency) {
  let amount = databaseAmounts.find(amount => parseInt(amount.fk_portfolio) === parseInt(portfolioId) && parseInt(amount.fk_crypto) === parseInt(currency.id));
  return amount !== undefined ? amount.amount : 0;
}


function updateAmount(databaseAmounts, portfolioId, cryptoId, amountToUpdate) {
  let amount = databaseAmounts.find(amount => parseInt(amount.fk_portfolio) === parseInt(portfolioId) && parseInt(amount.fk_crypto) === parseInt(cryptoId));
  axios.patch(`http://localhost:5000/amounts/${amount.id}`,
            { 
              amount: parseFloat(amountToUpdate).toFixed(2)
            }
        ).then().catch((error) => {
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
    fk_Portfolio: parseInt(localStorage.getItem("ChosenPortfolio"))
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
function RedirectUser()
{
    window.location.replace('/usersettings');
}
function ChangePortfolio(chosenportfolio)
{
    localStorage.setItem("ChosenPortfolio", chosenportfolio);
    window.location.reload(false);
}
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}
