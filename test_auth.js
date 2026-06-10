import 'dotenv/config';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import CustomerModel from './backend/models/customers/auth.model.js';

async function test() {
  await mongoose.connect(process.env.MongoDbUrl);
  console.log("Connected to DB");
  
  const customer = await CustomerModel.findOne();
  if (!customer) {
    console.log("No customer found");
    process.exit(0);
  }
  
  console.log("Customer:", customer.email, customer._id);
  
  const tokenData = customer.toObject();
  tokenData.role = "Customer";
  
  const token = jwt.sign(tokenData, process.env.SecurityKey, { expiresIn: '7d' });
  console.log("Token:", token);
  
  const result = jwt.verify(token, process.env.SecurityKey);
  console.log("Verify Result:", result._id);
  
  process.exit(0);
}
test();
