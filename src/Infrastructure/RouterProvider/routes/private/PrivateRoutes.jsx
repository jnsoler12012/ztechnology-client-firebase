import React, { useContext } from 'react'
import PrivateRouter from './PrivateRouter'
import { Customer, Dashboard, Product, Quote, SettingsUser, SystemUsers, Test } from '../../../../UI/Pages'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Sidebar } from '../../../../UI/Components/Sidebar'
import { MainContext } from '../../..'
import { UserNavbar } from '../../../../UI/Components/Navbars'

export default () => {
    const [mainContext, setMainContext] = useContext(MainContext)

    const { user } = mainContext
    console.log(mainContext)


    return (
        <>
            <Sidebar user={user} setMainContext={setMainContext} />
            <div className="relative md:ml-64 bg-blueGray-100">
                <UserNavbar user={user} setMainContext={setMainContext} />
                <>
                    <div className="relative bg-[#60a5fa] md:pt-32 pb-32 pt-12" />
                </>
                <div className="relative top-[-8rem] px-2 lg:px-[1rem] mx-auto w-full">
                    <Routes>
                        <Route element={<PrivateRouter />}>
                            <Route path="/*" element={<div>No esta la ruta</div>} />
                            {//  <Route index path="/" element={<Navigate to="/app/dashboard" />}></Route>
                            }
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/user-settings' element={<SettingsUser />} />
                            <Route path='/system-users' element={<SystemUsers />} />
                            <Route path='/customers' element={<Customer />} />
                            <Route path='/products' element={<Product />} />
                            <Route path='/quotes' element={<Quote />} />
                            <Route path='/tester' element={<Test />} />
                        </Route>
                    </Routes>
                </div>

            </div>

        </>


    )
}