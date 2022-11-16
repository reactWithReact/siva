import React, { useState } from "react";
import { SerachBox } from "../../GlobalStyles";

// a simple component that adjusts the number of records that need to be displayed on the page
const SerachRecords = ({ max, setRecordHandler }) => {
  const [record, setRecord] = useState();
  return (
    <SerachBox
      onSubmit={(e) => {
        e.preventDefault();
        setRecordHandler(parseInt(record));
      }}
    >
      <input
        type="number"
        placeholder="records eg:4,10 etc"
        value={record}
        onChange={(e) => setRecord(e.target.value)}
        min={1}
        max={max}
      />
    </SerachBox>
  );
};

export default SerachRecords;
