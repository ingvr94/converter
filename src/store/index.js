import { createStore } from "vuex";

import axios from "axios";

export default createStore({

    state:{
        currencies:[],
        amount:1,
        fromCurrency:'USD',
        toCurrency:'EUR',
        convertedAmount:0,
        position:''
    },
    getters:{
        getCurrencies:(state)=>state.currencies,
        setAmount:(state)=>state.amount,
        setFromCurrency:(state)=>state.fromCurrency,
        setToCurrency:(state)=>state.toCurrency,
        setConvertedAmount:(state)=>state.convertedAmount,
        setPosition:(state)=>state.position
    },
    actions:{
        async fetchCurrencies({commit}){
            try {
                const data=await axios.get('https://api.frankfurter.app/currencies');
                commit('SET_CURRENCIES',Object.keys(data.data))
            }
            catch(error) {
                alert(err)
                console.log(err)
            }
        },

        async convertCurrency({commit,state}) {
            try {
                const data=await axios.get(`https://api.frankfurter.app/latest?amount=${state.amount}&from=${state.fromCurrency}&to=${state.toCurrency}`);
            
                commit('SET_CONVERTED_AMOUNT',data.data.rates[state.toCurrency])
            }
            catch(error) {
                alert(error)
                console.log(error)
            } 
        },

        async getPosition({commit,state}){
            try {
                const data=await axios.get(`https://api.country.is/`);
                commit('SET_POSITION',data.data.country)
                
                state.currencies.forEach(currency=>{
                    if (currency.includes(data.data.country)) {
                        commit('CHANGE_TO_CURRENCY',currency)
                    }
                })
               
            }
            catch(error) {
                alert(error)
                console.log(error)
            } 
        }
    },
    mutations:{
        SET_CURRENCIES(state,currencies){
            state.currencies= currencies
        },
        SET_CONVERTED_AMOUNT(state,amount){
            state.convertedAmount=amount
        },
        CHANGE_FROM_CURRENCY(state,currency){
            state.fromCurrency=currency
        },
        CHANGE_TO_CURRENCY(state,currency){
            state.toCurrency=currency
        },
        EXCHANGE_CURRENCIES:(state)=>{
            [state.fromCurrency,state.toCurrency]=[state.toCurrency,state.fromCurrency]
        },
        SET_POSITION:(state,position)=>{
            state.position=position
        }
    }
})

