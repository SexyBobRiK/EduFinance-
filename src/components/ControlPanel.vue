<template>
    <div class="main-block" v-if="route.path !== '/' && route.path !== '/registration'">
        <div class="head">
            <div class="head-user">
                <p>{{ name }}</p>
                <p>{{ lastName }}</p>
            </div>
            <p>{{ email }}</p>
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
            <button @click="deleteToken" class="exit-button">Выход</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import axios from 'axios';

const route = useRoute();
const router = useRouter()

const name = ref('')
const lastName = ref('')
const email = ref('')
const deleteToken = () => {
    delete localStorage.authToken
    router.push('/')
}
const isActive = (path: string) => {
    return route.path === path;
};
const isActiveF = () => {
    const token = localStorage.getItem('authToken') || '';

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        },
    }

    axios.get('http://localhost:3000/api/auth/get-users', config)
        .then(response => {
            const data = response.data
            data.forEach(element => {
                name.value = element.usr_name;
                lastName.value = element.usr_lastname;
                email.value = element.usr_email;
            });
        })
        .catch(error => {
            console.error(error);
        });
}

isActiveF();




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