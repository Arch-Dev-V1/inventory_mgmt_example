const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = require('../app');
const user = require('../models/users');
require('dotenv').config();

beforeAll(async () => {
    const dburi = process.env.MONGODB_URI;
    try {
        await mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true }); 
        expect(mongoose.connection.readyState).toBe(1);

    } catch(error) {
        console.error('Failed to connect to the database', error);
        throw error;
    }
}, 10000);

afterAll(async () => {
    try {
        await mongoose.disconnect();

    } catch(error) {
        console.error('Failed to disconnect the database', error);
    }
}, 12000);

describe('POST /login', () =>{
    it('should return 404 if user is not found', async() => {
        const response = await request(app)
        .post('/api/auth/login')
        .send({email: 'ashutoshbhatt92@gmail.com', password: '2222'});

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    it('should return 400 if credentials are invalid', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({ email: 'ashutoshbhatt992@gmail.com', password: 'wrongpassword' });
    
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid credentials');
      });

      it('should return a token and 200 status on successful login', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({ email: 'ashutoshbhatt992@gmail.com', password: '123456' });
    
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    
        // Optionally, verify the token
        const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);
        expect(decoded.userId).toBe(user._id);
        expect(decoded.role).toBe(user.role);
      });

      it('should return 500 if there is a server error', async () => {
        // Temporarily break the code to simulate a server error
        const originalFunction = user.findOne;
        user.findOne = jest.fn().mockRejectedValue(new Error('Server error'));
    
        const response = await request(app)
          .post('/api/auth/login')
          .send({ email: 'test@example.com', password: 'password123' });
    
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Server error');
    
        user.findOne = originalFunction; // Restore original function
      });
});