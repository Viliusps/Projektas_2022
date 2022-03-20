
function App() {
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2,
                border: 0
            }}
        />
    );
    return (
        <div>
            <div className="header" id="head">
                <a href="/home" className="logo">Skete</a>
                <div className="header-right">
                    <a className="active" href="/home">Home</a>
                    <a href="/deposit">Deposit</a>
                    <a href="/trade">Trade</a>
                    <a onClick={Redirect}>Logout</a>
                </div>
            </div>
            <div className="App-header">
                <div className="toprightcorner">
                    <label id="assets"></label>
                </div>
            </div> 
        </div>
    )
}

window.onload = function()
{
    const balances = [];
    balances.push(localStorage.getItem("BTC"));
    balances.push(localStorage.getItem("EUR"));
    balances.push(localStorage.getItem("ETH"));
    
    //Reiksmiu tvarka: btc, eur, eth
    const prices = [37940, 1, 2645];
    //----------------------------
    localStorage.setItem("BTCprice",prices[0]);
    localStorage.setItem("EURprice",prices[1]);
    localStorage.setItem("ETHprice",prices[2]);
    //----------------------------
    var sum=0;
    for(let i=0; i<balances.length; i++)
    {
      sum+=balances[i]*prices[i];
    }
    localStorage.setItem("AssetValue", sum);
    document.getElementById('assets').innerHTML = "Your portfolio value: " + sum + "€";
}

function Redirect()
{
    window.location.replace('/');
}
export default App;