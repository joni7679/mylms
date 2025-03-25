import React, { useEffect } from 'react'
import Singup from './components/Singup/Singup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { fetchUserData } from './Reducx/UserSlice/UserSlice'

function App() {
  let dispatch = useDispatch()
  useEffect(() => {
    axios.get("http://localhost:3000/Users").then((res) => {
      console.log(res.data);
      dispatch(fetchUserData(res.data))
    })
  })


  return (
    <>
      <main className='  w-full h-screen'>
        <Singup />

      </main>

    </>
  )
}

export default App
