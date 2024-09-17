<template>
    <Modal />
    <CauseInsert @close-modal="get" />
    <div class="main">
        <div class="main-block-button">
            <div><button class="btn">Доходы</button></div>
            <div><button class="btn">Расходы</button></div>
        </div>
        <div class="form-section">
            <div class="form-block">
                <div class="form-group">
                    <p>Сумма дохода</p>
                    <input type="number" v-model="incomeSum" class="input-field">
                </div>
                <div class="form-group">
                    <p>Дата дохода</p>
                    <input type="date" v-model="incomeDate" class="input-field">
                </div>
                <div class="form-group form-sel-main">
                    <div class="form-group-sel">
                        <p>Источник Дохода</p>
                        <select class="input-field inp-select" v-model="selectedCauseId">
                            <option v-for="item in selectCauses" :key="item.cs_id" :value="item.cs_id">
                                {{ item.cs_causevalue }}
                            </option>
                        </select>

                    </div>
                    <div class="main-btn-new">
                        <button @click="openInsertCause(1)" class="add-btn btn-new-select">Создать</button>
                    </div>

                </div>
                <div>
                    <button @click="insertIncome(1)" class="add-btn">Добавить</button>
                </div>
            </div>
            <div class="form-block">
                <div class="form-group">
                    <p>Сумма расхода</p>
                    <input type="number" v-model="orderSum" class="input-field">
                </div>
                <div class="form-group">
                    <p>Дата расхода</p>
                    <input type="date" v-model="orderDate" class="input-field">
                </div>
                <div class="form-group form-sel-main">
                    <div class="form-group-sel">
                        <p>Источник расхода</p>
                        <select v-model="selectedOrderCauseId" class="input-field inp-select">
                            <option 
                            :value="items.cs_id"
                            v-for="items in selectOrder" 
                            :key="items.cs_id">{{ items.cs_causevalue }}
                            </option>
                        </select>
                    </div>
                    <div class="main-btn-new">
                        <button @click="openInsertCause(2)" class="add-btn btn-new-select">Создать</button>
                    </div>
                </div>
                <div>
                    <button @click="insertIncome(2)" class="add-btn">Добавить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCauseModalInsert, useModalState } from '../store/store';
import { getCauses, getCausesOrder, postInsertManagement } from '../service/api';
import CauseInsert from './UI/CauseInsert.vue';
import Modal from './UI/Modal.vue';


const causeStore = useCauseModalInsert();
const store = useModalState();

const incomeSum = ref<number>(0);
const incomeDate = ref('');
const selectedCauseId = ref();

const orderSum = ref<number>(0);
const orderDate = ref('');
const selectedOrderCauseId = ref();

const selectCauses = ref<Array<any>>([]);
const selectOrder = ref<Array<any>>([]);


const insertIncome = async (typeID: number) => {
    try {

        if (typeID === 1) {
         await postInsertManagement(incomeSum.value, incomeDate.value, selectedCauseId.value, typeID);
        store.setModalText('Доход добавлен!');
        store.setTypeModal(1)
        store.toggleModal(true);
        incomeSum.value = 0;
        incomeDate.value = '';
        selectedCauseId.value = '';   
        } else if (typeID === 2) {
         await postInsertManagement(orderSum.value, orderDate.value, selectedOrderCauseId.value, typeID);
         store.setModalText('Расход добавлен!');
         store.setTypeModal(1)
         store.toggleModal(true);
         orderSum.value = 0;
         orderDate.value = '';
         selectedOrderCauseId.value = '';
        }
        
    } catch (error) {
        console.error(error);
    }

}



const getAxiosIncome = async () => {
    try {
        const res = await getCauses();
        selectCauses.value = res;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    }
};
const getAxiosOrder = async () => {
    try {
        const res = await getCausesOrder();
        selectOrder.value = res;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    }
};

const openInsertCause = (id: number): void => {
    causeStore.toggleCauseModal(true, id);
};

const get = (): void => {
    getAxiosIncome();
    getAxiosOrder();
};

getAxiosIncome();
getAxiosOrder()
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