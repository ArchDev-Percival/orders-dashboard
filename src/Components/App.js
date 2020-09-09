import React, { useState, useEffect } from "react";
import {
  updateOrderWorkerStateFromAPI,
  filterOrdersByIdOrder,
  defaultTheme,
  hexToRGB,
} from "../Utils";
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
  gap: 0.5rem;
  padding: 0.5rem;

  background-image: linear-gradient(
    to bottom,
    ${(props) => hexToRGB(props.theme.gridBackgroundColorGradStart, 1)},
    ${(props) => hexToRGB(props.theme.gridBackgroundColorGradEnd, 0.3)}
  );
  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  @media only screen and (min-width: 1080px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

const Header = styled.h1`
  justify-content: center;
  justify-items: center;
  text-align: center;
  font-family: ${(props) => props.theme.primaryFont};
  color: ${(props) => props.theme.headerTextColor};
  font-size: ${(props) => props.theme.header1};
  font-weight: bold;
`;

const Footer = styled.div`
  grid-column: 1 / span 1;

  @media only screen and (min-width: 768px) {
    grid-column: 1 / span 2;
  }

  @media only screen and (min-width: 1080px) {
    grid-column: 1 / span 4;
  }
  color: ${(props) => props.theme.headerBackgroundColor};
  background-color: ${(props) => props.theme.headerTextColor};
  width: 100%;
  text-align: center;
  border-style: solid;
`;

const HeaderBarDiv = styled.div`
  grid-row: 1 / span 2;
  grid-column: 1 / span 1;
  width: 100%;
  font-family: ${(props) => props.theme.primaryFont};
  color: ${(props) => props.theme.headerTextColor};
  justify-content: center;
  justify-items: center;
  border-radius: 0.5rem;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
    <ThemeProvider theme={defaultTheme}>
      {hasFetchErrorOccurred ? (
        throwError(hasFetchErrorOccurred)
      ) : (
        <div className="App">
          <Grid>
            <HeaderBarDiv>
              <Header>Master WorkOrder Tracker</Header>
              <FilterBar
                workersList={workersList}
                updateFilterBy={updateFilterBy}
                isSortAscending={isSortAscending}
                updateIsSortAscending={updateIsSortAscending}
              ></FilterBar>
            </HeaderBarDiv>
            {filterOrdersByIdOrder(orders, filterBy, isSortAscending).map(
              (workOrder) => (
                <Card
                  workOrder={workOrder}
                  workersList={workersList}
                  key={workOrder.id}
                ></Card>
              )
            )}

            <Footer>
              <div>
                Developed By:
                <a href="https://www.linkedin.com/in/dominicpd/">Dominic PD</a>
              </div>
            </Footer>
          </Grid>
        </div>
      )}
    </ThemeProvider>
  );
};

export default App;
