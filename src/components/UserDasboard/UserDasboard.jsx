import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserDasboard() {
    const [userData, setUserData] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        let user = localStorage.getItem("user");

        if (user) {
            let parsedUser = JSON.parse(user);
            setUserData(parsedUser);
        }
    }, []);
    // log out function
    const handleLogout = () => {
        let confim = window.confirm("Are you sure you want to log out?");
        if (confim) {
            localStorage.removeItem("user");
            setUserData(null);
        }

    }

    return (
        <>

            <div className='w-full p-5 bg-orange-600 text-white flex justify-between items-center'>
                {userData ? (
                    <h2>Welcome to your dashboard, {userData.name}!</h2>
                ) : (
                    navigate('/')
                )}

                <button onClick={handleLogout} className='px-[25px] py-[10px] rounded-2xl bg-blue-400 text-white '>Log Out</button>
            </div>

        </ >
    );
}

export default UserDasboard;
