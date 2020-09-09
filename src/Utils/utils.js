import axios from "axios";

//Network Requests for Orders and List of Workers

const getIndivualWorkerDataFromAPI = (id) => {
  const URLWorkerData = `https://www.hatchways.io/api/assessment/workers/${id}`;
  return axios.get(URLWorkerData);
};

//Build a cache of repeated workerIDs rather than calling the API for existing workerIDs
const getUniqueWorkerIDsFromOrders = (orders) => {
  let WorkerIDList = new Set();

  orders.forEach((order) => {
    if (order.workerId in WorkerIDList === false) {
      WorkerIDList.add(order.workerId);
    }
  });
  return WorkerIDList;
};

//Get the details associated with each workerID
const getWorkersDetailsFromOrders = (orders, updateHasFetchErrorOccurred) => {
  const WorkerIDList = getUniqueWorkerIDsFromOrders(orders);

  const workderDetailsPromises = Array.from(WorkerIDList).map(
    (workerID) =>
      new Promise((resolve) => {
        getIndivualWorkerDataFromAPI(workerID)
          .then((fetchedWorkerDetails) => {
            resolve(fetchedWorkerDetails.data.worker);
          })
          .catch((error) => {
            console.log(error);
            updateHasFetchErrorOccurred(error);
          });
      })
  );
  return workderDetailsPromises;
};

export const updateOrderWorkerStateFromAPI = (
  updateOrders,
  updateWorkersList,
  updateHasFetchErrorOccurred
) => {
  const URL_GET_WORKORDERS =
    "https://www.hatchways.io/api/assessment/work_orders";
  try {
    axios
      .get(URL_GET_WORKORDERS)
      .then((result) => {
        const orders = result.data.orders;
        orders.forEach((order) => {
          order.deadline = toDateFromEpochMS(order.deadline);
        });

        updateOrders(orders);

        const workerDetailsPromises = getWorkersDetailsFromOrders(
          orders,
          updateHasFetchErrorOccurred
        );
        Promise.all(workerDetailsPromises)
          .then((fetchedWorkerDetails) => {
            let processedWorkerDetails = {};
            fetchedWorkerDetails.forEach((fetchedWDetail) => {
              processedWorkerDetails[fetchedWDetail.id] = fetchedWDetail;
            });
            updateWorkersList(processedWorkerDetails);
          })
          .catch((error) => {
            console.log(error);
            updateHasFetchErrorOccurred(error);
          });

        return workerDetailsPromises;
      })
      .catch((error) => {
        console.log(error);
        updateHasFetchErrorOccurred(error);
      });
  } catch (error) {
    console.log(error);
    updateHasFetchErrorOccurred(error);
  }
};

/*---------*/

const toDateFromEpochMS = (eSecMilliSeconds) => {
  return new Date(eSecMilliSeconds * 1000);
};

export const getDaysOpen = (date) => {
  const daysOpen = Math.round(
    Math.abs(new Date() - date) / (1000 * 60 * 60 * 24)
  );
  if (daysOpen > 0) {
    return {
      status: "+",
      text: `Due in ${daysOpen} ${daysOpen === 1 ? "day" : "days"}`,
    };
  } else if (daysOpen === 0) {
    return { status: "|", text: `Due Today` };
  } else {
    return {
      status: "-",
      text: `Overdue by ${-1 * daysOpen} ${
        -1 * daysOpen === 1 ? "day" : "days"
      }`,
    };
  }
};

/*---------*/

function returnSorted(orders, isSortAscending, sortField) {
  //The deafult sort key is deadline
  if (!(sortField in Object.keys(orders))) {
    sortField = "deadline";
  }
  return orders.sort((ith, iPlusOneth) =>
    isSortAscending
      ? ith[sortField] - iPlusOneth[sortField]
      : iPlusOneth[sortField] - ith[sortField]
  );
}

//Filter and Sort
export const filterOrdersByIdOrder = (orders, filterBy, isSortAscending) => {
  //If no filter is applied, return "orders" sorted by "deadline"
  if (!filterBy) {
    return returnSorted(orders, isSortAscending, "deadline");
  }

  let filteredOrders = [];
  orders.forEach((value) => {
    if (String(value.workerId) === String(filterBy)) {
      filteredOrders.push(value);
    }
  });
  return returnSorted(filteredOrders, isSortAscending, "deadline");
};

/*-----------*/

export function hexToRGB(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}
