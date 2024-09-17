import React, { useEffect, useState } from 'react';
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import UpdateEmployeeForm from './UpdateEmployeeForm'; // Your modal form component

const EmployeeTable = () => {
  const [tableData, setTableData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    // Fetch employee data from the API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/employees');
        setTableData(response.data); // Assuming response.data contains an array of employees
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEditClick = async (id) => {
    try {
      // Fetch employee data by ID
      const response = await axios.get(`http://localhost:8000/auth/employees/${id}`);
      setSelectedEmployee(response.data); // Assuming response.data contains employee details
      setOpenEdit(true); // Open the edit modal
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      // Update the employee data in the backend
      await axios.put(`http://localhost:8000/auth/employees/${id}`, updatedData);

      // Update the employee data in the frontend
      setTableData((prevData) =>
        prevData.map((employee) =>
          employee.id === id ? { ...employee, ...updatedData } : employee
        )
      );
      setOpenEdit(false); // Close the modal after update
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const handleConfirmDelete = async () => {
    try {
      // Construct the correct URL for the DELETE request
      const url = `http://localhost:8000/auth/employees/${employeeToDelete}`;
      
      // Delete the employee data from the backend
      await axios.delete(url);
  
      // Remove the deleted employee from the frontend
      setTableData((prevData) => prevData.filter((employee) => employee.id !== employeeToDelete));
      
      // Close the confirmation dialog
      setOpenDeleteDialog(false);
      setEmployeeToDelete(null);
    } catch (error) {
      console.error('Error deleting employee data:', error);
    }
  };
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false); // Close the confirmation dialog without deleting
    setEmployeeToDelete(null);
  };  

 
  return (
    <Grid style={{ minHeight: '100vh', marginTop: '3rem' }}>
      <TableContainer style={{ marginTop: '1%' }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ borderBottom: 'solid #2F70CB 2px', background: 'white', height: '3rem' }}>
              {['S.No.', 'Name', 'Email', 'Role', 'Employee Id', 'Permissions', 'Date of Joining', 'ACTIONS'].map((heading) => (
                <TableCell key={heading} align="center" style={{ color: '#1D1929' }}>
                  <Typography className="text-15-500-22-Poppins" style={{ minWidth: '100px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {heading}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item, index) => (
              <TableRow key={index} style={{ height: 'auto' }}>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#0086EE', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#4BA97E', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {item.Name}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#4BA97E', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {item.email_id}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#C6851A', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {item.role}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#DC5B51', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {item.employeeId}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#6D28D9', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {item.permissions.admin ? 'Admin' : ''}{item.permissions.employee ? 'Employee' : ''}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-24-600-29-Inter" style={{ color: '#9558CA', minWidth: '50px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {new Date(item.joiningDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit" color="primary" onClick={() => handleEditClick(item.id)}> {/* Use correct id */}
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="secondary" onClick={() => handleDeleteClick(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Employee Form Modal */}
      {selectedEmployee && (
        <UpdateEmployeeForm
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          employeeData={selectedEmployee}
          onUpdate={handleUpdate}
        />
      )}

        {/* Delete Confirmation Dialog */}
        <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this employee?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default EmployeeTable;
