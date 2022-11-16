import { Fragment } from "react";
import Picture from "../ImageWrappers/Picture";

// The table body will iterate over all the records and render their fields
const TableBody = ({ tableData, columns }) => {
  // This function will check for the type of field and render the required component
  // for most things like firstName,customerId,etc they can be directly rendered as a text node
  // but for picture I need to use an img tag, similarly for date I need to slice off location and timing info.
  const PopulateTable = (columns, data) => {
    return columns.map(({ key, hidden }) => {
      let tData;
      switch (key) {
        case "birthDate":
          tData = data[key].slice(0, 10);
          break;
        case "picture":
          tData = (
            <Picture
              size={"50px"}
              url={data["picture"]}
              gender={data["gender"]}
            />
          );
          break;
        default:
          tData = data[key] ? data[key] : "——";
          break;
      }
      return <Fragment key={key}>{!hidden && <td>{tData}</td>}</Fragment>;
    });
  };

  return (
    <tbody>
      {tableData.map((data) => {
        return <tr key={data.customerId}>{PopulateTable(columns, data)}</tr>;
      })}
    </tbody>
  );
};

export default TableBody;
