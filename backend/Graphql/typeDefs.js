const typeDefs = `#graphql
 
  type customerData {
   customerId:Int
   firstName:String
   lastName:String
   birthDate:String
   gender:String
   picture:String
   businessUnit:String
   churnRisk:String
   openSales:String
   revenueYTD:Int
   costYTD:Int
   bonusEligible:String
   meetingsYTD:Int
  }

  
  type Query {
    managerData(managerId:Int):[customerData]
    superManagerData:[customerData]
  }
`;


module.exports = typeDefs;