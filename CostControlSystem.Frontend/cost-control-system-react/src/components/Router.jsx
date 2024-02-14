import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom'

import PrivateRoute from 'components/PrivateRoute'

import AuthLayout from 'layouts/AuthLayout'
import MainLayout from 'layouts/MainLayout'

import Login from 'pages/Login'
import Register from 'pages/Register'
import Categories from 'pages/Categories'
import History from 'pages/History'
import Plans from 'pages/Plans'
import Plan from 'pages/Plan'

export default function TheRouter() {
    return(
        <Routes>
            <Route path='/login'
                element={<AuthLayout><Login /></AuthLayout>}    
            />
            <Route path='/register'
                element={<AuthLayout><Register /></AuthLayout>}    
            />
            <Route path='/categories'
                element={
                    <PrivateRoute>
                        <MainLayout><Categories /></MainLayout>
                    </PrivateRoute>
                }    
            />
            <Route path='/records'
                element={
                    <PrivateRoute>
                        <MainLayout><History /></MainLayout>
                    </PrivateRoute>
                }    
            />
            <Route path='/plans'
                element={
                    <PrivateRoute>
                        <MainLayout><Plans /></MainLayout>
                    </PrivateRoute>
                }    
            />
            <Route path='/plans/:id'
                element={
                    <PrivateRoute>
                        <MainLayout><Plan /></MainLayout>
                    </PrivateRoute>
                }    
            />
            <Route path='*'
                element={<Navigate to='/records' replace />}
            />
        </Routes>
    )
}