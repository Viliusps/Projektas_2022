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

function App() {

  const [tradehistories, setTradeHistory] = useState([]);
  const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        getTradeHistory();
        getCryptos();
    }, []);

    const getTradeHistory = async () => {
        const response = await axios.get('http://localhost:5000/tradehistories');
        setTradeHistory(response.data);
    }
    const getCryptos = async () => {
      const response = await axios.get('http://localhost:5000/cryptos');
      setCryptos(response.data);
  }

    return (
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
        <div>
        <header className="App-header">
        <h1>Trade history</h1>
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
                  { tradehistories.map((tradehistory, index) => (
                        <TableRow key={ tradehistory.Id }>
                            <TableCell align="center" className='tableElement'>{ index + 1 }</TableCell>
                            <TableCell align="center" className='tableElement'> {GetCryptoById(tradehistory.fk_Bought_currency, cryptos)}</TableCell>
                            <TableCell align="center" className='tableElement'>€{ tradehistory.Price_of_first }</TableCell>
                            <TableCell align="center" className='tableElement'>{GetCryptoById(tradehistory.fk_Bought_with_currency, cryptos)}</TableCell>
                            <TableCell align="center" className='tableElement'>€{ tradehistory.Price_of_second }</TableCell>
                            <TableCell align="center" className='tableElement'>{ tradehistory.Amount }</TableCell>
                            <TableCell align="center" className='tableElement'>{ tradehistory.Date }</TableCell>
                        </TableRow>
                    )) }
        </TableBody>
      </Table>
          </TableContainer>
        <Button variant="outlined" id="save" href="/trade">Back</Button>
      </header>
    </div>
        </div>
        
    );
}
function GetCryptoById(fk, cryptos)
{
  console.log(fk);
  var finalcrypto = '';
  cryptos.forEach((el)=>{
    console.log(el.id);
    if(el.id == fk) finalcrypto = el.name;
})
  //cryptos.map((crypto) => {if(crypto.Id == fk) {finalcrypto = crypto;}})
  
return finalcrypto;


  /*console.log("suveikia metodas");
    console.log(fk);
    const response = axios.get('http://localhost:5000/cryptos/' + fk).then(input => input.data);
    response.then(function(cryptos){
      //document.getElementById('Isskirtinis').innerHTML=cryptos.name;
      /*console.log("Kas issaugota" + localStorage.getItem("FirstMarket"));
        console.log("Kas dedama " + cryptos.name);
      if(localStorage.getItem("FirstMarket") != "" && localStorage.getItem("FirstMarket" != (cryptos.name).toString())) 
      {
        console.log("Kas issaugota" + localStorage.getItem("FirstMarket"));
        console.log("Kas dedama " + cryptos.name);
        localStorage.setItem("FirstMarket", cryptos.name);
      }
      console.log(cryptos.name);
      console.log(fk);
      return cryptos.name;
    });
    return response.data.name;*/

}
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}
export default App;