import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { apiFeatchUsersdata, loginUserData } from '../../Reducx/UserSlice/UserSlice';
import { toast, ToastContainer } from 'react-toastify';

function Login() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const { user, loading, error } = useSelector(state => state.users);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        dispatch(apiFeatchUsersdata());
    }, [dispatch]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please Fill All The Fields");
            return;
        }

        try {
            const result = await dispatch(loginUserData({ email, password }));

            if (loginUserData.fulfilled.match(result)) {
                toast.success("Login Successful");
                navigate("/dasboard");
            }

            console.log("Login Result:", result);
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error("Failed to login.");
        }

    }


    return (
        <>
            <ToastContainer />
            <div className="container mx-auto shadow rounded max-w-sm mt-5 p-5">
                <h1>Login</h1>
                <form className="w-full mt-5" onSubmit={handleLogin}>

                    <div className="input-filled mt-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-1 py-2 rounded w-full border border-gray-800 outline-none hover:border-blue-500" />
                    </div>

                    <div className="input-filled mt-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-1 py-2 rounded w-full border border-gray-800 outline-none hover:border-blue-500" />
                    </div>

                    <div className="input-filled mt-5">
                        <button type="submit" className="px-[25px] py-[10px] bg-green-500 w-full text-white rounded cursor-pointer">
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <p> No Account <Link className='text-blue-500 font-stretch-90%' to={`/`}>Create Now</Link> </p>

                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
