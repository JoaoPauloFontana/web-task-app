import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

import './style.css';
import useUserData from '../../context/User';
import { InputForm } from '../../components/InputForm';

export function Welcome() {
    const [username, setUsername] = useState('');
    const { setUserDataContext, user } = useUserData();

    const navigate = useNavigate();

    const { t } = useTranslation();

    const handleUsername = function (event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    const handleLogin = function () {
        if (username === '') {
            toast.warning('Verifique se você digitou seu nome, por favor.');
            return;
        }
        setUserDataContext({username});
    }

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    return (
        <div className="container-background-welcome">
            <div className="container-welcome">
                <h1 className='welcome-text'>Welcome</h1>
                <div className='container-form'>
                    <h1 className='title-form'>{t('login.titleForm')}</h1>
                    <div className='container-inputs'>
                        <InputForm type="text" placeholder={t('login.placeholderUserName')} onChange={handleUsername} />
                    </div>
                    <button onClick={handleLogin} className='submit-form'>
                        {t('login.btnConect')}
                    </button>
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
    );
}