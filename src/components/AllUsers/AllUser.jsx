import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { apiFeatchUsersdata, deleteUserData } from '../../Reducx/UserSlice/UserSlice';
import { FaEyeSlash, FaEye } from "react-icons/fa";

function AllUser() {
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.users.users);

    const handleTogglePasswordVisibility = (userId) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

    useEffect(() => {
        dispatch(apiFeatchUsersdata());
    }, [dispatch]);

    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUserData(id));
        }
    };

    const handleEditUser = (id) => {
        localStorage.setItem("userid", id);
        if (window.confirm("Are you sure you want to edit this user?")) {
            navigate("/edituser");
        }
    };

    return (
        <div className="container mx-auto p-4 mt-5 ">
            <Link to={'/'} className="bg-green-600 p-5 rounded text-white">Back</Link>
            <h1 className="text-2xl font-bold mb-4 mt-5">User Table</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow rounded-3xl">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">User ID</th>
                            <th className="px-4 py-2 border">Username</th>
                            <th className="px-4 py-2 border">Phone Number</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Password</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.length > 0 ? (
                            userData.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-4 py-2 border">{user.id || 'N/A'}</td>
                                    <td className="px-4 py-2 border">{user.name || 'N/A'}</td>
                                    <td className="px-4 py-2 border">{user.number || 'N/A'}</td>
                                    <td className="px-4 py-2 border">{user.email || 'N/A'}</td>
                                    <td className="px-4 py-2 border flex items-center gap-4">
                                        <span className="d-inline-block w-[150px] ">{visiblePasswords[user.id] ? user.password : "****"}</span>
                                        <button onClick={() => handleTogglePasswordVisibility(user.id)} className="ml-2">
                                            {visiblePasswords[user.id] ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <button onClick={() => handleEditUser(user.id)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                                        <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4">No Users Available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllUser;
