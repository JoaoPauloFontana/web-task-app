import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import useUserData from "../../context/User";

export function Home() {
    const navigate = useNavigate();
    const { user } = useUserData();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, []);

    return <h1>Home</h1>
}