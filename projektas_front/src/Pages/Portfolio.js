import '../App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {
    const balances = [];
    balances.push(localStorage.getItem("BTC"));
    balances.push(localStorage.getItem("EUR"));
    balances.push(localStorage.getItem("ETH"));
    const prices=[];
    prices.push(localStorage.getItem("BTCprice"));
    prices.push(localStorage.getItem("EURprice"));
    prices.push(localStorage.getItem("ETHprice"));
    console.log(prices[0]);
    const rows = [
        createData('BTC', parseInt(balances[0]).toFixed(2), (parseInt(balances[0]) * parseInt(prices[0])).toFixed(2)),
        createData('EUR', parseInt(balances[1]).toFixed(2), (parseInt(balances[1]) * parseInt(prices[1])).toFixed(2)),
        createData('ETH', parseInt(balances[2]).toFixed(2), (parseInt(balances[2]) * parseInt(prices[2])).toFixed(2)),
      ];
  return (
    <div>
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
    </div>
      <header className="App-header">
      <TableContainer component={Paper} className="Table">
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.asset}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </header>
    </div>
  );
}
function createData(asset, amount, value) {
    return {asset, amount, value };
  }
function Redirect()
{
    window.location.replace('/');
}
export default App;