import React from 'react';
import homeStore from '../stores/homeStore';
import Header from '../components/header';
import ListCoins from '../components/ListCoins';

const Home = () => {
    const store = homeStore(); 

    React.useEffect(() => {
        store.fetchCoins();
    }, [])

  return (
    <div>
        <Header />
        <header className='search-coin'>
            <div className='width'>
                <h3>Search for a coin</h3>
                <input type='text' value={store.query} onChange={store.setQuery}/> 
            </div>
            
        </header>
        <div className='home-crypto-coins'>
            <div className='width'>
            <h2 className='trending-heading'>Trending Crypto Coins</h2>
            {
                store.coins.map((coin) => {
                return (
                        <ListCoins key={coin.id} coin={coin} />
                    )
                })
            }     
            </div>
           
        </div>
        
    </div>
  )
}
export default Home;
