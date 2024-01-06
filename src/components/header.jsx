import React from 'react';
import { Link } from 'react-router-dom';
import goBack from '../icons/back arrow.png';


const Header = ({ back }) => {
  return (
    <header className='header'>
        <div className='width'>
            { //show back arrow only when in show page
                back && (
                    <Link to='/'><img src={goBack} className='back'/></Link>
                )
            }
            
            <h1><Link to='/'>Coinerz</Link></h1>
        </div>
    </header>
  )
}

export default Header