import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { apiFeatchUsersdata, deleteUser, editUser } from '../../Reducx/UserSlice/UserSlice';

function AllUser() {
    let navigate = useNavigate();
    let dispatch = useDispatch()
    let userData = useSelector((state) => state.users.users);
    console.log(userData);

    useEffect(() => {
        dispatch(apiFeatchUsersdata())
    }, [])

    // handel del data
    const delData = (id) => {
        console.log("user id is", id);
        let confirm = window.confirm("Are You Sure Went To Del This Data");
        if (confirm) {
            dispatch(deleteUser(id));
           
        }

    }
    // edit data
    const EditData = (id) => {
        let saveUserId = window.localStorage.setItem("userid", id);
        console.log(saveUserId);
        console.log("your choose usrs id is", id);

        let edit = window.confirm("Are U Went to sure this Edit This Data");
        if (edit) {
            navigate("/edituser")

        }

    }

    return (
        <>
            <h1>all users data</h1>
            <div className="container mx-auto p-4 mt-5">
                <Link to={'/'} className='bg-green-600 p-5 rounded text-white mt-5'>Back</Link>
                <h1 className="text-2xl font-bold mb-4 mt-5">User Table</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">user id</th>
                                <th className="px-4 py-2 border">Username</th>
                                <th className="px-4 py-2 border">Phone Number</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Password</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.length > 0 ? (
                                userData.map((user, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border">{user.id}</td>
                                        <td className="px-4 py-2 border">{user.name}</td>
                                        <td className="px-4 py-2 border">{user.number}</td>
                                        <td className="px-4 py-2 border">{user.email}</td>
                                        <td className="px-4 py-2 border">{user.password}</td>
                                        <td className="px-4 py-2 border">
                                            <button onClick={() => EditData(user.id)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                                Edit
                                            </button>
                                            <button onClick={() => delData(user.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No Users Available
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}

export default AllUser
