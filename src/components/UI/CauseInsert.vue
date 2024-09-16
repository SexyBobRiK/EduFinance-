<template>
    <div class="modal-overlay" v-if="storeCause.isOpen">
        <div class="modal-window">
            <div class="button-block">
                <button @click="closeModal" class="close-button">×</button>
            </div>
            <div class="modal-content">
                <p>Введите наименование источника</p>
                <input v-model="causeName" type="text" class="modal-input" placeholder="Введите текст...">
            </div>
            <div class="modal-actions">
                <button @click="insertCauseAixos" class="create-button">Создать</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCauseModalInsert } from '../../store/store';
import {insertCause } from '../../service/api'
const storeCause = useCauseModalInsert();

const causeName = ref('');
const insertCauseAixos = async () => {
    try {
        const response = await insertCause(causeName.value,storeCause.causeType)
        console.log(response);
        storeCause.toggleCauseModal(false, 1);
    } catch (error: any) {
        console.error(error.message);
    }

}

const closeModal = () => {
    storeCause.toggleCauseModal(false, 1);
};

</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-window {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 350px;
    max-width: 100%;
    text-align: center;
    position: relative;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    animation: fade-in 0.3s ease-out, slide-down 0.3s ease-out;
}

.button-block {
    position: absolute;
    top: 10px;
    right: 10px;
}

.close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #333;
    transition: color 0.3s ease;
}

.close-button:hover {
    color: #ff4c4c;
}

.modal-content p {
    margin-bottom: 15px;
    font-size: 18px;
    color: #333;
}

.modal-input {
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.modal-input:focus {
    border-color: #1172c2;
    outline: none;
}

.modal-actions {
    margin-top: 20px;
}

.create-button {
    background-color: #1172c2;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.create-button:hover {
    background-color: #0a5a9b;
    transform: translateY(-2px);
}

.create-button:active {
    background-color: #09497d;
    transform: translateY(0);
}

@keyframes slide-down {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
