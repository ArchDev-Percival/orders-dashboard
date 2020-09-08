import axios from "axios";

const getIndivualWorkerDataFromAPI = (id) => {
  const URLWorkerData = `https://www.hatchways.io/api/assessment/workers/${id}`;
  return axios.get(URLWorkerData);
};

const getUniqueWorkerIDsFromOrders = (orders) => {
  let WorkerIDList = new Set();

  orders.forEach((order) => {
    if (order.workerId in WorkerIDList === false) {
      WorkerIDList.add(order.workerId);
    }
  });
  return WorkerIDList;
};

const getWorkersDetailsFromOrders = (orders) => {
  const WorkerIDList = getUniqueWorkerIDsFromOrders(orders);

  const workderDetailsPromises = Array.from(WorkerIDList).map(
    (workerID) =>
      new Promise((resolve) => {
        getIndivualWorkerDataFromAPI(workerID).then((fetchedWorkerDetails) => {
          resolve(fetchedWorkerDetails.data.worker);
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

        const workerDetailsPromises = getWorkersDetailsFromOrders(orders);
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
