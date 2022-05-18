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
import { Button } from '@material-ui/core';
import Button1 from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import settings_logo from '../settingslogo.png';
import logout_logo from '../logout.png';
import more_logo from '../more.jpg';
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

  const [tradehistories, setTradeHistory] = useState([]);
  const [cryptos, setCryptos] = useState([]);
  const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        getTradeHistory();
        getCryptos();
        getPortfolios();
    }, []);

    const getTradeHistory = async () => {
        const response = await axios.get('http://localhost:5000/tradehistories');
        setTradeHistory(response.data);
    }
    const getCryptos = async () => {
      const response = await axios.get('http://localhost:5000/cryptos');
      setCryptos(response.data);
  }
  const getPortfolios = async () => {
    const response = await axios.get('http://localhost:5000/portfolios');
    setPortfolios(response.data);
}
  var tradeHistorySum = 0;
  var tradeHistoryLabel="Trade history";
  tradehistories.forEach(el=>{
    if(el.fk_Portfolio==localStorage.getItem("ChosenPortfolio"))
    {
      tradeHistorySum=1;
    }
  })
  var tradeHistoryString=""
  if (tradeHistorySum === 0) {
    tradeHistoryLabel="";
    tradeHistoryString = "You have no trades yet";
  }
    return (
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
                <a href="/staking">Staking</a>
                <a className="active" href="/tradehistory">Trade History</a>
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
        <div>
        <header className="App-header">
        <h1>{tradeHistoryLabel}</h1>
        <h3>{tradeHistoryString}</h3>
        <TableContainer id="table" component={Paper} className="Table">
      <Table sx={{ minWidth: 700}} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center" className='tableHeader'>Nr.</TableCell>
            <TableCell align="center" className='tableHeader'>Currency bought</TableCell>
            <TableCell align="center" className='tableHeader'>Price at the time of trade</TableCell>
            <TableCell align="center" className='tableHeader'>Currency sold</TableCell>
            <TableCell align="center" className='tableHeader'>Price at the time of trade</TableCell>
            <TableCell align="center" className='tableHeader'>Amount bought</TableCell>
            <TableCell align="center" className='tableHeader'>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { tradehistories.filter(tradehistory => (tradehistory.fk_Portfolio === parseInt(localStorage.getItem("ChosenPortfolio")))).sort((tradeA, tradeB) =>{
          let dateA = new Date(tradeA.Date);
          let dateB = new Date(tradeB.Date);
          if (dateA.getDay() === dateB.getDay()) {
            if (dateA.getMonth() === dateB.getMonth()) {
                return dateB.getYear() - dateA.getYear();
            }
            else {
              return dateB.getMonth() - dateA.getMonth();
            }
          }
          else {
            return dateB.getDay() - dateA.getDay();
          }
        }).map((tradehistory, index) => (
              <TableRow key={ tradehistory.Id } hover>
                  <TableCell align="center" className='tableElement'>{ index + 1 }</TableCell>
                  <TableCell align="center" className='tableElement'> {GetCryptoById(tradehistory.fk_Bought_currency, cryptos)}</TableCell>
                  <TableCell align="center" className='tableElement'>€{ tradehistory.Price_of_first.toFixed(2) }</TableCell>
                  <TableCell align="center" className='tableElement'>{GetCryptoById(tradehistory.fk_Bought_with_currency, cryptos)}</TableCell>
                  <TableCell align="center" className='tableElement'>€{ tradehistory.Price_of_second.toFixed(2) }</TableCell>
                  <TableCell align="center" className='tableElement'>{ tradehistory.Amount.toFixed(2) }</TableCell>
                  <TableCell align="center" className='tableElement'>{ tradehistory.Date }</TableCell>
              </TableRow>
          )) }
        </TableBody>
      </Table>
          </TableContainer>
          {displayTable(tradeHistorySum)}
      </header>
    </div>
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

function GetCryptoById(fk, cryptos)
{
  var finalcrypto = '';
  cryptos.forEach((el)=>{
    if(el.id == fk) finalcrypto = el.name;
  })
  
  return finalcrypto;
}

function ChangePortfolio(chosenportfolio)
{
    localStorage.setItem("ChosenPortfolio", chosenportfolio);
    window.location.reload(false);
}

function RedirectUser()
{
    window.location.replace('/usersettings');
}

function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}
export default App;