const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = require('../app');
const user = require('../models/users');
require('dotenv').config();

jest.mock('../models/users');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken')

describe('POST /login', () =>{
    it('should return 404 if user is not found', async() => {
        user.findOne.mockResolvedValue(null);

        const response = await request(app)
        .post('/api/auth/login')
        .send({email: 'ashutoshbhatt92@gmail.com', password: '2222'});

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    it('should return 400 if credentials are invalid', async () => {
      user.findOne.mockResolvedValue({
        resetPasswordToken: null,
        password: 'hashedpassword'
    });

        const response = await request(app)
          .post('/api/auth/login')
          .send({ email: 'ashutoshbhatt992@gmail.com', password: 'wrongpassword' });
    
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid credentials');
      });

      it('should return a token and 200 status on successful login', async () => {
        user.findOne.mockResolvedValue({
          _id: 'userId',
          role: 'user',
          resetPasswordToken: null,
          password: 'hashedpassword'
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fake-jwt-token');

        const response = await request(app)
          .post('/api/auth/login')
          .send({ email: 'ashutoshbhatt992@gmail.com', password: '123456' });
    
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();

        expect(response.body.token).toBe('fake-jwt-token');
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