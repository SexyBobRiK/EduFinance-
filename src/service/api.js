import axios from 'axios';
import { useModalState } from '../store/store'

const store = useModalState();

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const userRegistration = async (name, lastName, email, password, age) => {
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

