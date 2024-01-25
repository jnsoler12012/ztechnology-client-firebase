import { Navigate, Outlet } from 'react-router-dom'
import { MainContext } from '../../../App'
import React, { useContext } from 'react'

export default () => {
    
    const [main] = useContext(MainContext)
    const { user } = main

    console.log("Public routerer", user)

    return (
        user.token === null ? <Outlet /> : <Navigate to='/app/dashboard' />
    )
}