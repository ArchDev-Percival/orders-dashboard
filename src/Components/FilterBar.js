import React from "react";
import styled from "styled-components";

const FilterBarDiv = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const FilterOrderByWorker = ({ workersList, updateDisplayedOrders }) => {
  if (!workersList) {
    return null;
  } else {
    return (
      <FilterBarDiv className="filterbar">
        <label htmlFor="filter-workder"> Filter by Worker Name: </label>
        <select
          id="filter-worker"
          onChange={(event) => {
            updateDisplayedOrders(event.target.value);
          }}
        >
          {Object.keys(workersList).map((key) => (
            <option value={workersList[key].id} key={workersList[key].id}>
              {workersList[key].name}
            </option>
          ))}
          {/* Since null being sent as a value to an option results in the Content
           * being used as the value. I am passing "" as a value that results in
           * a "null-like value" */}
          <option value={""} key={"clear"}>
            None
          </option>
        </select>
      </FilterBarDiv>
    );
  }
};

const SortOrdersAscDesc = ({ isSortAscending, updateIsSortAscending }) => {
  return (
    <label>
      Sort work orders in Ascending Order:
      <input
        id="ascdecsort"
        type="checkbox"
        checked={isSortAscending}
        onChange={(event) => {
          updateIsSortAscending(!isSortAscending);
        }}
      />
    </label>
  );
};

const FilterBar = ({
  workersList,
  updateFilterBy,
  isSortAscending,
  updateIsSortAscending,
}) => (
  <div className="FilterBar">
    <FilterOrderByWorker
      workersList={workersList}
      updateDisplayedOrders={updateFilterBy}
    />
    <SortOrdersAscDesc
      isSortAscending={isSortAscending}
      updateIsSortAscending={updateIsSortAscending}
    />
  </div>
);

export default FilterBar;
