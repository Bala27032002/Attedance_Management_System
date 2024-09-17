import { Avatar, Chip, Grid, Typography, Button, Box, Modal, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddNewUser from '../AdminRegister/AddNewUser';
import VisibilityIcon from '@mui/icons-material/Visibility';

function EmployeeCard({ employee, isFirst ,onViewDetails}) {
  const generateAvatar = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  // Function to limit name to two words
  const getLimitedName = (name) => {
    const words = name.split(' ');
    return isFirst && words.length > 2 ? words.slice(0, 2).join(' ') : name;
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(); // Formats the date
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{
        // padding: '1.5rem',


      }}
    >
      <Box
        sx={{
          background: isFirst ? '#F5F5F5' : '#F5F5F5', // Special background for first box
          padding: '1.5rem',
          maxWidth: '100%',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'flex-start',
          // justifyContent: 'space-between',
        }}
      >
        {/* Flex container for Avatar and Name */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

            width: '100%',
            marginBottom: '1rem', // Space below the name
          }}
        >
          {/* Avatar */}
          <Avatar sx={{ width: 56, height: 56 }}>
            {generateAvatar(employee.name)}
          </Avatar>

          {/* Name and Title */}
          <Box sx={{ marginLeft: '1rem' }}> {/* Adjusts space between avatar and name */}
            <Tooltip title={employee.name} arrow>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {getLimitedName(employee.name) || 'N/A'}
              </Typography>
            </Tooltip>
            <Typography variant="body2" color="textSecondary">
              {employee.title || 'No Title'}
            </Typography>
          </Box>
        </Box>

        {/* Employee details */}
        <Box sx={{ marginTop: '0.5rem', width: '100%' }}>
          <Chip label={employee.title || 'No Title'} color="primary" />
          <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
            <strong>Emp code:</strong> {employee.empCode || 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Joining Date:</strong> {formatDate(employee.joiningDate)}
          </Typography>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'end', cursor: 'pointer',color:'#0B1A46' }} onClick={onViewDetails}>
          <VisibilityIcon />
        </div>

      </Box>
    </Grid>
  );
}





function EmployeeGrid() {
  const [employees, setEmployees] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add Employee modal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State for Details modal
  const [selectedEmployee, setSelectedEmployee] = useState(null); 


  useEffect(() => {
    // Fetch employee data from the API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/signup');
        // Map the API response to your required structure
        const fetchedEmployees = response.data.map((employee) => ({
          name: employee.Name,
          empCode: employee.employeeId,
          title: employee.role,
          joiningDate: employee.joiningDate,
        }));
        console.log(response.data);
        
        setEmployees(fetchedEmployees);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Handlers for Details Modal
  const openDetailsModal = (employee) => {
    setSelectedEmployee(employee); // Set the clicked employee details
    setIsDetailsModalOpen(true);
  };
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedEmployee(null); // Clear the selected employee when closing modal
  };

  return (
    <Box sx={{ padding: '1rem' }}>
      <Grid container alignItems="center" justifyContent="space-between" spacing={2} sx={{ marginBottom: '1rem' }}>
 
        <Grid item>
       
        </Grid>

        {/* Right side: Add Employee button */}
        <Grid item>
          <Button variant="contained" color="primary" onClick={openAddModal}>
            Add Employee
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {employees.map((employee, index) => (
 <EmployeeCard
 employee={employee}
 key={index}
 isFirst={index === 0}
 onViewDetails={() => openDetailsModal(employee)}
/>        ))}
      </Grid>

      {/* Modal for Add New Employee */}
      <Modal
        open={isAddModalOpen}
        onClose={closeAddModal}
        aria-labelledby="add-employee-modal"
        aria-describedby="add-employee-modal-description"
        BackdropProps={{
          onClick: closeAddModal, // Close modal when clicking the backdrop
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflowY: 'auto',
            maxHeight: '100vh',
            padding: '1rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            outline: 'none',
          }}
        >
          <AddNewUser closeModal={closeAddModal} />
        </div>
      </Modal>

      {/* Modal for Viewing Employee Details */}
      <Modal
        open={isDetailsModalOpen}
        onClose={closeDetailsModal}
        aria-labelledby="view-employee-details-modal"
        aria-describedby="view-employee-details-modal-description"
        BackdropProps={{
          onClick: closeDetailsModal, // Close modal when clicking the backdrop
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            overflowY: 'auto',
            maxHeight: '100vh',
            padding: '2rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            outline: 'none',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          {selectedEmployee && (
            <>
              <Typography variant="h6">{selectedEmployee.name}</Typography>
              <Typography variant="body1">
                <strong>Employee Code:</strong> {selectedEmployee.empCode}
              </Typography>
              <Typography variant="body1">
                <strong>Role:</strong> {selectedEmployee.title}
              </Typography>
              <Typography variant="body1">
                <strong>Joining Date:</strong> {selectedEmployee.joiningDate}
              </Typography>
              {/* Add any other fields you want to display in the details */}
            </>
          )}
          <Button variant="contained" color="primary" onClick={closeDetailsModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </div>
      </Modal>
    </Box>
  );
}

export default EmployeeGrid;