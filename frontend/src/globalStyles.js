import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

svg{
  color:black;
}

`;

export const ButtonWrapper = styled.div`
  /* margin: 1em auto; */
  display: flex;
  border: 1px solid grey;
  min-width: 50%;
  padding: 0.25em 0.75em;
  border-radius: 0.5em;
  justify-content: space-evenly;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
`;

export const Label = styled.p`
  display: inline-block;
  width: max-content;
  border-radius: 0.5em;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  border: 1px solid grey;
  padding: 0.75em;
`;
export const SerachBox = styled.form`
  & input {
    display: block;
    font-size: 1.2rem;
    padding: 0.5em;
    height: 100%;
    width: 100%;
    border-radius: 1em;
  }
`;

export default GlobalStyles;
