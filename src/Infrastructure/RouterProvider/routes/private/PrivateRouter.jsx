import { Navigate, Outlet } from 'react-router-dom'
import { MainContext } from '../../../App'
import React, { useContext, useEffect } from 'react'
import { checkTokenExpires, logOut } from '../../../utils'

export default () => {

    const [main, setMainContext] = useContext(MainContext)
    const { user } = main

    console.log(user.token);


    const statusExpToken = checkTokenExpires(user.token)

    const checkExpireSession = () => {
        if (!statusExpToken) {
            console.log("SALIKMOS PORQUE TOKEN EXPIRO");
            logOut(setMainContext, 'Expire')
        }
    }

    useEffect(() => {
        setInterval(() => {
            if ((statusExpToken != 'No token' && user.token !== null && !window.location.pathname.includes("/public")) === true) {
                checkExpireSession()
            }
        }, 3660000)

        return () => {
            
        }
    }, [main])


    if (statusExpToken != 'No token' && user.token !== null && !window.location.pathname.includes("/public") === true) {
        checkExpireSession()
    }


    return (
        user.token !== null ? <Outlet /> : <Navigate to='/public/login' />
    )
}