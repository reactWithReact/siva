export const chartTypeData =  ['Apex chart','D3 chart'];

export const unWantedKeys = ['color','total','name']

export const xAxisData = ['Q1', 'Q2', 'Q3', 'Q4'];

export const BASE_URL_GRAPHQL= 'http://localhost:3001/graphql';

export const BASE_URL_RESTAPI = "http://localhost:3001/api/manager";

export const QUERY_MANAGER = (managerId)=>( {
    query: `query{
        managerData(managerId:${managerId}){
            customerId
            firstName
            lastName
            birthDate
            gender
            picture
            businessUnit
            churnRisk
            openSales
            revenueYTD
            costYTD
            bonusEligible
            meetingsYTD
    }
  }`,
    variables: {}
  }
);

  export const QUERY_SUPERMANGERS = ()=>({
    query: `query{
        superManagerData{
            customerId
            firstName
            lastName
            birthDate
            gender
            picture
            businessUnit
            churnRisk
            openSales
            revenueYTD
            costYTD
            bonusEligible
            meetingsYTD
    }
  }`,
    variables: {}
  });



