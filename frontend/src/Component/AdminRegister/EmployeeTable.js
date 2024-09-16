import React, { useEffect, useState } from 'react';
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const EmployeeTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch employee data from the API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/signup');
        // Map the API response to your required structure
        const fetchedEmployees = response.data.map((employee) => ({
          name: employee.Name,
          employeeId: employee.employeeId,  
          role: employee.role,  
          joiningDate: employee.joiningDate,  
          permissions: employee.permissions,  
        }));
        console.log(response)
        setTableData(fetchedEmployees);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Grid style={{ minHeight: '100vh', marginTop: '3rem' }}>
      <TableContainer style={{ marginTop: '1%' }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow
              sx={{
                borderBottom: 'solid #2F70CB 2px',
                background: 'white',
                height: '3rem',
              }}
            >
              {['S.No.', 'Name', 'Role', 'Employee Id', 'Date of Joining', 'ACTIONS'].map((heading) => (
                <TableCell key={heading} align="center" style={{ color: '#1D1929' }}>
                  <Typography
                    className="text-15-500-22-Poppins"
                    style={{
                      minWidth: '100px',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    {heading}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index} style={{ height: 'auto' }}>
                {/* S.No */}
                <TableCell align="center">
                  <Typography
                    className="text-24-600-29-Inter"
                    style={{
                      color: '#0086EE',
                      minWidth: '50px',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    {index + 1}
                  </Typography>
                </TableCell>
                {/* Name */}
                <TableCell align="center">
                  <Typography
                    className="text-24-600-29-Inter"
                    style={{
                      color: '#4BA97E',
                      minWidth: '50px',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    {item.name}
                  </Typography>
                </TableCell>
                {/* Role */}
                <TableCell align="center">
                  <Typography
                    className="text-24-600-29-Inter"
                    style={{
                      color: '#C6851A',
                      minWidth: '50px',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    {item.role}
                  </Typography>
                </TableCell>
                {/* Employee ID */}
                <TableCell align="center">
                  <Typography
                    className="text-24-600-29-Inter"
                    style={{
                      color: '#DC5B51',
                      minWidth: '50px',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    {item.employeeId}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    className="text-24-600-29-Inter"
                    style={{
                      color: '#6D28D9', // Choose a color that fits your theme
                      minWidth: '50px',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                   {item.permissions.admin && 'Admin'}
                    {item.permissions.employee && (item.permissions.admin ? ', ' : '')} {/* Add a comma if both permissions are true */}
                    {item.permissions.employee && 'Employee'}
                  </Typography>
                </TableCell>
                {/* Date of Joining */}
                <TableCell align="center">
                  <Typography
                    className="text-24-600-29-Inter"
                    style={{
                      color: '#9558CA',
                      minWidth: '50px',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    {new Date(item.joiningDate).toLocaleDateString()} {/* Display date in a readable format */}
                  </Typography>
                </TableCell>
                {/* Edit and Delete Icons */}
                <TableCell align="center">
                  <IconButton aria-label="edit" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default EmployeeTable;
