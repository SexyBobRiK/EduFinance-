<template>
  <div class="chart-main">
    <Pie :data="chartData" :options="options" v-if="chartData" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { getManagements } from '../service/api';


ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
  responsive: true,
  maintainAspectRatio: false,
};


const chartData = ref(null);


const loadData = async () => {
  const labelsArray: string[] = [];
  const dataArray: number[] = [];

  try {
    const response = await getManagements();

    response.forEach((item: any) => {
      labelsArray.push(item.cs_causevalue);
      dataArray.push(item.mng_value);
    });


    chartData.value = {
      labels: labelsArray,
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#DD1B18', '#FF5733', '#8DFF33', '#3385FF', '#D433FF', '#33FFB8', '#FFC300', '#C70039', '#900C3F', '#581845', '#DAF7A6', '#FF5733', '#4A235A', '#28B463', '#16A085', '#7D3C98'] ,
          data: dataArray,
        },
      ],
    };
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
  }
};


onMounted(() => {
  loadData();
});
</script>

<style scoped>
.chart-main {
  width: 100%;
  height: 100hv;
  margin-top: 20px;
  margin: 0 auto;
}
</style>
