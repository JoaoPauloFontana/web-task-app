import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";

import './styles.css';
import { useState } from 'react';

interface ModalTaskProps {
    modalIsOpen: boolean;
    setModalIsOpen: (value: boolean) => void;
    isEdit?: boolean;
    idTask?: number;
    defaultTitle?: string;
    defaultDescription?: string;
}

export function ModalTask({modalIsOpen, isEdit, idTask, defaultDescription = '', defaultTitle = '', setModalIsOpen}: ModalTaskProps) {
    const [title, setTitle] = useState(defaultTitle);
    const [description, setDescription] = useState(defaultDescription);

    const handleSubmit = function () {
        console.log('Salvando tarefa:', idTask, title, description);
    }

    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    width: 'max-content',
                    height: 'max-content',
                    margin: 'auto',
                    padding: '20px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#FFF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative'
                }
            }}
        >
            <h2 className='title-form-task'>{ isEdit ? 'Editando tarefa:' : 'Criando nova tarefa:'}</h2>
            <input placeholder='Título' type="text" className='input title' value={title} onChange={event => setTitle(event.target.value)}/>
            <textarea placeholder='Descrição' className='input description' value={description} onChange={event => setDescription(event.target.value)}/>
            <button className='save-button' onClick={handleSubmit}>Salvar</button>
            <button className='close-button' onClick={() => setModalIsOpen(false)}><IoClose size={20} color="FF0000" /></button>
        </Modal>
    )
}