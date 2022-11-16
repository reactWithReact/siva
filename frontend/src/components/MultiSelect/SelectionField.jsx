import styled from "styled-components";

const SelectionField = ({ onClick, children, show }) => {
  return (
    <Field onClick={onClick} highlighted={show}>
      {children}
    </Field>
  );
};

const Field = styled.div`
  color: white;
  background-color: ${({ highlighted }) =>
    highlighted ? "#242424" : "#009879"};
`;

export default SelectionField;
