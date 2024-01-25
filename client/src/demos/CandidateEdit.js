import React, { useContext, useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";


import CandidateService from "../Services/CandidateService";

import tw from "twin.macro";

import CandidateDedicated from "components/features/CandidateDedicated";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";
import CandidateEdit from "components/features/CandidateEdit";
const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default (props) => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);  
  const CandidateID = props.location.search.slice(1);
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    console.log("cand", CandidateID);
    CandidateService.getCandidateByID(CandidateID).then(
      (data) => {
        setCandidate(data.candidate);
        console.log(candidate);
      }
    );
  }, []);
  const userLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
         <div id="candidatededicated">
            <CandidateDedicated candidate={candidate} />
          </div>
     
          <div id="candidate_edit">
            <CandidateEdit candidateOld={candidate} SEID={CandidateID} />
          </div>
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };
  const page = () => {
    if (isAuthenticated && !isAdmin) return userLP();
  };
  return <>{page()}</>;
};
