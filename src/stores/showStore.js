import axios from 'axios';
import { create } from 'zustand';
import debounce from '../helpers/debounce';

const showStore = create((set) => ({
    chartData: [],
    fetchData: async(id) => {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=7`)
        console.log(response.data)

        const chartData = response.data.prices.map((price) => {
            const [timestamp, marketPrice] = price;
            return {

                Date: timestamp,
                Price: marketPrice
                
            };
            
        })
        set({chartData})
    },
}))

export default showStore;