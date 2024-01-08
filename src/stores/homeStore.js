import axios from 'axios';
import { create } from 'zustand';
import debounce from '../helpers/debounce';

const homeStore = create((set) => ({
    coins: [],
    trending: [],
    query: '',
    searching: false,
    coinSearched: false,

    setQuery: (e) => {
        set({query: e.target.value})
        homeStore.getState().searchCoins();
    },

    searchCoins: debounce(async () => {
        set({searching: true})
        const {query, trending} = homeStore.getState();

        if(query.length > 2) {
            const searchResponse = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
            console.log(searchResponse.data);
            const coins = await searchResponse.data.coins.map(coin => {
                return {
                    name: coin.name,
                    image: coin.large,
                    id: coin.id
                }
            })
            set({coins, searching: false, coinSearched: true});
        }
        else {
            set({coins: trending, searching: false, coionSearched: false});
        }
    }, 500),

    fetchCoins: async () => {
        const [response, btcResponse] = await Promise.all([
            await axios.get('https://api.coingecko.com/api/v3/search/trending'),
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`),

        ]);
        const btcPrice = btcResponse.data.bitcoin.usd;
        console.log(btcPrice);

        const coins = response.data.coins.map((coin) => {
            return {
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                btcPrice: coin.item.price_btc.toFixed(10),
                priceUsd: coin.item.price_btc * btcPrice.toFixed(10)
            }
        })
        
        set({coins, trending:coins}) //set state of coins
        console.log(coins)
    }
}))

export default homeStore;