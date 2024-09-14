<template>
    <Modal />
    <div class="main">
        <div class="reg-main-block">
            <div class="reg-form">
                <h1 class="title-text">Регистрация</h1>
                <div class="input-block">
                    <label for="name">Имя</label>
                    <input type="text" id="name" v-model="name" required>
                </div>
                <div class="input-block">
                    <label for="lastName">Фамилия</label>
                    <input type="text" id="lastName" v-model="lastName" required>
                </div>
                <div class="input-block">
                    <label for="age">Дата рождения</label>
                    <input type="date" id="age" v-model="age" required>
                </div>
                <div class="input-block">
                    <label for="email">Логин</label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div class="input-block">
                    <label for="password">Придумайте пароль</label>
                    <input type="password" id="password" v-model="password" required>
                </div>
                <div class="input-block">
                    <label for="password">Повторите пароль</label>
                    <input type="password" id="twopassword" v-model="twoPassword" required>
                </div>
                <div>
                    <button :disabled="btActive()" @click="registrationAxios"
                        :class="btActive() ? 'disabled-button' : 'enabled-button'">РЕГИСТРАЦИЯ</button>
                </div>
                <router-link to="/">Войти?</router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { userRegistration } from '../service/api';
import { useModalState } from '../store/store'
import Modal from './UI/Modal.vue';

const router = useRouter();
const store = useModalState();

const name = ref('');
const lastName = ref('');
const age = ref('');
const email = ref('');
const password = ref('');
const twoPassword = ref('');
const modalText = ref('')
// Объект для валидации полей
const activeInput = computed(() => {
    return {
        name: name.value,
        lastName: lastName.value,
        age: age.value,
        email: email.value,
        password: password.value,
        twoPassword: twoPassword.value,
    };
});

const registrationAxios = async () => {
    if (password.value != twoPassword.value) {
        alert('Пароли не совпадают!');
        return;
    }
    try {
        const results = await userRegistration(name.value, lastName.value, email.value, password.value, age.value);
        const res = results.message
        if (res === 'Email already exists') {
            store.setModalText('Email уже занят!');
            store.setTypeModal(0)
            store.toggleModal(true);
        } else {
            store.setModalText('Регистрация прошла успешно!');
            store.setTypeModal(1)
            store.toggleModal(true);
        }
    } catch (error) {
        console.error(error.message);
    }
}

// Валидация полей
const btActive = () => {
    for (const key in activeInput.value) {
        if (activeInput.value[key] === '' ||
            activeInput.value['password'].length < 8 ||
            activeInput.value['twoPassword'].length < 8) {
            return true;
        }
    }
    return false;
};
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: whitesmoke;
}

.title-text {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 700;
}

.reg-main-block {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.reg-form {
    width: 50%;
    height: 70%;
    margin: 20px;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.input-block {
    display: flex;
    width: 90%;
    flex-direction: column;

}

input {
    width: 95%;
    padding: 10px;
    margin: 10px 0;
    font-size: 16px;
    color: #333;

    border: 2px solid #ccc;
    border-radius: 5px;

    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    transition: border 0.3s ease, box-shadow 0.3s ease;
}

input:focus {

    border-color: #007bff;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
    outline: none;
}

input::placeholder {
    color: #999;
    font-style: italic;
}

.enabled-button {
    padding: 12px 24px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
}

.enabled-button:hover {
    background-color: #0056b3;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.enabled-button:active {
    /* Стили при нажатии */
    background-color: #004085;
    transform: translateY(2px);
}

.enabled-button:focus {
    outline: none;
}

.disabled-button {
    background-color: gray;
    cursor: not-allowed;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
}
</style>