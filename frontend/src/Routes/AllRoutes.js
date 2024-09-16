import React from 'react';
import { Route, Routes } from 'react-router';
import Login from '../Component/Login/Login.jsx';
import Dashboard from '../Pages/Dashboard.jsx';
import PrivateRoute from '../DatabaseConfig/PrivateRoute.js';
import Employee from '../Component/Employee/Employee.jsx';
import EmployeeTable from '../Component/AdminRegister/EmployeeTable.js';

function AllRoutes(){
    const routes=[
        // {path :'/',element : <Login /> },
        {path :'/dashboard',element : <Dashboard /> },
        {path :'/settings',element : <EmployeeTable /> },
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