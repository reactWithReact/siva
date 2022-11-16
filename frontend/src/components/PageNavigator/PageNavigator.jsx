import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { SerachBox } from "../../GlobalStyles";

// This component is resposible for navigation to different tablePages i.e, next, previous or any page between 1 and last page
const PageNavigator = ({ currentPage, totalPages, setPageHandler }) => {
  // const { currentPage, dispatch, totalPages } =
  //   useContext(TableStoreContext);

  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const previousPageClickHandler = () => {
    if (currentPage <= 1) return;
    setPageHandler(currentPage - 1);
  };
  const nextPageClickHandler = () => {
    if (currentPage >= totalPages) return;
    setPageHandler(currentPage + 1);
  };
  const pageSearchHandler = (e) => {
    e.preventDefault();
    setPageHandler(parseInt(page));
  };

  return (
    <SPageNavigator>
      <button onClick={previousPageClickHandler}>Previous</button>

      <SerachBox onSubmit={pageSearchHandler}>
        <input
          value={page}
          onChange={(e) => setPage(e.target.value)}
          type="number"
          max={totalPages}
          min={1}
        />
      </SerachBox>

      <button onClick={nextPageClickHandler}>Next</button>
    </SPageNavigator>
  );
};

const SPageNavigator = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  gap: 1em;
  padding: 0.75em;
  border-radius: 0.25em;
`;

export default PageNavigator;
