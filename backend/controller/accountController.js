const Manager = require("../model/accountModel");

// function for handling the API logic and querying
// quering might move to another file as they get complex

// sending ONLY the customer data and dashboard data.
const getAccount = async (req, res) => {
  console.log("request for account");
  try {
    const  {dashboardData, customerData} = await Manager.findOne(
      { managerId: req.params.managerId },
    );
//  const {dashboardData, customerData} =manager
 
    res.send({dashboardData, customerData});
  } catch (error) {
    console.log(`error: ${error.message}`);
    res.send([]);
  }
};

module.exports = { getAccount };
