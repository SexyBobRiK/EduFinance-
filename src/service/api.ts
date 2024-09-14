import axios from 'axios';
import { useModalState } from '../store/store'

const store = useModalState();

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const userRegistration = async (name: string, lastName: string, email: string, password: string, age: string) => {
    try {
        const response = await api.post('/register', {
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
       store.setTypeModal(0)
       store.toggleModal(true);
    }
}

export const userLogin = async (email: string, password: string) => {
    try {
        const response = await api.post('/login', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
       console.log(error);
       store.setModalText('Ошибка!');
       store.setTypeModal(0)
       store.toggleModal(true);
    }
    
}

