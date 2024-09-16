<template>
    <CauseInsert />
    <div class="main">
        <div class="main-block-button">
            <div><button class="btn">Доходы</button></div>
            <div><button class="btn">Расходы</button></div>
        </div>
        <div class="form-section">
            <div class="form-block">
                <div class="form-group">
                    <p>Сумма дохода</p>
                    <input type="number" class="input-field">
                </div>
                <div class="form-group">
                    <p>Дата дохода</p>
                    <input type="date" class="input-field">
                </div>
                <div class="form-group form-sel-main">
                    <div class="form-group-sel">
                        <p>Источник Дохода</p>
                        <select class="input-field inp-select">
                            <option value="salary">Зарплата</option>
                            <option value="investment">Инвестиции</option>
                            <option value="freelance">Фриланс</option>
                            <option value="other">Прочее</option>
                        </select>
                    </div>
                    <div class="main-btn-new">
                      <button @click="openInsertCause(1)" class="add-btn btn-new-select">Создать</button>  
                    </div>
                    
                </div>
                <div>
                    <button class="add-btn">Добавить</button>
                </div>
            </div>
            <div class="form-block">
                <div class="form-group">
                    <p>Сумма расхода</p>
                    <input type="number" class="input-field">
                </div>
                <div class="form-group">
                    <p>Дата расхода</p>
                    <input type="date" class="input-field">
                </div>
                <div class="form-group form-sel-main">
                    <div class="form-group-sel">
                        <p>Источник расхода</p>
                        <select class="input-field inp-select">
                            <option value="salary">Зарплата</option>
                            <option value="investment">Инвестиции</option>
                            <option value="freelance">Фриланс</option>
                            <option value="other">Прочее</option>
                        </select>
                    </div>
                    <div class="main-btn-new">
                      <button @click="openInsertCause(2)" class="add-btn btn-new-select">Создать</button>  
                    </div>
                    
                </div>
                <div>
                    <button class="add-btn">Добавить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCauseModalInsert } from '../store/store'
import  CauseInsert  from './UI/CauseInsert.vue';

const causeStore = useCauseModalInsert();

const openInsertCause = (id: number): void => {
  causeStore.toggleCauseModal(true, id);
}
</script>

<style scoped>
.main {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.btn-new-select {
    width: 70%;
    height: 40px;
    background-color: #007bff !important;
}
.main-btn-new {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: end;
    justify-content: center;
}

.form-group-sel {
    width: 60%;
    display: flex;
    flex-direction: column;
}

.form-sel-main {
    display: flex;
    align-items: center;

}

.main-block-button {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
    background-color: #f1f1f1;
}

.btn {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}

.btn:active {
    background-color: #003f7f;
}

.btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}

.form-section {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
}

.form-block {
    display: flex;
    flex-direction: column;
    width: 40%;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.input-field {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
    transition: border-color 0.3s ease;
}

.inp-select {
    width: 100%;
}

.input-field:focus {
    outline: none;
    border-color: #007bff;
}

.add-btn {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-btn:hover {
    background-color: #218838;
}

.add-btn:active {
    background-color: #1e7e34;
}

.add-btn:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.5);
}
</style>