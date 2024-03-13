import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { fetchTasks, deleteTask } from '../../services/taskService';

import './style.css';
import useUserData from "../../context/User";
import { Navbar } from "../../components/Navbar";
import { Tasks } from "../../types/tasks";
import { ModalTask } from "../../components/ModalTask";

export function Home() {
    const [tasks, setTasks] = useState<Array<Tasks>>([]);
    const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useUserData();
    const { t } = useTranslation();

    const fetchData = async () => {
        try {
            const tasksFromApi = await fetchTasks();

            const auxiliar = tasksFromApi.map((item: any) => ({
                id: item.id,
                title: item.name,
                description: item.description
            }));

            if (selectedTask != null) {
                const editedTask = auxiliar.find((item: any) => item.id == selectedTask.id);

                if (editedTask) {
                    setSelectedTask(editedTask);
                }
            }

            setTasks(auxiliar);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error(t('home.toast.errorFetchingTasks'));
        }
    };
    

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetchData();
    }, [navigate, t, user]);

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
                    <button className="btn-edit-task" onClick={() => setModalEditIsOpen(true)}>
                        <FaEdit size={20} color="#F97B3A" />
                    </button>
                    <button onClick={() => handleDeleteTask(selectedTask.id)} className="btn-finish-call">{t('home.detailService.btnEndCall')}</button>
                </>
            )
        }
        return (<h2>{t('home.detailService.titleUnselected')}</h2>)
    }

    const handleSelectTask = function (task: Tasks) {
        setSelectedTask(task);
    }
    
    const handleDeleteTask = async function (taskId: any) {
        try {
            await deleteTask(taskId);
            fetchData();
            setSelectedTask(null);
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error(t('home.toast.errorDeletingTask'));
        }
    }

    return (
        <>
            <Navbar />
            <ModalTask modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} onSuccess={fetchData}/>
            <ModalTask modalIsOpen={modalEditIsOpen} setModalIsOpen={setModalEditIsOpen} isEdit idTask={selectedTask?.id} defaultTitle={selectedTask?.title} defaultDescription={selectedTask?.description} onSuccess={fetchData}/>
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
