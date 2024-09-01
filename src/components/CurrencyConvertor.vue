<template>
    <div class="converter">
        <div class="converter__place">
            Текущее местоположение: {{ store.state.position }}
        </div>
        <h2 class="converter__header">Конвертер валют</h2>
        <div class="converter__dropdowns">
            <Dropdown 
            changeCurrency='CHANGE_TO_CURRENCY'
            :currencies=store.state.currencies
            :currency=store.getters.setToCurrency 
            title="У меня есть"/>

            <div class="converter__swap">
                <button @click="store.commit('EXCHANGE_CURRENCIES')" class="swap__btn">
                    <i class="pi pi-arrow-right-arrow-left"></i>
                </button>
            </div>

            <Dropdown 
            changeCurrency='CHANGE_FROM_CURRENCY'
            :currencies=store.state.currencies
            :currency=store.getters.setFromCurrency
            title="Хочу приобрести"/>
        </div>

        <div class="converter__currencies">
            <label class="converter__label" for="amount">Количество:</label>
            <input
            v-model="store.state.amount"
            v-on:keypress="numbersOnly"
            class="converter__amount" 
            type="number" 
            name="amount" 
            id="amount" />
        </div>

        <div class="converter__summary">
            Итог: {{ store.state.convertedAmount }} {{ store.state.toCurrency }}
        </div>
    </div>


</template>

<script setup>
    import Dropdown from './Dropdown.vue'
    import { ref, onMounted, computed, watchEffect } from "vue";
    import { useStore } from "vuex";
    const store=useStore()

    const numbersOnly=(evt)=>{
    evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    }


    onMounted(()=>{
        store.dispatch('fetchCurrencies')

    })

    watchEffect(()=>{
        store.dispatch('convertCurrency')
    })

</script>

<style lang="scss">
@import '../assets/variables.scss';


.converter {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: white;
    border-radius:0.5rem;
    box-shadow: $shadow-md;
    padding: 1.25rem;
    margin: auto 2.5rem;
    max-width: 1200px;

    @media (max-width:1200px){
        max-width: 970px;
    }

    @media (max-width:992px){
        max-width: 750px;
    }

    @media (max-width:767px){
       max-width: none;
    }

    .converter__place {
        color: $grey-300;
    }

    .converter__header{
        margin-bottom: 1.25rem;
        font-size: 1.5rem;
        font-weight: $semi-bold;
        color: $grey-700;
    }

    .converter__dropdowns {
        display: grid !important;
        gap: 1rem;
        align-items: center;

        @media  screen and (max-width:599px) {
             grid-template-columns: repeat(1, minmax(0, 1fr)) !important;

        }

        @media screen and (min-width: 600px) {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }

   
        .converter__swap {
            display: flex;
            justify-content: center;
            align-items: center;

            .swap__btn {
                padding: 0.5rem;
                background-color: $grey-200;
                border-radius: 50%;
                border: none;
                cursor: pointer;
                color: black;

                 @media screen and (min-width: 600px) {
                    margin-top: 1rem;
                };

                &:hover{
                    background-color: $grey-300;
                }
            }
        }
    }

    .converter__currencies {
        margin-top: 1rem;
        width: 100%;

        .converter__label {
            display: block;
            font-size: $text-sm;
            font-weight: $medium;
        }

        .converter__amount {
            width: 100%;
            border-radius: 0.375rem; 
            box-shadow: $shadow-sm;
            border: 2px solid $grey-300;
            padding: .5rem;
            box-sizing: border-box;
            font-size: 14px;

            &:focus {
                outline: none;
                box-shadow: 0 0 0 2px $indigo-500, $shadow-md;
            }
        }
    }

    .converter__dropdowns {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .converter__summary {
        margin-top: 1rem;
        font-size: $text-lg;
        font-weight: $medium;
        text-align: right;
        color:$green-600;
    }
}

    
</style>