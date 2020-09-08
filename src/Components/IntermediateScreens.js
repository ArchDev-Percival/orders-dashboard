import React from "react";
import { Illustrations } from "../Assets";
import styled from "styled-components";
import { typeScale, primaryFont } from "../Utils";

const Wrapper = styled.div`
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  border-radius: 2px;
  font-family: Roboto;

  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;

  @media only screen and (min-width: 1080px) {
    width: 50%;
    height: 50%;
  }
`;

const Header1 = styled.h1`
  padding: 2%;
  font-size: ${typeScale.header1};
  font-family: ${primaryFont} @media only screen and (min-width: 1080px) {
    padding: 1rem;
  }
`;

const Text = styled.p`
  padding: 2%;
  font-size: ${typeScale.paragraph};
  font-family: ${primaryFont} @media only screen and (min-width: 1080px) {
    padding: 1rem;
  }
`;

export const ErrorScreen = () => {
  return (
    <Wrapper>
      <Header1>Page Failed To Load</Header1>
      <Text>
        Unforuntately, the page you have requested has failed to load. Please
        check your internet connection and refresh the page after a few moments.
      </Text>
      <Text>
        If the problem persists, it could be due to a broken API URL or updated
        data schemas. Please reach out to support at:
        <a href="mailto:troubleshoot@hway.com">troubleshoot@hway.com</a>
      </Text>
      <Image src={Illustrations.ErrorScreenSVG} alt="An error has occoured" />
    </Wrapper>
  );
};

export const LoadingScreen = () => {
  return (
    <Wrapper>
      <Header1>Page Loading</Header1>
      <Text>
        We are fetching your data from the server. In just a few moments, you
        should see an updat on your screen
      </Text>
      <Image
        src={Illustrations.PageLoadScreenSVG}
        alt="Your content is being loaded, and will be delivered to you shortly"
      />
    </Wrapper>
  );
};
