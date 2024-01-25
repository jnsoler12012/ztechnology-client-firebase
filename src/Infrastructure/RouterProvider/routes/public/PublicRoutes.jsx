import React from 'react'
import PublicRouter from './PublicRouter'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login, Test } from '../../../../UI/Pages'

export default () => {
    return (
        <Routes>
            <Route element={<PublicRouter />}>
                <Route path="/*" element={<div>No esta la ruta</div>} />
                {//  <Route index path="/" element={<Navigate to="/app/dashboard" />}></Route>
                }
                <Route index path="/" element={<div>No esta la ruta</div>}></Route>
                <Route path='/login' element={<Login />} />
                <Route path='/tester' element={<Test />} />
            </Route>
        </Routes>

    )
}