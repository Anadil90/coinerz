import axios from 'axios';
import { create } from 'zustand';
import debounce from '../helpers/debounce';

const showStore = create((set) => ({
    chartData: [],
    data: null,

    resetChartData: () => {
        set({chartData: [], data: null}) //clear graph data to remove flash on reloading
    },

    fetchData: async (id) => {
        const [graphResponse, dataResponse] = await Promise.all([
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=90`),
            axios.get(`https://api.coingecko.com/api/v3/coins/${id}?market_data=true`),
        ]);
        
        
        const chartData = graphResponse.data.prices.map((price) => {
            const [timestamp, marketPrice] = price;
            const date = new Date(timestamp).toLocaleDateString('en-us');
            return {

                Date: date,
                Price: marketPrice
                
            };
            
        })
        console.log(graphResponse.data);
        set({chartData, data:dataResponse.data})
    },
}))

export default showStore;