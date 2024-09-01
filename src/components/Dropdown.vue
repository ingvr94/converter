<template>
    <div class="dropdown">
        <label class="dropdown__label" :for='title'>{{ title }}</label>
        <div class="dropdown__list">
            <select :value="currency" @change="handleChange"  class="dropdown__select"  name="" id="" >
                <option class="dropdown__currencies" v-for="currency of currencies" :key='currency'>
                    {{ currency }}
                </option>
            </select>
        </div>

    </div>
   
</template>

<script setup>
    const props=defineProps({
        title:String,
        currencies:Array,
        currency:String,
        changeCurrency:String
    })

    import { useStore } from "vuex";
    const store=useStore()


    const handleChange=(e)=>{
       store.commit(props.changeCurrency,e.target.value)
    }


</script>

<style lang="scss">
@import '../assets/variables.scss';

.dropdown {
    margin-top: 0.25rem;
    position: relative;
    .dropdown__label {
        display: block;
        font-size: $text-sm;
        font-weight: $medium;
        color:$grey-700;
    }
    .dropdown__select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    font-size: $text-sm;;
    appearance: none;
    border-radius: 0.375rem; 
    box-shadow: $shadow-sm;
    border: 2px solid $grey-300;
    padding: .5rem;
    box-sizing: border-box;
    color: black;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px $indigo-500, $shadow-md;
    }  
}
}




</style>