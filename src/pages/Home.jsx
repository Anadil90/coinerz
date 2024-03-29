import React from 'react';
import homeStore from '../stores/homeStore';
import Header from '../components/header';
import ListCoins from '../components/ListCoins';
import classNames from 'classnames';

const Home = () => {
    const store = homeStore();

    React.useEffect(() => {
        if(store.trending.length === 0) store.fetchCoins();
    }, [])

    return (
        <div>
            <Header />
            <header className='search-coin'>

                <div className='width'>
                    <h3>Search for a coin</h3>
                    <div className={classNames('home-input-search', {searching: store.searching})}>
                        <input type='text' value={store.query} onChange={store.setQuery} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 512 512">
                            <path fill='curentColor'
                            d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 
                            48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 
                            0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 
                            48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z
                            "
                            />
                        </svg>
                    </div>
                </div>

            </header>
            <div className='home-crypto-coins'>
                <div className='width'>
                    <h2 className='trending-heading'>
                        { 
                            store.coinSearched 
                            ?
                            'Search results'
                            :
                            'Trending Crypto Coins'
                        }
                    </h2>
                    <div className='home-cryptos-list'>
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

        </div>
    )
}
export default Home;
