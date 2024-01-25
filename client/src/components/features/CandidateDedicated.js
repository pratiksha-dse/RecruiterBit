import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import StatsIllustrationSrc from "images/stats-illustration.svg";
import { ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";



const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto relative`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-5 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full rounded sm:rounded-none sm:rounded-tl-2xl sm:rounded-tr-2xl sm:rounded-bl-2xl sm:rounded-br-2xl`,
]);
const TextContent = tw.div` text-primary-800 lg:py-8 text-center md:text-left`;

const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Statistics = tw.div`flex flex-col items-center sm:block text-center md:text-left mt-4`;
const Statistic = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-0`;
const Key = tw.div`font-medium text-gray-700`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-8 md:mt-5 text-sm inline-block mx-auto md:mx-0 rounded sm:rounded-none sm:rounded-br-4xl sm:rounded-tl-4xl sm:rounded-bl-4xl sm:rounded-tr-4xl`;

const DecoratorBlob = styled(SvgDotPattern)((props) => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`,
]);

export default ({
  heading = <>Title</>,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  imageSrc = StatsIllustrationSrc,
  imageCss = null,
  imageContainerCss = null,
  imageDecoratorBlob = false,
  imageDecoratorBlobCss = null,
  imageInsideDiv = true,
  statistics = null,
  textOnLeft = false,
  candidate = {},
}) => {
  const defaultStatistics = [];

  if (!statistics) statistics = defaultStatistics;
  const d = async () => {
    await candidate;
  };
  d();

  const contacT = (candidate ? candidate.contact : null)
    ? candidate
      ? candidate.contact
      : null
    : null;
  const statuS = (candidate ? candidate.status : null)
    ? candidate
      ? candidate.status
      : null
    : "Pending";
  const emaiL = (candidate ? candidate.email : null)
    ? candidate
      ? candidate.email
      : null
    : null;
  const salarY = (candidate ? candidate.salary : null)
    ? candidate
      ? candidate.salary
      : null
    : null;


  console.log(candidate);
  return (
    <Container>
      <TwoColumn css={!imageInsideDiv && tw`md:items-center`}>
        <ImageColumn css={imageContainerCss}>
          {imageInsideDiv ? (
            <Image imageSrc={imageSrc} css={imageCss} />
          ) : (
            <img src={imageSrc} css={imageCss} alt="" />
          )}
          {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>
              {(candidate ? candidate.name : null)
                ? candidate
                  ? candidate.name
                  : null
                : heading}
            </Heading>

            <Description>
              {"Skills: "}
              {(candidate ? candidate.skills : null)
                ? candidate
                  ? candidate.skills
                  : null
                : description}
            </Description>
            <Description>
              {"Node JS experience:  "}
              {(candidate ? candidate.node : null)
                ? candidate
                  ? candidate.node
                  : null
                : 0}
              {" Yr"}
            </Description>
            <Description>
              {"React Js Experience:  "}
              {(candidate ? candidate.react : null)
                ? candidate
                  ? candidate.react
                  : null
                : 0}
              {" Yr"}
            </Description>
       
            <Statistics>

              <Statistic key={1}>
                <Key>Contact: {contacT}</Key>
              </Statistic>

            </Statistics>
            <Statistics>
              <Statistic key={1}>
                <Key>Email: {emaiL}</Key>
              </Statistic>
            </Statistics>
            <Statistics>
              <Statistic key={1}>
                <Key>Expected Salary: {salarY}</Key>
              </Statistic>
            </Statistics>
            <Statistics>
              <Statistic key={1}>
                <Key><PrimaryButton as="a" target="_blank">
                  {statuS}
                </PrimaryButton></Key>
              </Statistic>
            </Statistics>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
