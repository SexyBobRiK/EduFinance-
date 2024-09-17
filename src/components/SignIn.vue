<template>
  <Modal />
  <div class="main" v-if="activeRegForm.isFormValid">
    <div class="reg-main-block">
      <div class="reg-form">
        <h1 class="title-text">Вход</h1>
        <div class="input-block">
          <label for="email">Логин</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="input-block">
          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div>
          <button
           :class="btActive() ? 'disabled-button' : 'enabled-button'"
          @click="getAxiosEntrance"
          >ВХОД
          </button>
        </div>
        <router-link to="/registration">Зарегистрироваться?</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRegStore } from '../store/store';
import Modal from '../components/UI/Modal.vue';
import { useModalState, useTokenStore } from '../store/store'
import { userLogin } from '../service/api';

const activeRegForm = useRegStore();
const tokenStore = useTokenStore();
const router = useRouter();
const modal = useModalState();

const email = ref('');
const password = ref('');

// Объект для валидации полей
const activeInput = computed((): any => {
  return {
    email: email.value,
    password: password.value,
  };
});

const getAxiosEntrance = async () => {
  try {
    const response = await userLogin(email.value, password.value);
    const res = response.message;
    if (res === 'User not found') {
      modal.setModalText('Пользователь не найдет!');
      modal.setTypeModal(0)
      modal.toggleModal(true);
      return
    } else if (res === 'Password invalid') {
      modal.setModalText('Неверный пароль!');
      modal.setTypeModal(0)
      password.value = '';
      modal.toggleModal(true);
      return 
    }
      tokenStore.setToken(true);
      router.push('/graphs');
  } catch (error: any) {
    console.error(error.message);
  }
}
// Валидация полей
const btActive = (): boolean => {
    for (const key in activeInput.value) {
        if (activeInput.value[key] === '' ||
            activeInput.value['password'].length < 8) {
            return true;
        }
    }
    return false;
};
</script>

<style scoped>
.main {
  width: 100%;
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
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reg-form {
  width: 50%;
  height: 60%;
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