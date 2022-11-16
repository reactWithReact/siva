import axios from "axios";
import {
  Action_SetData,
  Action_SetManager,
  Action_SetPage,
  Action_SetRecords,
  Action_SetTotalPages,
  
} from "../context/TablePageContext/TableActions";

import {Action_barChartData, Action_empty_stackedData} from '../context/ChartContext/ChartActions'

// This File might seem like it shouldn't exist when we can make the api calls right from the component themselves
// 😅 I know, but for making an API request and handling it properly, the code may become longer than we expect and the UI components might end up doing more than they need to
// Also In future we might be making different API requests to this manager endpoint, so all types of requests can be fetched from here,

const BASE_URL = "http://localhost:3001/api/manager";

export const getCustomers = async (managerId, tableDispatch, chartDispatch) => {

  const records = 4;
  try {
    const { data } = await axios.get(`${BASE_URL}/${managerId}`);
    const { customerData, dashboardData } = data
    // I'm dispatching a function here and passing the Action_SetData as the argument which itself takes one argument that is the customer data
    // The Action_SetData function will return an anonymous function to the reducer of tableContext which when called will simply return the new State for the whole page
    
    chartDispatch(Action_empty_stackedData())
    chartDispatch(Action_barChartData(dashboardData.attribution.chart))
    tableDispatch(Action_SetData(customerData));
    tableDispatch(Action_SetTotalPages(Math.ceil(customerData.length / records)));
    tableDispatch(Action_SetRecords(records));
    tableDispatch(Action_SetManager(managerId));
  } catch (error) {
    console.log("error in API fetching : " + error.message);
  }
};
