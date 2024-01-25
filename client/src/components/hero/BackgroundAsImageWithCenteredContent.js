import React, { useContext, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import Navbar from "./Navbar";

import { AuthContext } from "../../Context/AuthContext";
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import { Subheading as SubheadingBase } from "components/misc/Headings.js";

const Container = styled.div`
  ${tw`relative -m-8 bg-center bg-cover h-screen min-h-144`}
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjwZgGtSwVmEMxzWG5DoXecrbsnJHznhgn0A&usqp=CAU");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;
const Subheading = tw(SubheadingBase)`text-center text-gray-100 px-8 py-3 mt-5 text-lg`;

const PrimaryAction = tw.a`rounded-full px-8 py-3 mt-5 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-400 text-gray-100 hocus:bg-primary-600 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

export default (props) => {

  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  if (!isAuthenticated || (isAdmin)) {
    return (
      <Container>
        <OpacityOverlay />
        <HeroContainer>
          <Navbar />
          <Content>
            <Heading>Recruitment Management Tool
              <br />
            </Heading>
            <Subheading>
            This is a basic Recruitment Management Tool which allow recruiters to
            manage candidate information.
              
              </Subheading>
            <PrimaryAction href="#about">Get Started</PrimaryAction>
          </Content>
        </HeroContainer>
      </Container>
    );
  }
  else {
    return (
      <Container>
        <OpacityOverlay />
        <HeroContainer>
          <Navbar />
          <Content>
            <Heading>
          Welcome!
          <br />
        </Heading>
     
            <Subheading>
            This is a basic Recruitment Management Tool where you can see the status of your applications as candidate.
         
        </Subheading>
        <PrimaryAction href="#about">Get Started</PrimaryAction>
          </Content>
        </HeroContainer>
      </Container>
    );
  }
};
