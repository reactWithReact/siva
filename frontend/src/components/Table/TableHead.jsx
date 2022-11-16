import React, { Fragment } from "react";
import { ButtonContainer, SortButton, StableHead } from "./Table.style";

// This is the table head or <thead> component responsible for showing the fields
// all fields have a property called hidden, it checks for that property,
// if the hidden is true it won't be rendered but if it's false... it'll get rendered
// the columns prop is nothing but all the fields from the JSON data
const TableHead = ({ columns, sortHandler }) => {
  return (
    <thead>
      <tr>
        {columns.map(({ label, key, hidden }) => {
          return (
            <Fragment key={key}>
              {!hidden && (
                <StableHead>
                  <span>{label}</span>
                  <ButtonContainer>
                    <SortButton
                      onClick={() => {
                        sortHandler(key, "asc");
                      }}
                    >
                      &#x25B2;
                    </SortButton>
                    <SortButton onClick={() => sortHandler(key, "dsc")}>
                      &#x25BC;
                    </SortButton>
                  </ButtonContainer>
                </StableHead>
              )}
            </Fragment>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;

// old workflow
// here: ()=> dispatch(action("arg1","arg2")) |  when passing props: dispatch=tableDispatch , action=Action_ToggleField
// new workFlow
// here: ()=> sortHandler("arg1","arg2") | when passing props: sorthandler = (para1,para2)=>tableDispatch(Action_toggleField(para1,para2))
