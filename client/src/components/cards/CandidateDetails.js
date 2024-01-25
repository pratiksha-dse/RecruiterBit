
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";

import CandidateService from "../../Services/CandidateService";
import { ReactComponent as DateIcon } from "feather-icons/dist/icons/calendar.svg";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PhoneIcon } from "feather-icons/dist/icons/phone.svg";
import { ReactComponent as MailIcon } from "feather-icons/dist/icons/mail.svg";
import { AuthContext } from "../../Context/AuthContext";

import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-2.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-5.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-lg mx-auto py-16 lg:py-16`;
const TabContent = tw(
  motion.div
)`grid grid-cols-1 gap-3 lg:grid-cols-2 grid-flow-row mt-6 rounded-b mx-auto sm:max-w-none sm:mx-0 items-center`;
const FormContainer = tw.div`w-full mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;

const HeaderContent = tw.div``;
const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;

const Card = tw.div`border border-gray-400 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl rounded-bl-2xl focus:outline-none mx-8 my-8 bg-gray-100`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-72 w-72 opacity-15 transform translate-x-2/3 -translate-y-12 text-primary-500`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-72 w-72 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const TextInfo = tw.div`py-6 px-10 py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;


const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-2xl sm:rounded-bl-2xl py-3 sm:py-6`;

export default () => {
  const [query1, setQuery1] = useState("");
  const onChange1 = (e) => {
    setQuery1(e.target.value);
  };
  const [query2, setQuery2] = useState("");
  const onChange2 = (e) => {
    setQuery2(e.target.value);
  };
 
  const {
    isAdmin,
  } = useContext(AuthContext);

  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    CandidateService.getCandidates().then((data) => {
      setCandidates(data.candidates.reverse());
      console.log(candidates);
    });
  }, []);
  const onSubmit = (e) => {
    e.prcandidateDefault();
  };
  const searchByName = () => {
    return (
      <FormContainer>
        <Form onSubmit={onSubmit}>
          <Input
            type="search"
            name="search"
            onChange={onChange1}
            value={query1}
            placeholder="Search by Name"
          />
        </Form>
      </FormContainer>

    );
  };
  const searchByStatus = () => {
    return (
      <FormContainer>
        <Form onSubmit={onSubmit}>
          <Input
            type="search"
            name="searchbystatus"
            onChange={onChange2}
            value={query2}
            placeholder="Search by Status"
          />
        </Form>
      </FormContainer>

    );
  };
 
  return (
    <Container>
      <Content>
        <HeaderContent>
          <Subheading>RecruitBit</Subheading>
          <Heading>Candidates</Heading>
        </HeaderContent>
        {searchByName()}
        {searchByStatus()}
        <TabContent>
          <DecoratorBlob1 />
          <DecoratorBlob2 />
          {candidates.map((candidate, index) => {
            if ((query1 == "" && query2 == "" ) || (query2 != "" && candidate.status.match(query2)) || (query1 != "" && candidate.name.match(query1))) {
              return (
                <Card key={index}>
                  <TextInfo>
                    <TitleReviewContainer>
                      <Title>{candidate.name}</Title>
                    </TitleReviewContainer>

                    <SecondaryInfoContainer>
                      <IconWithText>
                        <IconContainer>
                          <PhoneIcon />
                        </IconContainer>
                        <Text>{candidate.contact}</Text>
                      </IconWithText>
                      <IconWithText>
                        <IconContainer>
                          <DateIcon />
                        </IconContainer>
                        <Text>{candidate.status}</Text>
                      </IconWithText>

                    </SecondaryInfoContainer>
                    <SecondaryInfoContainer>
                      <IconWithText>
                        <IconContainer>
                          <MailIcon />
                        </IconContainer>
                        <Text>{candidate.email}</Text>
                      </IconWithText>
                    </SecondaryInfoContainer>
                  </TextInfo>
                  <a href={isAdmin ? ("#/admin_candidate?" + candidate._id) : ("#/candidate_edit?" + candidate._id)}>
                    <PrimaryButton>Candidate Details</PrimaryButton>
                  </a>
                </Card>
              );
            } else {
              return <></>;
            }
          })}

        </TabContent>
      </Content>
    </Container>
  );
};