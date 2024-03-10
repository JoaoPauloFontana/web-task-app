import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import './style.css';
import useUserData from "../../context/User";
import { Navbar } from "../../components/Navbar";
import { Tasks } from "../../types/tasks";
import { ModalTask } from "../../components/ModalTask";

export function Home() {
    const [tasks, setTasks] = useState<Array<Tasks>>([]);
    const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useUserData();
    const { t } = useTranslation();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const tasks: Array<Tasks> = [
            {
                id: 1,
                title: 'Troca de lâmpada',
                description: 'Trocar a lâmpada da sala de estar ou do quarto do casal, escrevendo mais um pouco para quebrar a linha e testar o scroll da página.'
            },
            {
                id: 2,
                title: 'Instalação de chuveiro',
                description: 'Instalar um chuveiro elétrico'
            },
            {
                id: 3,
                title: 'Conserto de torneira',
                description: 'Consertar a torneira do banheiro'
            },
            {
                id: 4,
                title: 'Conserto de vazamento',
                description: 'Consertar um vazamento na pia da cozinha'
            },
            {
                id: 5,
                title: 'Instalação de ar condicionado',
                description: 'Instalar um ar condicionado'
            },
        ];
        setTasks(tasks);
    }, []);

    const renderLineFocus = function (taskId: number) {
        if (selectedTask && selectedTask.id === taskId) {
            return <div className="line-focus" />
        }
        return null;
    }

    const selectedItem = function (taskId: number) {
        if (selectedTask && selectedTask.id === taskId) {
            return 'selected-item';
        }
        return '';
    }

    const renderDetailsService = function () {
        if (selectedTask) {
            return (
                <>
                    <h2>{selectedTask.title}</h2>
                    <div className="details-task">
                        <span>{selectedTask.description}</span>
                    </div>
                    <button className="btn-edit-task">
                        <FaEdit size={20} color="#F97B3A" />
                    </button>
                    <button onClick={() => alert('Finalizando')} className="btn-finish-call">{t('home.detailService.btnEndCall')}</button>
                </>
            )
        }
        return (<h2>{t('home.detailService.titleUnselected')}</h2>)
    }

    const handleSelectTask = function (task: Tasks) {
        setSelectedTask(task);
    }

    return (
        <>
            <Navbar />
            <ModalTask modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
            <div className="background-home">
                <div className="container-home">
                    <div className="card-tasks">
                        <h2>{t('home.listServices.title')}</h2>
                        <ul className="list-tasks">
                            {tasks.map(task => (
                                <li onClick={() => handleSelectTask(task)} className={`task-item ${selectedItem(task.id)}`} key={task.id}>
                                    {renderLineFocus(task.id)}
                                    <div className="preview-info">
                                        <h3 className="username-info">{task.title}</h3>
                                        <p className="task-preview">{task.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="btn-plus-task" onClick={() => setModalIsOpen(true)}>
                            <FaPlus size={20} color="#FFF" />
                        </button>
                    </div>

                    <div className="card-tasks">
                        {renderDetailsService()}
                    </div>
                </div>
                <ToastContainer 
                    position='bottom-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    theme='dark'
                />  
            </div>
        </>
    );
}