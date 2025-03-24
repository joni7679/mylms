import React, { useEffect, useState } from 'react';

function UserDasboard() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let user = localStorage.getItem("user");

        if (user) {
            let parsedUser = JSON.parse(user);
            setUserData(parsedUser);
        }
    }, []);

    return (
        <>
            <h1>Welcome to your dashboard</h1>
            {userData ? (
                <h2>Hi dear, {userData.name}!</h2>
            ) : (
                <h2>No user found! Please login.</h2>
            )}
        </>
    );
}

export default UserDasboard;
