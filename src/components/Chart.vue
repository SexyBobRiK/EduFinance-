<template>
    <div class="chart-main">
      <Pie :data="data" :options="options" />  
    </div>
    
  </template>
  
  <script setup lang="ts">
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs'
  import { data, options }  from '../chart/chartConfig'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  

  </script>

<style scoped>
 .chart-main {
    width: 800px;
    height: 800px;
    margin-top: 20px;
    margin: 0 auto;
  }
</style>
  