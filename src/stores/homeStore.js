import axios from 'axios';
import { create } from 'zustand';

const homeStore = create((set) => ({
    coins: [],
    query: '',

    setQuery: (e) => {
        set({query: e.target.value})
    },

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
        set({coins}) //set state of coins
    }
}))

export default homeStore;