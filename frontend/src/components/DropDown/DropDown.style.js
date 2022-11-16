import styled, { css } from "styled-components";

export const SDropDown = styled.div`
  position: relative;
`;
export const DropDownButton = styled.button`
  border: 1px solid grey;
`;
export const DropDownMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  /* padding: 0.25em; */
  left: 0;
  top: calc(100% + 0.25rem);
  padding: 0.75em;
  border-radius: 0.25rem;
  background-color: grey;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);
  max-height: 300px;
  overflow-y: scroll;
  transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
  & > * {
    padding: 0.25em;
    border-radius: 0.25rem;
    cursor: pointer;
    border-bottom: 1px solid grey;
    color: white;
    background-color: #242424;
    min-width: 250px;
    transition: background-color 200ms ease;
    &:hover {
      background-color: #009879;
    }
  }
  ${({ open }) => {
    return (
      open &&
      css`
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
        z-index: 100;
      `
    );
  }};
`;
