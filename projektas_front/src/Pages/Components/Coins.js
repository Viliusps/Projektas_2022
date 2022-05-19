import React from 'react';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import euroLogo from '../../euro-symbol.png';
import '../../App.css';


function findAmountByPortfolioAndCryptoSymbol( databaseAmounts, portfolioId, currency) {
    let amount = databaseAmounts.find(amount => parseInt(amount.fk_portfolio) === parseInt(portfolioId) && parseInt(amount.fk_crypto) === parseInt(currency.id));
    return amount !== undefined ? amount.amount : 0;
  }

const Coins = ({currentCoins, coins, selectionsChecked, handleCheckmarkChange, search, databaseAmounts, databaseCurrencies, onAmountUpdate, amountsValues}) => {
  return (
        <Table hover responsive variant="dark">
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
                        {
                        (search === '' ? currentCoins : databaseCurrencies).filter((element) => {
                          if (search == '') {
                            return element;
                          }
                          let coinFromGecko = coins.find(coin => coin.symbol.toUpperCase() === element.name.toUpperCase());
                          if (element.name.toUpperCase() !== "EUR" && (element.name.toLowerCase().includes(search.toLowerCase()) || coinFromGecko.name.toLowerCase().includes(search.toLowerCase()))) {
                            return element;
                          }
                          else if (element.name.toUpperCase() === "EUR" && ("euro".includes(search.toLowerCase()))) {
                            return element;
                          }
                        }).map(function (currency) {
                          if (currency.name !== "EUR") {
                            let coin = coins.find(coin => coin.symbol.toUpperCase() === currency.name.toUpperCase());
                            return (<tr className="row1" id={'row' + currency.id}>
                              <th><img src={coin.image} alt="cryptocurrency logo" className="cryptocurrency-logo" /></th>
                              <th>{coin.name}</th>
                              <th>€{parseFloat(coin.current_price) < 0 ? parseFloat(coin.current_price).toFixed(4) : parseFloat(coin.current_price).toFixed(2)}</th>
                              <th>{parseFloat(findAmountByPortfolioAndCryptoSymbol(databaseAmounts, localStorage.getItem("ChosenPortfolio"), currency)).toFixed(2)}</th>
                              <th>
                                <InputGroup className="mb-3">
                                  <Form.Control aria-label="amount" id={currency.id} className="payment-amount" type="number" onChange={(event) => onAmountUpdate(event)} value={parseInt(amountsValues[currency.id - 1]) === 0 ? '' : amountsValues[currency.id - 1]} />
                                  <InputGroup.Text className="payment-currency-input">EUR</InputGroup.Text>
                                </InputGroup>
                              </th>
                              <th>
                                <Form.Check
                                  type="switch"
                                  id={currency.id}
                                  value={currency.id}
                                  className="check"
                                  checked={selectionsChecked[currency.id - 1]}
                                  onChange={handleCheckmarkChange} />
                              </th>
                            </tr>)
                          }
                          else {
                            return (<tr className="row1" id={'row' + currency.id}>
                              <th><img src={euroLogo} alt="cryptocurrency logo" className="cryptocurrency-logo" /></th>
                              <th>Euro</th>
                              <th>€1</th>
                              <th>{findAmountByPortfolioAndCryptoSymbol(databaseAmounts, localStorage.getItem("ChosenPortfolio"), currency).toFixed(2)}</th>
                              <th>
                                <InputGroup className="mb-3">
                                  <Form.Control aria-label="amount" id={currency.id} className="payment-amount" type="number" value={parseInt(amountsValues[currency.id - 1]) === 0 ? '' : amountsValues[currency.id - 1]} />
                                  <InputGroup.Text className="payment-currency-input">EUR</InputGroup.Text>
                                </InputGroup>
                              </th>
                              <th>
                                <Form.Check
                                  type="switch"
                                  id={currency.id}
                                  value={currency.id}
                                  checked={selectionsChecked[currency.id - 1]}
                                  className="check"
                                  onChange={handleCheckmarkChange}
                                />
                              </th>
                            </tr>)
                          }
                        }
                        )}
      <tr>
      </tr>
    </tbody>
      </Table>
    )
};



export default Coins;