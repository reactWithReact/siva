const { Schema } = require("mongoose");

// schema for the subcollection of the mangers collection
const customerSchema = new Schema({
  customerId: Number,
  firstName: String,
  lastName: String,
  birthDate: Date,
  gender: String,
  picture: String,
  businessUnit: String,
  churnRisk: Number,
  openSales: Number,
  revenueYTD: Number,
  costYTD: Number,
  bonusEligible: String,
  meetingsYTD: Number,
});

module.exports = customerSchema;
