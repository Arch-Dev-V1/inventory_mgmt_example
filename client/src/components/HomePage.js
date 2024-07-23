// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Inventory Management System
      </Typography>
      <Box sx={{ margin: 2 }}>
        <Button variant="contained" color="primary" component={Link} to="/products" sx={{ margin: 1 }}>
          View Products
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/create-product" sx={{ margin: 1 }}>
          Create Product
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
