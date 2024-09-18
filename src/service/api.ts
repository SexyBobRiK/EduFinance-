import axios from 'axios';
import { useModalState } from '../store/store'

const store = useModalState();

const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Функция для установки токена в заголовки
const setAuthToken = (token: any) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const userRegistration = async (name: string, lastName: string, email: string, password: string, age: string) => {
    try {
        const response = await api.post('auth/register', {
            name,
            lastName,
            email,
            password,
            age,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        store.setModalText('Ошибка!');
        store.setTypeModal(0);
        store.toggleModal(true);
    }
}

export const userLogin = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', {
            email,
            password,
        });
        const { token } = response.data;
        if (token) {
            // Сохранение токена в localStorage
            localStorage.setItem('authToken', token);
            // Установка токена в заголовки для последующих запросов
            setAuthToken(token);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        store.setModalText('Ошибка!');
        store.setTypeModal(0);
        store.toggleModal(true);
    }
}

export const insertCause = async (causeName: string, type: number) => {
    try {
        const response = await api.post('causes/insert-cause', {
            causeName,
            type,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        store.setModalText('Ошибка!');
        store.setTypeModal(0);
        store.toggleModal(true);
    }
}

export const getCauses = async () => {
    try {
        const response = await api.get('causes/get-causes-income');
        return response.data;
    } catch (error) {
        console.log(error);
        store.setModalText('Ошибка!');
        store.setTypeModal(0);
        store.toggleModal(true);
    }
}
export const getCausesOrder = async () => {
    try {
        const response = await api.get('causes/get-causes-order');
        return response.data;
    } catch (error) {
        console.log(error);
        store.setModalText('Ошибка!');
        store.setTypeModal(0);
        store.toggleModal(true);
    }
}

export const postInsertManagement = async (sum: number, date: string, causeID: number, typeID: number) => {
    try {
        const response = await api.post('managements/insert-managements', {
            sum, 
            date, 
            causeID, 
            typeID
        });
        return response.data;
    } catch (error) {
        console.log(error);
        store.setModalText('Ошибка!');
        store.setTypeModal(0);
        store.toggleModal(true);
    }
}

export const getManagements = async () => {
    try {
        const response = await api.get('managements/get-managements');
        return response.data;
    } catch (error) {
        console.log(error);
        store.setModalText('Ошибка!');
        store.setTypeModal(0);
        store.toggleModal(true);
    }
}

// Установка токена из localStorage при инициализации
const token = localStorage.getItem('authToken');
setAuthToken(token);
