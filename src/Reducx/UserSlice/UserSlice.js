import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const apiFeatchUsersdata = createAsyncThunk("feathdata", async () => {
    let res = await fetch(`http://localhost:3000/Users`);
    let data = await res.json();
    return data;

})
//  login user data
export const loginUserData = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        let res = await fetch(`http://localhost:3000/Users?email=${userData.email}&password=${userData.password}`);
        let data = await res.json();

        console.log("login user data ", data);

        const user = data.find((u) => u.email === userData.email || u.password === password);
        localStorage.setItem("user", JSON.stringify(user));

        if (!user) {
            return rejectWithValue("Email ID not registered!");
        }

        if (user.password !== userData.password) {
            return rejectWithValue("Password not match!");
        }
        console.log("your user is", user);

        return user;

    }
    catch (error) {
        return rejectWithValue(error.message);
    }


})

// delete user data
export const deleteUserData = createAsyncThunk("delete/user", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:3000/Users/${id}`).then((res) => {
            console.log(res.data);
            return id;
        })
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// edit user data
export const editUserData = createAsyncThunk("edit/user", async (data, { rejectWithValue }) => { });


// initial state
const initialState = {
    users: [],
    isLoading: false,
    error: null
};


export let UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // action type 
        addUser: (state, action) => {
            return {
                ...state, // copy this state
                users: [...state.users, action.payload]
            }
        },
        deleteUser: (state, action) => {
            return {
                ...state, // copy
                users: state.users.filter((value, index) => value.id !== action.payload)
            }
        },
        editUser: (state, action) => {
            return {
                ...state, // copy
                users: state.users.map((value, index) => {
                    if (value.id === action.payload.id) {
                        return action.payload;
                    }
                    return value;
                })
            }
        },
        fetchUserData: (state, action) => {
            state.users = action.payload
        }




    },
    extraReducers: (action) => {
        action.addCase(apiFeatchUsersdata.pending, (state, action) => {
            state.isLoading = true
        })
        action.addCase(apiFeatchUsersdata.fulfilled, (state, action) => {
            state.isLoading = false
            state.users = action.payload
        })
        action.addCase(apiFeatchUsersdata.rejected, (state, action) => {
            state.error = action.payload || action.error.message;
        })
        action.addCase(loginUserData.pending, (state, action) => {
            state.isLoading = true
        })
        action.addCase(loginUserData.fulfilled, (state, action) => {
            state.isLoading = false
            state.users = action.payload
        })
        action.addCase(loginUserData.rejected, (state, action) => {
            state.error = action.payload || action.error.message;
        })
        action.addCase(deleteUserData.pending, (state, action) => {
            state.isLoading = true
        })
        action.addCase(deleteUserData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = state.users.filter((value, index) => value.id !== action.payload)

        })

    }


});

export const { addUser, deleteUser, fetchUserData, editUser } = UserSlice.actions;
export default UserSlice.reducer;