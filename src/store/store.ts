import { defineStore } from "pinia";

interface RegState {
    isFormValid: boolean;
}
interface ModalState {
    isOpen: boolean;
    typeModal: number;
    modalText: string;
}

export const useRegStore = defineStore("reg", { 
    state: (): RegState => {
        return {
            isFormValid: true
        };
    }
});

export const useModalState = defineStore("modal", {
    state: (): ModalState => {
        return {
            isOpen: false,
            typeModal: 1,
            modalText: ""
        };
    },
    actions: {
        toggleModal(state: boolean): void{
            this.isOpen = state;
        },
        setTypeModal(type: number): void{
            this.typeModal = type;
        },
        setModalText(text: string): void{
            this.modalText = text;
        }
    }
});
