<script setup>
  import CurrencyConvertor from './components/CurrencyConvertor.vue'
  import { useStore } from "vuex";
import { onMounted } from 'vue';

  const store=useStore()

  onMounted(()=>{
    store.dispatch('getPosition')
  })

</script>

<template>
  <div class="app">
      <CurrencyConvertor />
  </div>
</template>

<style lang="scss" scoped>
@import './assets/variables.scss';

    .app {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
      background-color: $grey-100;
      min-height: 100vh;
    }


</style>
