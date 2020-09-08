import React from "react";
import WorkerDetail from "./WorkerDetail";
import { getDaysOpen } from "../Utils";
import styled from "styled-components";

const CardDiv = styled.div`
  grid-row: span 1 / span 1;
  grid-column: span 1 / span 1;
`;

const Card = (props) => {
  return (
    <CardDiv className="card">
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Workorder: {props.workOrder.id}
      </h2>
      <p>{props.workOrder.description}</p>
      <WorkerDetail
        id={props.workOrder.workerId}
        workersList={props.workersList}
      />
      <p style={{ backgroundColor: "#5d347a" }}>
        Due:{" "}
        {getDaysOpen(props.workOrder.deadline) > 0
          ? `Due in ${getDaysOpen(props.workOrder.deadline)} days`
          : getDaysOpen(props.workOrder.deadline) === 0
          ? "Due Today"
          : `Overdue by ${-1 * getDaysOpen(props.workOrder.deadline)} days`}
      </p>{" "}
      <p>Created on: {props.workOrder.deadline.toDateString()}</p>
    </CardDiv>
  );
};

export default Card;

/*



*/
