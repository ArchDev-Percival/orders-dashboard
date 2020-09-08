import React, { useState, useEffect } from "react";
import { updateOrderWorkerStateFromAPI } from "../Utils/";
import { ThemeProvider } from "styled-components";
import { stopReportingRuntimeErrors } from "react-error-overlay";

if (process.env.NODE_ENV === "development") {
  stopReportingRuntimeErrors(); // disables error overlays only in development to confirm that the error screens behave as expected.
}
function throwError(error) {
  console.log("throwError", error);
  throw new Error(error);
}

const App = () => {
  const [orders, updateOrders] = useState([]);
  const [workersList, updateWorkersList] = useState({});
  const [hasFetchErrorOccurred, updateHasFetchErrorOccurred] = useState(
    undefined
  );

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
        <div className="App"></div>
      )}
    </ThemeProvider>
  );
};

export default App;
