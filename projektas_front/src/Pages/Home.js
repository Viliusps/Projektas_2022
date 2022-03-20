
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
                <a href="#default" className="logo">Skete</a>
                <div className="header-right">
                    <a className="active" href="#home">Home</a>
                    <a href="/deposit">Deposit</a>
                    <a href="/trade">Trade</a>
                    <a onClick={Redirect}>Logout</a>
                </div>
            </div>
            <div className="App-header">

            </div> 
        </div>
    )
}

function Redirect()
{
    window.location.replace('/');
}
export default App;