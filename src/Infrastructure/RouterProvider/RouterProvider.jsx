import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from '../../UI/Pages'
import { PrivateRoutes } from './routes/private'
import { PublicRoutes } from './routes/public'
import { MainContext } from '../App'
import { AxiosContext } from '../AxiosProvider'

import '../utils/ensure-basename';

import { LoadingScreen } from '../../UI/Components/Loading'
import { NotificationDropdown } from '../../UI/Components/Dropdowns'


export default function ({ config }) {
    const [mainContext, setMainContext] = useContext(MainContext)
    const axiosContext = useContext(AxiosContext)
    //console.log("asddasdsadsa", setMainContext, mainContext, axiosContext)

    useEffect(() => {
        if (!mainContext.services) {
            setMainContext((prevState) => ({
                ...prevState,
                services: {
                    axios: axiosContext
                }
            }))
        }

        return () => {

        }
    }, [])


    return (
        <LoadingScreen loading={mainContext.loading}>
            <BrowserRouter basename={config.basename}>
                <NotificationDropdown mainState={mainContext} setMainState={setMainContext}>
                    <Routes>
                        <Route path="/*" element={<Navigate to="/app/dashboard" />} />
                        <Route index path="/" element={<Navigate to="/app/dashboard" />}></Route>

                        <Route path='/app/*' element={<PrivateRoutes />} />

                        <Route path='/public/*' element={<PublicRoutes />} />

                    </Routes>
                </NotificationDropdown>

            </BrowserRouter>
        </LoadingScreen>)
}
