import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import CandidateService from "../../Services/CandidateService";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/log-in.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";

const Heading = tw(SectionHeading)`w-full`;

const Description = tw(SectionDescription)`items-center w-full text-center`;

const Column = tw.div`flex flex-col items-center `;
const HeaderContent = tw.div``;

const Form = tw.form`mx-auto max-w-3xl`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-600 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-500 focus:bg-white mt-5 focus:placeholder-gray-500 first:mt-0`;

const SubmitButton = styled.button`
  ${tw`mt-5 px-5 tracking-wide font-semibold bg-primary-600 text-gray-100 w-2/6 py-3 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const CandidateEdit = ({
  SEID = "",
  candidateOld = {}
}) => {
  const [candidate, setCandidate] = useState({
    name: "",
    contact: "",
    email: "",
    skills: "",
    node: "",
    react: "",
    salary: "",
    status: "pending"

  });
  const [message, setMessage] = useState(candidateOld);
  let timerID = useRef(candidateOld);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setCandidate({
      name: "",
      contact: "",
      email: "",
      skills: "",
      node: "",
      react: "",
      salary: "",
      status: "pending"

    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const tmpCandidates = [...candidates, candidate];
    console.log(candidateOld);
    const newCandidate = {
      name: candidate.name === "" ? candidateOld.name : candidate.name,
      contact: candidate.contact === "" ? candidateOld.contact : candidate.contact,
      email: candidate.email === "" ? candidateOld.email : candidate.email,
      skills: candidate.skills === "" ? candidateOld.skills : candidate.skills,
      node: candidate.node === "" ? candidateOld.node : candidate.node,
      react: candidate.react === "" ? candidateOld.react : candidate.react,
      salary: candidate.salary === "" ? candidateOld.salary : candidate.salary,
      status: candidate.status === "" ? candidateOld.status : candidate.status,
    };

    CandidateService.editCandidate(newCandidate, SEID).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
        }, 2000);
      }
    });
    setCandidate(tmpCandidates);
  };

  const [candidates, setCandidates] = useState([]);
  return (
    // <AnimationRevealPage>
    <Container tw="m-8 -mt-32">
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            <Heading>Update candidate Details</Heading>
            <p align="center">
              <Description>
                Update name, email, phone no, skills, experience and expected salary
              </Description>
            </p>
          </HeaderContent>
          <br />
          <br />
          <br />
          <Form onSubmit={onSubmit}>
            <Input
              type="text"
              name="name"
              value={candidate.name}
              onChange={onChange}
              placeholder="Name"
            />
            <Input
              type="text"
              name="contact"
              value={candidate.contact}
              onChange={onChange}
              placeholder="Contact No"
            />
            <Input
              type="text"
              name="email"
              value={candidate.email}
              onChange={onChange}
              placeholder="Email"
            />
            <Input
              type="text"
              name="skills"
              value={candidate.skills}
              onChange={onChange}
              placeholder="Qualifications/Skills"
            />
            <Input
              type="number"
              step={"0.1"}
              min="0"
              name="node"
              value={candidate.node}
              onChange={onChange}
              placeholder="Node js experience in Yrs"
            />
            <Input
              type="number"
              step={"0.1"}
              min="0"
              name="react"
              value={candidate.react}
              onChange={onChange}
              placeholder="React js experience in Yrs"
            />
            <Input
              type="number"
              name="salary"
              value={candidate.salary}
              onChange={onChange}
              placeholder="Expected salary"
            />

            <p align="right">
              <SubmitButton type="submit">
                <SignUpIcon className="icon" />
                <span className="text">Update</span>
              </SubmitButton>
            </p>
          </Form>
        </Column>
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};

export default CandidateEdit;
