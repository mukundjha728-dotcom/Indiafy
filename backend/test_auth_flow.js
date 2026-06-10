import 'dotenv/config';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import express from 'express';
import request from 'supertest';
import app from './app.js';
import CustomerModel from './models/customers/auth.model.js';
import { databaseConfig } from './config/db.config.js';

async function test() {
  await databaseConfig();
  
  const customer = await CustomerModel.findOne();
  if (!customer) {
    console.log("No customer found");
    process.exit(0);
  }
  
  const tokenData = customer.toObject();
  tokenData.role = "Customer";
  
  const securityKey = process.env.SecurityKey || "indiafy_default_development_secret_key_987654321";
  
  const payload = {
      _id: tokenData._id,
      role: tokenData.role,
      email: tokenData.email,
  };

  const token = jwt.sign(payload, securityKey, { expiresIn: '7d' });
  
  console.log("Testing GET /api/v1/indiafy/customer/auth/me");
  
  const res = await request(app)
    .get('/api/v1/indiafy/customer/auth/me')
    .set('Authorization', `Bearer ${token}`);
    
  console.log("Status:", res.status);
  console.log("Body:", res.body);
  
  process.exit(0);
}
test();
