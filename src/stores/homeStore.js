import axios from 'axios';
import { create } from 'zustand';
import debounce from '../helpers/debounce';

const homeStore = create((set) => ({
    coins: [],
    trending: [],
    query: '',

    setQuery: (e) => {
        set({query: e.target.value})
        homeStore.getState().searchCoins();
    },

    searchCoins: debounce(async () => {
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
            set({coins, trending:coins});
        }
        else {

        }
    }, 500),

    fetchCoins: async () => {
        const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
        console.log(response)

        const coins = response.data.coins.map((coin) => {
            return {
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                btcPrice: coin.item.price_btc
            }
        })
        set({coins, trending:coins}) //set state of coins
    }
}))

export default homeStore;