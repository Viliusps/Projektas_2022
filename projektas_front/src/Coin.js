import React from 'react'

const Coin = ({ name, image, symbol, price}) => {
  return (
    <div>
        <div>
            <div>
              <img src={image} alt="crypto"/>
              <h1>{name}</h1>
              <p>{symbol}</p>
            </div>
        </div>
        <div>
        <p>{price}</p>
        </div>
    </div>
  );
};

export default Coin;