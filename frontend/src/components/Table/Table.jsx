import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { ButtonWrapper, Label } from "../../GlobalStyles";
import MultiSelect from "../MultiSelect/MultiSelect";
import PageNavigator from "../PageNavigator/PageNavigator";
import SerachRecords from "../SerachBoxes/SerachRecords";
import { STable, TableActionBar } from "./Table.style";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

// This is the main table component that contains the table Head and table body for showing fields and data respectively
//
const Table = ({
  sortableData,
  selectedFields,
  records,
  currentPage,
  sortHandler,
  totalPages,
  setPageHandler,
  selectAllHandler,
  toggleFieldHandler,
  setRecordHandler,
}) => {
  // I'm doing the pagination right here, where I check the the current page we're on, total number pages, total number of records to display and filtering out that many records from the main sortableData
  // and every time the sortableData or currentPage or records change I'm calling this function again to reflect changes
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    setPageData(() => {
      const start = (currentPage - 1) * records;
      const end = (currentPage - 1) * records + records;
      const data = sortableData.slice(start, end);
      return data;
    });
  }, [sortableData[0], currentPage, records]);
  const csvMetaDeta = {
    filename: "Customers.csv",
    headers: selectedFields.filter((fields) => !fields.hidden),
    data: sortableData,
  };
  return (
    <div>
      <TableActionBar>
        <Label>
          page {currentPage} out of {totalPages}
        </Label>
        <ButtonWrapper>
          <MultiSelect
            selectAllHandler={selectAllHandler}
            toggleFieldHandler={toggleFieldHandler}
            selectedFields={selectedFields}
          />
          <SerachRecords
            setRecordHandler={setRecordHandler}
            max={sortableData.length}
          />
          <button>
            <CSVLink {...csvMetaDeta}>Download SpreadSheet</CSVLink>
          </button>
        </ButtonWrapper>
      </TableActionBar>
      <STable>
        <TableHead columns={selectedFields} sortHandler={sortHandler} />
        <TableBody columns={selectedFields} tableData={pageData} />
      </STable>
      <PageNavigator
        currentPage={currentPage}
        setPageHandler={setPageHandler}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Table;
