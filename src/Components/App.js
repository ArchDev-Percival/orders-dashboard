import React, { useState, useEffect } from "react";
import { updateOrderWorkerStateFromAPI, filterOrdersByIdOrder } from "../Utils";
import { ThemeProvider } from "styled-components";
import { stopReportingRuntimeErrors } from "react-error-overlay";
import styled from "styled-components";
import FilterBar from "./FilterBar";
import Card from "./Card";

if (process.env.NODE_ENV === "development") {
  stopReportingRuntimeErrors(); // disables error overlays only in development to confirm that the error screens behave as expected.
}
function throwError(error) {
  console.log("throwError", error);
  throw new Error(error);
}

const Grid = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  gap: 1 rem;

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 1080px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  justify-content: center;
  justify-items: center;
`;

const Header = styled.h1`
  grid-row: 1;
  grid-column: 1 / span 1;

  @media only screen and (min-width: 768px) {
    grid-column: 1 / span 2;
  }

  @media only screen and (min-width: 1080px) {
    grid-column: 1 / span 4;
  }
`;

const Footer = styled.p`
  grid-column: 1 / span 1;

  @media only screen and (min-width: 768px) {
    grid-column: 1 / span 2;
  }

  @media only screen and (min-width: 1080px) {
    grid-column: 1 / span 4;
  }
`;

const FilterBarDiv = styled.div`
  grid-row: 2;
  grid-column: 1 / span 1;

  @media only screen and (min-width: 768px) {
    grid-column: 1 / span 2;
  }

  @media only screen and (min-width: 1080px) {
    grid-column: 1 / span 4;
  }
`;

const App = () => {
  const [orders, updateOrders] = useState([]);
  const [workersList, updateWorkersList] = useState({});
  const [hasFetchErrorOccurred, updateHasFetchErrorOccurred] = useState(
    undefined
  );
  const [filterBy, updateFilterBy] = useState(null);
  const [isSortAscending, updateIsSortAscending] = useState(true);

  useEffect(() => {
    updateOrderWorkerStateFromAPI(
      updateOrders,
      updateWorkersList,
      updateHasFetchErrorOccurred
    );
  }, []);
  return (
    <ThemeProvider theme={{ a: "5" }}>
      {hasFetchErrorOccurred ? (
        throwError(hasFetchErrorOccurred)
      ) : (
        <div className="App">
          <Grid>
            <Header>Header</Header>
            <FilterBarDiv>
              <FilterBar
                workersList={workersList}
                updateFilterBy={updateFilterBy}
                isSortAscending={isSortAscending}
                updateIsSortAscending={updateIsSortAscending}
              ></FilterBar>
            </FilterBarDiv>
            {filterOrdersByIdOrder(orders, filterBy, isSortAscending).map(
              (workOrder) => (
                <Card
                  workOrder={workOrder}
                  workersList={workersList}
                  key={workOrder.id}
                ></Card>
              )
            )}

            <Footer>Footer</Footer>
          </Grid>
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;
