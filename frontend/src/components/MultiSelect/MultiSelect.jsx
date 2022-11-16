import React, { useMemo, useState } from "react";
import DropDown from "../DropDown/dropDown";
import SelectionField from "./SelectionField";

// this is a dropdown component responsible for showing and hiding fields on the table
const MultiSelect = ({
  toggleFieldHandler = () => {
    console.warn("no toggleFieldHandler found");
  },
  selectAllHandler = () => {
    console.warn("no selectAllHandler found");
  },
  selectedFields = [],
}) => {
  const [selectAll, setSelectAll] = useState(true);
  const fieldOptions = useMemo(() =>
    selectedFields.map((field) => {
      return (
        <SelectionField
          key={field.key}
          onClick={() => {
            toggleFieldHandler(field);
          }}
          show={field.hidden}
        >
          {field.label}
        </SelectionField>
      );
    })
  );

  return (
    <>
      <DropDown closeOnSelect={false} dropDownLabel="Select Fields">
        {selectedFields.length > 0 && (
          <SelectionField
            onClick={() => {
              selectAllHandler(selectAll);
              setSelectAll((prev) => !prev);
            }}
            show={selectAll}
          >
            {selectAll ? "Select All" : "Deselect All"}
          </SelectionField>
        )}
        {fieldOptions}
      </DropDown>
    </>
  );
};

export default MultiSelect;
