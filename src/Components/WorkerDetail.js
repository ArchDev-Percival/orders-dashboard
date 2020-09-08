import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const WorkerDetail = ({ id, workersList }) => {
  const id1 = parseInt(id);
  const worker = workersList[id1];
  if (!worker) {
    return null;
  } else {
    return (
      <div className="worker-details" style={{ display: "flex" }}>
        <Accordion style={{ flexBasis: "80%" }} expandIcon={<ExpandMoreIcon />}>
          <AccordionSummary style={{ flexBasis: "100%" }}>
            <div
              style={{
                flexBasis: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                backgroundColor: "dfd6e4",
              }}
            >
              <Avatar
                src={worker.image}
                alt={worker.name}
                style={{ margin: "2%" }}
              ></Avatar>
              <h3 style={{ padding: "2%" }}>{worker.name}</h3>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <div style={{ flexBasis: "10%", padding: "2%" }}>
                <h3>{worker.name}</h3>
                <h4>{worker.companyName}</h4>
                <h5>{worker.email}</h5>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
};

export default WorkerDetail;

/**
 * 
 *          <img
          src={worker.image}
          alt={worker.name}
          style={{ flexBasis: "15%", padding: "2%" }}
        ></img>
        <div style={{ flexBasis: "10%", padding: "2%" }}>
          <h3>{worker.name}</h3>
          <h4>{worker.companyName}</h4>
          <h5>{worker.email}</h5>
        </div>
 */
