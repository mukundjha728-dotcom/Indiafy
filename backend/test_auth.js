import 'dotenv/config';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import CustomerModel from './models/customers/auth.model.js';
import { databaseConfig } from './config/db.config.js';

async function test() {
  await databaseConfig();
  
  const customer = await CustomerModel.findOne();
  if (!customer) {
    console.log("No customer found");
    process.exit(0);
  }
  
  console.log("Customer:", customer.email, customer._id);
  
  const tokenData = customer.toObject();
  tokenData.role = "Customer";
  
  const payload = {
      _id: tokenData._id,
      role: tokenData.role,
      email: tokenData.email,
  };

  const securityKey = process.env.SecurityKey || "indiafy_default_development_secret_key_987654321";
  
  const token = jwt.sign(payload, securityKey, { expiresIn: '7d' });
  console.log("Token:", token);
  
  const result = jwt.verify(token, securityKey);
  console.log("Verify Result:", result._id);
  
  // Now simulate middleware
  // Suppose token is passed correctly
  const decoded = jwt.verify(token, securityKey);
  console.log("Decoded role:", decoded.role);
  console.log("Decoded id type:", typeof decoded._id);
  
  const fetchedCustomer = await CustomerModel.findById(decoded._id).select("-password");
  console.log("Fetched customer by ID:", fetchedCustomer ? "Found" : "Not Found");
  
  process.exit(0);
}
test();
