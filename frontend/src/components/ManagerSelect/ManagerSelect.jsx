import React, { useContext, useState } from "react";
import { getCustomers } from "../../APIs/ManagerAPI";
import { ChartStoreContext } from "../../context/ChartContext/ChartStore";
import { TableStoreContext } from "../../context/TablePageContext/TableStore";
import DropDown from "../DropDown/DropDown";
const ManagerIds = [
  {
    label: "ID: 33300",
    value: 33300,
  },
  {
    label: "ID: 29970",
    value: 29970,
  },
  {
    label: "ID: 26640",
    value: 26640,
  },
  {
    label: "ID: 23310",
    value: 23310,
  },
  {
    label: "ID: 19980",
    value: 19980,
  },
  {
    label: "ID: 16650",
    value: 16650,
  },
  {
    label: "ID: 13320",
    value: 13320,
  },
  {
    label: "ID: 9990",
    value: 9990,
  },
  {
    label: "ID: 6660",
    value: 6660,
  },
  {
    label: "ID: 3330",
    value: 3330,
  },
];

// This component is responsible for displaying the list of manger Ids to select from

const ManagerSelect = () => {
  // state for opening and closing dropdown menu
  const [open, setOpen] = useState(false);
  // selecting the current id to show as label
  const [currentId, setCurrentId] = useState({ label: "Select an ID" });
  // dispatch is required to make any changes to global state
  const { tableDispatch } = useContext(TableStoreContext);
  const {chartDispatch} = useContext(ChartStoreContext)


  const managerIdSelectHandler = (data) => {
    setCurrentId(data);
    setOpen(false);

    // You'll notice that I'm not actually dispatching an action from here
    // Because Actions cannot be Asynchronous Functions as reducer doesn't awaits for them
    // and making an api call is an asynchronous, so we'll just make the api call from here and when it's resolved
    // we'll dispatch an action from there as it's much more cleaner this way
    getCustomers(data.value, tableDispatch, chartDispatch);
  };

  return (
    <DropDown dropDownLabel={currentId.label} closeOnSelect={true}>
      {ManagerIds.map((data) => (
        <div onClick={() => managerIdSelectHandler(data)} key={data.value}>
          {data.label}
        </div>
      ))}
    </DropDown>
  );
};

export default ManagerSelect;
