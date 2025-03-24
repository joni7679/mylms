import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Edit() {
    const [stuData, SetStuData] = useState({});

    let userData = useSelector((state) => state.users.users);
    console.log(userData);

    let userId = localStorage.getItem("userid");
    console.log("your edit user id is", userId);


    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3000/Users/${userId}`).then((res) => {
                console.log("your edit data is", res.data);

            }).catch((error) => {
                console.log("error", error);

            })
        }

    }, [])

    return (
        <>
            <div className="flex w-full h-screen items-center justify-center">
                <form className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold text-center mb-6">Edit Data</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"


                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your name"

                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"


                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"

                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="number"
                            name="number"


                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your Phone Number"

                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"

                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"

                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Update
                    </button>
                </form>
            </div>


        </>
    )
}

export default Edit
