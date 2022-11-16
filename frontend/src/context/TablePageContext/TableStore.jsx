import { createContext, useReducer } from "react";

//? Why this approach ?

// This approach might overcomplicated and can be done with much less code but....
// This approach is extremely scalable, maintainable, easy to write tests for, and easy to maintain
// Any sort of change in data can be tracked from the 'Actions' file

//

export const TableStoreContext = createContext();

// This reducer function is responsible for calling the function passed by the 'tableDispatch' function
//  that function will return the new state
// Note: function is not mutating the previous state, it'll return a brand new state with required changes

const initialState = {
  sortableData: [],
  selectedFields: [],
  currentManagerId: 0,
  currentPage: 1,
  totalPages: 0,
  records: 4,
  dataFound: true,
  filteredByBusinessUnitData:[],

};
const tableStoreReducer = (state, action) => {
  try {
    return action(state);
  } catch (error) {
    console.warn(
      "re-check the action you're dispatching, we're expecting a function here"
    );
    return initialState;
  }
};
// This is the initial state of the app and also gives an idea of what data will be available throughtout the page
const TableStore = ({ children }) => {
  // The reducer hook will contain all the state which can be accessed throught the table page
  const [state, tableDispatch] = useReducer(tableStoreReducer, initialState);

  return (
    <TableStoreContext.Provider value={{ ...state, tableDispatch }}>
      {children}
    </TableStoreContext.Provider>
  );
};

export default TableStore;
