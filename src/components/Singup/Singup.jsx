import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { addUser } from '../../Reducx/UserSlice/UserSlice';
import { toast, ToastContainer } from 'react-toastify';

function Signup() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // let singbtn = useRef();
    // console.log(singbtn);
    const handleForm = (e) => {
        e.preventDefault();


        e.preventDefault();
        console.log("username:", name, "useremail", email, "userpassword", password, "userphonenumber", number);


        if (name === "" || email === "" || number === "" || password === "") {
            toast.error("plz filled all the filled")
        }
        else {
            // navigate('/userlist');
            //rest form
            setName('');
            setEmail('');
            setPassword('');
            setNumber('');

        }

        let userId = nanoid();
        let userData = { id: userId, name, email, number, password };

        axios.post(`http://localhost:3000/Users`, userData)
            .then((res) => {
                dispatch(addUser(res.data));
                toast.success("Data Added Successfully");
            })
            .catch((err) => {
                console.error("Error adding user:", err);
                toast.error("Failed to add user.");
            });

        if (name === "" || number === "" || email === "" || password === "") {
            toast.error("Please Fill All The Fields");
            return;
        }



    };


    return (
        <>
            <ToastContainer />
            <div className="container mx-auto shadow rounded max-w-sm mt-5 p-5">
                <h1>Signup</h1>
                <form className="w-full mt-5" onSubmit={handleForm}>
                    <div className="input-filled">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">User Name:</label>
                        <input type="text" id="username" className="px-1 py-2 rounded w-full border border-gray-800 outline-none hover:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="input-filled mt-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">Phone Number:</label>
                        <input type="number" id="number" className="px-1 py-2 rounded w-full border border-gray-800 outline-none hover:border-blue-500" value={number} onChange={(e) => setNumber(e.target.value)} />
                    </div>

                    <div className="input-filled mt-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <input type="email" id="email" className="px-1 py-2 rounded w-full border border-gray-800 outline-none hover:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="input-filled mt-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                        <input type="password" id="password" className="px-1 py-2 rounded w-full border border-gray-800 outline-none hover:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="input-filled mt-5">
                        <button type="submit" className="px-[25px] py-[10px] bg-green-500 w-full text-white rounded cursor-pointer">Signup</button>
                    </div>
                    <p>Already Have a Account  <Link className='text-blue-500 font-stretch-90%' to={`/login`}>Login Now</Link> </p>
                </form>
            </div>
        </>

    );
}

export default Signup;
