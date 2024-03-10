import { InputForm } from '../../components/InputForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import HashLoader from 'react-spinners/HashLoader';

import './style.css';
import { useState } from 'react';

export function Welcome() {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');

    const { t } = useTranslation();

    const handleUsername = function (event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    const handleLogin = function () {
        if (username === '') {
            toast.warning('Verifique se você digitou seu nome, por favor.');
            return;
        }
        setIsLoading(true);
    }

    return (
        <div className="container-background-welcome">
            <div className="container-welcome">
                <h1>Welcome</h1>
                <div className='container-form'>
                    <h1 className='title-form'>{t('login.titleForm')}</h1>
                    <div className='container-inputs'>
                        <InputForm type="text" placeholder={t('login.placeholderUserName')} onChange={handleUsername} />
                    </div>
                    <button onClick={handleLogin} className='submit-form'>
                        {!isLoading ? t('login.btnConect') :
                            <HashLoader loading={true} color='#fff' size={20} />}
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