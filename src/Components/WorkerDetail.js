import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CardSectionDiv, CARDSECTIONDIV_MODIFIER_CONFIG } from "./Card";

const WorkerDetail = ({ id, workersList }) => {
  const id1 = parseInt(id);
  const worker = workersList[id1];
  if (!worker) {
    return null;
  } else {
    return (
      <CardSectionDiv className="worker-details">
        <Accordion expandIcon={<ExpandMoreIcon />}>
          <AccordionSummary>
            <div>
              <Avatar src={worker.image} alt={worker.name}></Avatar>
              <h3>{worker.name}</h3>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <div>
                <h3>{worker.name}</h3>
                <h4>{worker.companyName}</h4>
                <h5>{worker.email}</h5>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </CardSectionDiv>
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
