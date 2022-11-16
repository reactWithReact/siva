const { Schema } = require("mongoose");
const customerSchema = require("./customerSchema");

// Schema for the documents in the accounts collection

const managerSchema = new Schema(
  {
    managerId: Number,
    firstName: String,
    lastName: String,
    customerIds: [Number],
    customerData:[{
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
    }],
    // customerData: {
    //   type: [customerSchema],
    //   ref: "Customer",
    // },

    
    dashboardData:{
      attribution:{
        card:{
          Manufacturing:Number,
          'Speciality Products':Number,
          Corporate:Number,
          'Research & Development':Number
        },
        chart:{
          Manufacturing:{
            Q1:Number,
            Q2:Number,
            Q3:Number,
            Q4:Number
          },
          'Speciality Products':{
            Q1:Number,
            Q2:Number,
            Q3:Number,
            Q4:Number
          },
          Corporate:{
            Q1:Number,
            Q2:Number,
            Q3:Number,
            Q4:Number
          },
          'Research & Development':{
            Q1:Number,
            Q2:Number,
            Q3:Number,
            Q4:Number
          },
        }
      }
    }
  
  },
  // { collection: "accounts" }
);

module.exports = managerSchema;