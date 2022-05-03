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
    return (
        <div>
        <div className="header" id="head">
            <a href="/home" className="logo">Skete</a>
            <div className="header-right">
                <a href="/home">Home</a>
                <a href="/deposit">Deposit</a>
                <a className="active" href="/trade">Trade</a>
                <a href="/portfolio">Portfolio</a>
                <a onClick={Redirect} href="#">Logout</a>
            </div>
        </div>
        <div>
        <header className="App-header">
        <h1>Trade history</h1>
        <TableContainer id="table" component={Paper} className="Table">
      <Table sx={{ minWidth: 700}} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center" className='tableHeader'></TableCell>
            <TableCell align="center" className='tableHeader'>Currency bought</TableCell>
            <TableCell align="center" className='tableHeader'>Price at the time of trade</TableCell>
            <TableCell align="center" className='tableHeader'>Currency sold</TableCell>
            <TableCell align="center" className='tableHeader'>Price at the time of trade</TableCell>
            <TableCell align="center" className='tableHeader'>Amount bought</TableCell>
            <TableCell align="center" className='tableHeader'>Date</TableCell>
          </TableRow>
        </TableHead>
      </Table>
          </TableContainer>
        <Button variant="outlined" id="save" href="/trade">Back</Button>
      </header>
    </div>
        </div>
        
    );
}
function Redirect()
{
    localStorage.setItem("auth", false);
    window.location.replace('/');
}
export default App;