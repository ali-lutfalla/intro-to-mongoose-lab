const mongoose = require("mongoose");
require("dotenv").config();

const prompt = require('prompt-sync')();

const customer = require('./models/customer.js');

const main = async () => {
  let input = '0';
    await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    while (input !== '5') {
      console.log("Welcome to the CRM\n\n");
      console.log("What would you like to do?\n\n \t1. Create a customer\n \t2. View all customers\n \t3. Update a customer\n \t4. Delete a customer\n \t5. quit \n\nNumber of action to run:");
      input = prompt();
      switch (input) {
        case '1': 
          await createCustomer();
          break;
        case '2':
          await findCustomers();
          break;
        case '3':
          await updateCustomer();
          break;
        case '4':
          await deleteCustomer();
          break;
        case '5':
          mongoose.connection.close();
          break;
        default:
          console.log('Please enter a valid choice!');
          console.log('------------------------------------------------------');
      }
    }
  }

const createCustomer = async () => {
  console.log('Enter the name of the customer: ');
  const name = prompt();
  console.log('Enter the age of the customer: ');
  const age = parseInt(prompt());


  const customerEntry = {
    name: `${name}`,
    age: age,
  };

  await customer.create(customerEntry);
};

const findCustomers = async () => {
  console.log('Below a list of customers: \n');
  const customers = customer.find({});
  (await customers).forEach((customer) => {
    console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
  });
};

const deleteCustomer = async () => {
  await findCustomers();
  console.log('Copy and paste the id of the customer you would like to delete here: ');
  const customerID = prompt();
  await customer.findByIdAndDelete(customerID);
};

const updateCustomer = async () => {
  await findCustomers();
  console.log('Copy and paste the id of the customer you would like to update here: ');
  const customerID = prompt();
  console.log('What is the customers new name?');
  const name = prompt();
  console.log('What is the customers new age?');
  const Newage = parseInt(prompt());
  
  await customer.findByIdAndUpdate(customerID,{name: `${name}`, age: `${Newage}`});
}
  
main();