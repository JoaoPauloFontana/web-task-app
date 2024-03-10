import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import './styles.css';

import useUserData from '../../context/User';

export function Navbar() {
    const {user, setUserDataContext} = useUserData();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = function () {
        setUserDataContext(null);
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <div className="container-navbar">
                <h1 className='nav-user-name'>{user?.username}</h1>
                <button className="nav-logout" onClick={handleLogout}>
                    {t('navbar.logout')}
                    <MdLogout size={20} color="#FFF" />
                </button>
            </div>
        </nav>
    );
}