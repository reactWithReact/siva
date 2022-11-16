import styled from "styled-components";

export const STable = styled.table`
  display: inline-block;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.9em;
  max-width: 90vw;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  overflow-x: scroll;
  & thead tr {
    background-color: #009879;
    color: #fff;
    text-align: left;
    font-weight: bold;
  }
  & th,
  td {
    padding: 12px 15px;
  }
  & thead th,
  td {
    /* min-width: 200px; */
    white-space: nowrap;
  }
  & tbody tr {
    border-bottom: 1px solid #ddd;
  }
  & tbody tr:nth-of-type(even) {
    background-color: grey;
  }
  & tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
`;

export const TextWrapper = styled.div`
  text-transform: capitalize;
  text-align: center;
  /* width: 100%; */
  /* overflow-x: scroll; */
`;

export const SortButton = styled.button`
  display: block;
  padding: 0.25em;
  font-size: 0.7em;
`;
export const ButtonContainer = styled.div`
  display: inline-block;
  position: relative;
  right: 0;
  margin-right: 0.5em;
  max-width: 2px;
`;

export const StableHead = styled.th`
  & > span {
    position: relative;
    top: -10px;
    margin-right: 10px;
  }
`;
export const TableActionBar = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  margin-top: 0.5rem;
  gap: 0.5rem;
`;
