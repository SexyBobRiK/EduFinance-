<template>
    <div class="main-block" v-if="route.path == '/' || route.path == '/registration' ? false : true">
        <div class="head">
            <div class="head-user">
                <p>Nikita</p>
                <p>Bugaenko</p>
            </div>
            <p>bagpuma8@gmail.com</p>
        </div>

        <div class="actions">
            <router-link :class="{ 'nav-link': true, 'active': isActive('/graphs') }" to="/graphs">
                График
            </router-link>
            <router-link :class="{ 'nav-link': true, 'active': isActive('/management') }" to="/management">
                Учет
            </router-link>
            <router-link :class="{ 'nav-link': true, 'active': isActive('/report') }" to="/report">
                Отчет
            </router-link>
        </div>

        <div class="footer">
            <button @click="storeToken.logout(false)" class="exit-button">Выход</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useTokenStore } from '../store/store'


const storeToken = useTokenStore()
const route = useRoute();

const isActive = (path: string) => {
    return route.path === path;
};
</script>

<style scoped>
.main-block {
    width: 15%;
    min-height: 100vh;
    background-color: #1c1c1c;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
    box-sizing: border-box;
}

.head {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 18px;
    flex-grow: 0.2;
}
.head-user {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
}

.actions {
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 2;
}

.nav-link {
    display: block;
    padding: 10px;
    width: 100%;
    background-color: #3a3a3a;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
    text-align: center;
}

.nav-link:hover {
    background-color: #505050;
}


.active {
    background-color: #0e6edd;
    font-weight: bold;
}

.footer {
    text-align: center;
}

.exit-button {
    padding: 10px;
    width: 100%;
    background-color: red;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

.exit-button:hover {
    background-color: darkred;
}
</style>