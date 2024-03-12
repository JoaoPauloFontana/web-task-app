import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    fallbackLng: "pt",
    interpolation: {
        escapeValue: false
    },
    resources: {
        pt: {
            translation: {
                login: {
                    titleForm: "Digite seu nome:",
                    placeholderUserName: "Nome do usuário",
                    btnConect: "Conectar",
                },
                navbar: {
                    logout: "Sair",
                },
                home: {
                    listServices: {
                        title: 'Tarefas:',
                    },
                    detailService: {
                        title: 'Tarefa selecionada: ',
                        btnEndCall: 'Finalizar',
                        titleUnselected: 'Selecione uma tarefa',
                    },
                    toast: {
                        errorLoginName: 'Erro ao logar, verifique o nome do usuário',
                        verifyFields: 'Verifique os campos',
                        successSave: 'Tarefa salva com sucesso!',
                    },
                    buttons: {
                        save: 'Salvar',
                        cancel: 'Cancelar',
                    
                    }
                }
            }
        },
        en: {
            translation: {
                login: {
                    titleForm: "Enter your name:",
                    placeholderUserName: "User name",
                    btnConect: "Connect",
                },
                navbar: {
                    logout: "Logout",
                },
                home: {
                    listServices: {
                        title: 'Tasks:',
                    },
                    detailService: {
                        title: 'Selected call: ',
                        btnEndCall: 'End call',
                        titleUnselected: 'Select a task',
                    },
                    toast: {
                        errorLoginName: 'Error logging in, check the username',
                        verifyFields: 'Check the fields',
                        successSave: 'Task saved successfully!',
                    },
                    buttons: {
                        save: 'Save',
                        cancel: 'Cancel',
                    }
                }
            }
        }
    }
})

export default i18n;