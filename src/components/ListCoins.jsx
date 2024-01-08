import React from 'react'
import { Link } from 'react-router-dom';
import bitcoinIcon from '../icons/bitcoin_icon.png';

const ListCoins = ({ coin }) => {
  return (
    <div className='home-crypto'>
        <Link to={`/${coin.id}`}>
            <span className='home-crypto-image'><img src={coin.image}/></span>
            <span className='home-crypto-name'>{coin.name}</span>
            { coin.btcPrice && 
                ( 
                <span className='home-crypto-prices'>  
                    <span className='home-crypto-btc'>
                        <img src={bitcoinIcon} />
                        {coin.btcPrice} BTC
                    </span>
                    <span className='home-crypto-usd'>({coin.priceUsd} USD)</span>
                </span>
                )
            }   
        </Link> 
    </div>
  )
}

export default ListCoins