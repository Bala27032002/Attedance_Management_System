import { Avatar, Chip, Grid, Typography, Button, TextField, Box, Modal, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import AddNewUser from '../AdminRegister/AddNewUser';
// Example employee data array
const employees = [
    {
      name: 'Toni Kroos',
      title: 'Product Designer',
      empCode: '34343',
      joiningDate: '01/01/2020',
      avatar: '/static/images/avatar/1.jpg',
    },
    {
      name: 'Luka Modric',
      title: 'Software Engineer',
      empCode: '34344',
      joiningDate: '02/01/2020',
      avatar: '/static/images/avatar/2.jpg',
    },
    {
      name: 'Sergio Ramos',
      title: 'UI/UX Designer',
      empCode: '34345',
      joiningDate: '03/01/2020',
      avatar: '/static/images/avatar/3.jpg',
    },
    {
      name: 'Karim Benzema',
      title: 'Backend Developer',
      empCode: '34346',
      joiningDate: '04/01/2020',
      avatar: '/static/images/avatar/4.jpg',
    },
    {
      name: 'Cristiano Ronaldo',
      title: 'Frontend Developer',
      empCode: '34347',
      joiningDate: '05/01/2020',
      avatar: '/static/images/avatar/5.jpg',
    },
    {
      name: 'Gareth Bale',
      title: 'Data Scientist',
      empCode: '34348',
      joiningDate: '06/01/2020',
      avatar: '/static/images/avatar/6.jpg',
    },
    {
      name: 'Marcelo Vieira',
      title: 'QA Engineer',
      empCode: '34349',
      joiningDate: '07/01/2020',
      avatar: '/static/images/avatar/7.jpg',
    },
    {
      name: 'Isco Alarcon',
      title: 'DevOps Engineer',
      empCode: '34350',
      joiningDate: '08/01/2020',
      avatar: '/static/images/avatar/8.jpg',
    },
    {
      name: 'Thibaut Courtois',
      title: 'Project Manager',
      empCode: '34351',
      joiningDate: '09/01/2020',
      avatar: '/static/images/avatar/9.jpg',
    },
    {
      name: 'Casemiro',
      title: 'HR Specialist',
      empCode: '34352',
      joiningDate: '10/01/2020',
      avatar: '/static/images/avatar/10.jpg',
    },
    {
      name: 'Vinicius Junior',
      title: 'Product Manager',
      empCode: '34353',
      joiningDate: '11/01/2020',
      avatar: '/static/images/avatar/11.jpg',
    },
    {
      name: 'Rodrygo Goes',
      title: 'Graphic Designer',
      empCode: '34354',
      joiningDate: '12/01/2020',
      avatar: '/static/images/avatar/12.jpg',
    },
    {
      name: 'Eden Hazard',
      title: 'Content Writer',
      empCode: '34355',
      joiningDate: '01/02/2020',
      avatar: '/static/images/avatar/13.jpg',
    },
    {
      name: 'Raphael Varane',
      title: 'SEO Specialist',
      empCode: '34356',
      joiningDate: '02/02/2020',
      avatar: '/static/images/avatar/14.jpg',
    },
    {
      name: 'James Rodriguez',
      title: 'Social Media Manager',
      empCode: '34357',
      joiningDate: '03/02/2020',
      avatar: '/static/images/avatar/15.jpg',
    },
    {
      name: 'Keylor Navas',
      title: 'Cloud Engineer',
      empCode: '34358',
      joiningDate: '04/02/2020',
      avatar: '/static/images/avatar/16.jpg',
    },
    {
      name: 'Alvaro Morata',
      title: 'Database Administrator',
      empCode: '34359',
      joiningDate: '05/02/2020',
      avatar: '/static/images/avatar/17.jpg',
    },
    {
      name: 'Nacho Fernandez',
      title: 'Network Engineer',
      empCode: '34360',
      joiningDate: '06/02/2020',
      avatar: '/static/images/avatar/18.jpg',
    },
    {
      name: 'Dani Carvajal',
      title: 'Business Analyst',
      empCode: '34361',
      joiningDate: '07/02/2020',
      avatar: '/static/images/avatar/19.jpg',
    },
    {
      name: 'Lucas Vazquez',
      title: 'Scrum Master',
      empCode: '34362',
      joiningDate: '08/02/2020',
      avatar: '/static/images/avatar/20.jpg',
    },
  ];
  

  function EmployeeCard({ employee }) {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Box
          sx={{
            background: '#F5F5F5',
            padding: '1.5rem',
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            overflow: 'hidden', // Ensure no overflow
          }}
        >
          <Grid container alignItems="center" spacing={1.5}>
            <Grid item>
              <Avatar alt={employee.name} src={employee.avatar} sx={{ width: 56, height: 56 }} />
            </Grid>
            <Grid item xs>
              <Tooltip title={employee.name} arrow>
                <Typography variant="h6" noWrap>
                  {employee.name}
                </Typography>
              </Tooltip>
              <Typography variant="body2" color="textSecondary">
                {employee.title}
              </Typography>
            </Grid>
          </Grid>
  
          <Grid container direction="column" alignItems="flex-start" spacing={1} sx={{ marginTop: '1rem', width: '100%' }}>
            <Grid item>
              <Chip label={employee.title.split(' ')[0]} color="primary" />
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <strong>Emp code:</strong> {employee.empCode}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <strong>Joining Date:</strong> {employee.joiningDate}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    );
  }
  
  function EmployeeGrid() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <Box sx={{ padding: '1rem' }}>
        <Grid container alignItems="center" justifyContent="space-between" spacing={2} sx={{ marginBottom: '1rem' }}>
          {/* Left side: Search bar and filter */}
          <Grid item>
            {/* Search and Filter Section */}
          </Grid>
  
          {/* Right side: Add Employee button */}
          <Grid item>
            <Button variant="contained" color="primary" onClick={openModal}>
              Add Employee
            </Button>
          </Grid>
        </Grid>
  
        <Grid container spacing={2}>
          {employees.map((employee, index) => (
            <EmployeeCard employee={employee} key={index} />
          ))}
        </Grid>
  
        {/* Modal for Add New Employee */}
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="add-employee-modal"
          aria-describedby="add-employee-modal-description"
          BackdropProps={{
            onClick: closeModal, // Close modal when clicking the backdrop
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
            <AddNewUser />
          </div>
        </Modal>
      </Box>
    );
  }
  
  export default EmployeeGrid;  