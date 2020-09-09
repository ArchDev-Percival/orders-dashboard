import React from "react";
import { getDaysOpen } from "../Utils";
import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";
import { withTheme } from "styled-components";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//Syleds a Card
const CardDiv = styled.div`
  grid-row: span 1 / span 1;
  grid-column: span 1 / span 1;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border-radius: 0.5rem;

  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.cardBackgroundColorHover};
  }
`;

//Syles for each Section on the Card
const CARDSECTIONDIV_MODIFIER_CONFIG = {
  header: (props) => `
  background-color: ${props.theme.cardHeaderBackground}`,
};

const CardSectionDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: baseline;
  ${applyStyleModifiers(CARDSECTIONDIV_MODIFIER_CONFIG)}
`;

//Styles for Text on Each Card
export const CARDTEXT_MODIFIER_CONFIG = {
  headerTextAncillary: ({ theme }) => `
      color: ${theme.cardHeaderTextAncillary};
      font-size: ${theme.typeScale.header4};
      `,
  secondaryText: ({ theme }) => `
      color: ${theme.cardTextPrimary};
      font-size: ${theme.typeScale.header5};
      font-weight: bold;
      text-align: center;
      padding: 0rem;`,
  secondaryTextAncillary: ({ theme }) => `
     color: ${theme.cardTextSecondaryAncillary};
     font-size: ${theme.typeScale.header5}
     padding: 0rem;`,
  statusBanner: ({ theme, daysOpenStatus }) => `
      color: ${theme.cardTextInverted};
      font-size: ${theme.typeScale.header5};
      background-color: ${theme.status[daysOpenStatus]};
      text-align: center;
      padding: 0.5rem;
      margin: 0rem;`,
};
const CardHeader = styled.h2`
  font-family: ${(props) => props.theme.primaryFont};
  color: ${(props) => props.theme.cardTextPrimary};
  font-size: ${(props) => props.theme.header2};
  font-weight: bold;
  ${applyStyleModifiers(CARDTEXT_MODIFIER_CONFIG)}
`;

const CardText = styled.p`
  font-family: ${(props) => props.theme.primaryFont};
  color: ${(props) => props.theme.cardTextPrimary};
  font-size: ${(props) => props.theme.typeScale.paragraph};
  text-align: justify;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  ${applyStyleModifiers(CARDTEXT_MODIFIER_CONFIG)};
`;

const CardTextSpan = styled.span`
  font-family: ${(props) => props.theme.primaryFont};
  color: ${(props) => props.theme.cardTextPrimary};
  font-size: ${(props) => props.theme.typeScale.paragraph};
  text-align: justify;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  ${applyStyleModifiers(CARDTEXT_MODIFIER_CONFIG)};
`;

const Card = (props) => {
  const daysOpen = getDaysOpen(props.workOrder.deadline);
  return (
    <CardDiv className="card">
      <CardSectionDiv modifiers="header">
        <CardText modifiers="headerTextAncillary">Workorder:&nbsp;</CardText>
        <CardHeader>{props.workOrder.id}</CardHeader>
      </CardSectionDiv>
      <CardText>{props.workOrder.description}</CardText>
      <CardSectionDiv>
        <CardText modifiers="secondaryTextAncillary">Deadline:&nbsp;</CardText>
        <CardText modifiers="secondaryText">
          {props.workOrder.deadline.toDateString()}
        </CardText>
      </CardSectionDiv>
      <WorkerDetail
        id={props.workOrder.workerId}
        workersList={props.workersList}
      />
      <CardText modifiers="statusBanner" daysOpenStatus={daysOpen.status}>
        {daysOpen.text}
      </CardText>
    </CardDiv>
  );
};

const StyledAccordion = styled(Accordion)`
  width: 100%;
`;

const AssignmentDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const WorkerDetail = ({ id, workersList }) => {
  const id1 = parseInt(id);
  const worker = workersList[id1];
  if (!worker) {
    return null;
  } else {
    return (
      <CardSectionDiv>
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AssignmentDiv>
              <Avatar src={worker.image} alt={worker.name}></Avatar>
              <CardText modifiers="secondaryText">{worker.name}</CardText>
            </AssignmentDiv>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <CardText modifiers="secondaryTextAncillary">
                Assigned To:&nbsp;
                <CardTextSpan modifiers="secondaryText">
                  {worker.name}
                </CardTextSpan>
              </CardText>
              <CardText modifiers="secondaryTextAncillary">
                Organization:&nbsp;
                <CardTextSpan modifiers="secondaryText">
                  {worker.companyName}
                </CardTextSpan>
              </CardText>
              <CardText modifiers="secondaryTextAncillary">
                E:&nbsp;
                <CardTextSpan modifiers="secondaryText">
                  <a href={`mailto: ${worker.email}`}>{worker.email}</a>
                </CardTextSpan>
              </CardText>
            </div>
          </AccordionDetails>
        </StyledAccordion>
      </CardSectionDiv>
    );
  }
};

export default withTheme(Card);
