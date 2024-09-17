import { defineStore } from "pinia";

interface RegState {
    isFormValid: boolean;
}
interface ModalState {
    isOpen: boolean;
    typeModal: number;
    modalText: string;
}
interface Token {
    token: boolean;
}
interface CauseModalInsert {
    isOpen: boolean;
    causeType: number;
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


export const useTokenStore = defineStore("token", {
    state: (): Token => {
        return {
            token: false
        };
    },
    actions: {
        setToken( tokenSt: boolean): void{
            this.token = tokenSt;
            console.log('ww');
            
        },
        logout( tokenStatus: boolean): void {
            this.token = tokenStatus;
            console.log('Resr');
            
        }
    }
});

export const useCauseModalInsert = defineStore("causeModalInsert", {
    state: (): CauseModalInsert => {
        return {
            isOpen: false,
            causeType: 1
        };
    },
    actions: {
        toggleCauseModal(state: boolean, type: number): void{
            this.isOpen = state;
            this.causeType = type;
        }
    }
});
