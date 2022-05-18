import '../App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button1 from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import React, {useState, useEffect} from 'react';
import logo from '../euro-symbol.png';
import { ReplayOutlined, SignalCellularConnectedNoInternet0BarSharp } from '@material-ui/icons';
import settings_logo from '../settingslogo.png';
import logout_logo from '../logout.png';
import more_logo from '../more.jpg';
import { Button } from '@material-ui/core';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [chosenportfolio, setChosen] = React.useState('');

  const handleChange = (event) => {
    setChosen(event.target.value);
    ChangePortfolio(event.target.value)
  };
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
        if(el.fk_portfolio == localStorage.getItem("ChosenPortfolio"))
        {
          localStorage.setItem(GetCryptoNameById(cryptos, el.fk_crypto), el.amount.toFixed(2));
          localStorage.setItem(GetCryptoNameById(cryptos, el.fk_crypto)+"stake", el.staking_amount.toFixed(2));
        }
      })

      const current = new Date();
      var month=`${current.getMonth()+1}`;
      var day=`${current.getDate()}`;
      if(`${current.getMonth()+1}`.length==1)
      {
        month=0+`${current.getMonth()+1}`;
      }

      if(`${current.getDate()}`.length==1)
      {
        day=0+`${current.getDate()}`;
      }

      const date=`${current.getFullYear()}-${month}-${day}`;
      amounts.forEach(el=>{
        if(el.when_staked!="0000-00-00" && el.fk_portfolio==localStorage.getItem("ChosenPortfolio"))
        {
          var today = new Date();
          var past=new Date(el.when_staked);
          var diff=today.getTime()-past.getTime();
          var days=diff/(1000*3600*24);

          var percentage=GetPercentageByCryptoID(cryptos,el.fk_crypto);
          var staking_amount=(((days/365)*percentage*el.staking_amount)/100+el.staking_amount).toFixed(2);
          localStorage.setItem(GetCryptoNameById(cryptos, el.fk_crypto)+"stake", staking_amount);
        }
      })
      
      setAmounts(amounts)
      setPortfolios(portfolios)
      setCryptos(cryptos)
      setCoins(coins)
    });
  }
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
              value={localStorage.getItem("ChosenPortfolio")}
              label="Portfolio"
              onChange={(handleChange)}
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
            <a href="/trade">Trade</a>
            <a className="active" href="/staking">Staking</a>
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
    </div>
      <header className="App-header">
        <label id="stakingError"></label>
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
              <TableCell align="center" className='tableHeader'>Rewards</TableCell>
              <TableCell align="center" className='tableHeader'>Amount</TableCell>
              <TableCell align="center" className='tableHeader'>Staked amount</TableCell>
              <TableCell align="center" className='tableHeader'>Transfer amount</TableCell>
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
                <TableCell align="center" className='tableElement'>{localStorage.getItem(coin.symbol.toUpperCase()+"stakePercentage")}%</TableCell>
                <TableCell align="center" className='tableElement'>{localStorage.getItem(coin.symbol.toUpperCase())}</TableCell>
                <TableCell id="stakedAmount" align="center" className='tableElement'>{localStorage.getItem(coin.symbol.toUpperCase()+"stake")}</TableCell>
                <TableCell align="center" className='tableElement'>
                  <InputGroup className="mb-3">
                    <Form.Control aria-label="amount" className="payment-amount" type="number" />
                  </InputGroup>
                </TableCell>
                <TableCell align="center" className='tableElement'><button id="stake" variant="outlined" onClick={()=>Stake(amounts, coin.symbol, cryptos)}>Stake</button></TableCell>
                <TableCell align="center" className='tableElement'><button id="stake" variant="outlined" onClick={()=>Unstake(amounts, coin.symbol, cryptos)}>Unstake</button></TableCell>
              </TableRow>
          ))}
          </TableBody> }
        </Table>
      </TableContainer>
    </header>
    </div>
  );
}

function Stake(amounts, symbol, cryptos)
{
  let transfers = document.getElementsByClassName('payment-amount');
  var index=0;
  index=GetIdBySymbol(symbol,cryptos);
  var transfer=transfers[index].value;

  var amount=GetAmountBySymbol(amounts,symbol,cryptos);
  if(transfer=="" || parseFloat(transfer)<=0)
  {
    document.getElementById('stakingError').innerHTML = 'Missing transfer amount';
    //error for empty
  }
  else if(amount<parseFloat(transfer))
  {
    document.getElementById('stakingError').innerHTML = 'Not enough amount';
    //error for not enough
  }
  else
  {
    document.getElementById('stakingError').innerHTML = '';
    amounts.forEach(el=>{
      if(GetCryptoNameById(cryptos,el.fk_crypto)==symbol.toUpperCase() && el.fk_portfolio==localStorage.getItem("ChosenPortfolio"))
      {
        var date=new Date();
        /*if(el.when_staked=="0000-00-00")
          date=new Date();*/

        var first = el.amount-parseFloat(transfer);

        var shownAmount=localStorage.getItem(symbol.toUpperCase()+"stake");
        var second;
        if(el.staking_amount==0)
          second=transfer;
        else
          second=parseFloat(shownAmount)+parseFloat(transfer);
          //var second = (el.staking_amount*(parseFloat(shownAmount)+parseFloat(transfer)))/parseFloat(shownAmount);

        axios.patch('http://localhost:5000/amounts/' + el.id,{
          amount: first,
          staking_amount: second,
          when_staked: date
        })
      }
    })
    window.location.reload(false);
  }
}

function Unstake(amounts, symbol, cryptos)
{
  let transfers = document.getElementsByClassName('payment-amount');
  var index=0;
  index=GetIdBySymbol(symbol,cryptos);
  var transfer=transfers[index].value;

  var amount=localStorage.getItem(symbol.toUpperCase()+"stake");
  if(transfer=="" || parseFloat(transfer)<=0)
  {
    document.getElementById('stakingError').innerHTML = 'Missing transfer amount';
    //error for empty
  }
  else if(parseFloat(amount)<parseFloat(transfer))
  {
    document.getElementById('stakingError').innerHTML = 'Not enough staked amount';
    //error for not enough
  }
  else
  {
    document.getElementById('stakingError').innerHTML ="";
    amounts.forEach(el=>{
      if(GetCryptoNameById(cryptos,el.fk_crypto)==symbol.toUpperCase() && el.fk_portfolio==localStorage.getItem("ChosenPortfolio"))
      {
        var first = el.amount+parseFloat(transfer);
        var second = el.staking_amount-parseFloat(transfer);
        //var second = (el.staking_amount*(parseFloat(amount)-parseFloat(transfer)))/parseFloat(amount);
        //var date=el.when_staked;
        var date = new Date();
        if(second<=0.001)
        {
          date="0000-00-00";
          second=0;
        }
        
        axios.patch('http://localhost:5000/amounts/' + el.id,{
          amount: first,
          staking_amount: second,
          when_staked: date
        })
      }
    })
    window.location.reload(false);
  }  
}

function GetPercentageByCryptoID(cryptos, id)
{
  var percentage=0;
  cryptos.forEach(el=>{
    if(el.id==id)
    {
      percentage=el.staking_percentage;
    }
  })

  return percentage;
}

function GetAmountBySymbol(amounts, symbol, cryptos)
{
  var amount=0;
  amounts.forEach(el=>{
    if(GetCryptoNameById(cryptos,el.fk_crypto)==symbol.toUpperCase() && el.fk_portfolio==localStorage.getItem("ChosenPortfolio"))
    {
      amount=el.amount;
    }
  })

  return amount;
}

function GetIdBySymbol(symbol,cryptos)
{
  var index=0;
  var finalID=0;
  cryptos.forEach(el=>{
    if(el.name==symbol.toUpperCase())
    {
      finalID=index;
    }
      
    if(el.staking_percentage>0)
      index++;
  })
  return finalID;
}

function GetCryptoNameById(cryptos, id)
{
    var finalcrypto;
    cryptos.forEach((el)=>{
        if(el.id == id) finalcrypto = el.name;
    })

    return finalcrypto;

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
export default App;