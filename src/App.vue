<template>
    <div class="main">
      <ControlPanel />
      <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ControlPanel from './components/ControlPanel.vue';



</script>

<style scoped>
.main {
  display: flex;
}
</style>