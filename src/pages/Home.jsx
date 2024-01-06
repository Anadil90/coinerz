import React from 'react';
import { Link } from 'react-router-dom';
import homeStore from '../stores/homeStore';
import Header from '../components/header';

const Home = () => {
    const store = homeStore(); 

    React.useEffect(() => {
        store.fetchCoins();
    }, [])

  return (
    <div>
        <Header />
        <header className='search-coin'>
            <h3>Search for a coin</h3>
            <input type='text' value={store.query} onChange={store.setQuery}/>
        </header>
        
        {
            store.coins.map((coin) => {
                return (
                    <div key={coin.id}>
                        <Link to={`/${coin.id}`}>{coin.name}</Link>
                    </div>
                )
            })
        }
    </div>
  )
}
export default Home;
