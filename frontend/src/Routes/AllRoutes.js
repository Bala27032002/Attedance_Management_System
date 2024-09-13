import React from 'react';
import { Route, Routes } from 'react-router';
import Login from '../Component/Login/Login.jsx';
import Navbar from '../Component/Navbar/Navbar.jsx';
import Dashboard from '../Pages/Dashboard.jsx';
import PrivateRoute from '../DatabaseConfig/PrivateRoute.js';
import AddNewUser from '../Component/AdminRegister/AddNewUser.jsx';
import Employee from '../Component/Employee/Employee.jsx';
import Demo_Register from '../Component/AdminRegister/Demo_Register.js';

function AllRoutes(){
    const routes=[
        // {path :'/',element : <Login /> },
        {path :'/dashboard',element : <Dashboard /> },
        {path :'/settings',element : <AddNewUser /> },
        {path :'/employee',element : <Employee /> },
    ]
    return( 
        <Routes>
            {routes.map((route)=>(
            <Route key={route.path} 
            path={route.path}
             element={<PrivateRoute>{route.element}</PrivateRoute>}/>
        ))}
        <Route path="/" element={<Login />} />
        </Routes>
    )
}
export default AllRoutes;