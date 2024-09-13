<template>
    <div class="modal-overlay" v-if="store.isOpen">

        <div class="modal-window">
            <div class="button-block">
                <button @click="closeModal" class="close-button">×</button>
            </div>
            <span class="material-symbols-outlined" :class="store.typeModal == 1 ? 'modal-icon' : 'modal-icon-err'">
                error
            </span>

            <p class="modal-message">{{ store.modalText }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useModalState } from '../../store/store';
import { useRoute, useRouter } from 'vue-router';

const store = useModalState();
const router = useRouter();
const route = useRoute();

const closeModal = () => {
    store.isOpen = false;
    if (route.path == '/registration' && store.typeModal === 1) {
        router.push('/');
    }
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
    width: 300px;
    text-align: center;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: slide-down 0.3s ease-out;
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

.modal-icon {
    font-size: 48px;
    color: #1172c2;
}

.modal-icon-err {
    font-size: 48px;
    color: #c20d0d;
}

.modal-message {
    margin-top: 10px;
    font-size: 18px;
    color: #333;
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
</style>