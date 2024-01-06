import React from 'react'
import { Link } from 'react-router-dom';

const ListCoins = ({ coin }) => {
  return (
    <div className='home-crypto'>
        <Link to={`/${coin.id}`}>{coin.name}</Link>
    </div>
  )
}

export default ListCoins