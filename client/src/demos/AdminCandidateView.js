import React, { useContext, useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";


import CandidateService from "../Services/CandidateService";

import tw from "twin.macro";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";
import AdminCandidateDedicated from "components/features/AdminCandidateDedicated";

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
    CandidateService.getCandidateByID(CandidateID).then((data) => {
      setCandidate(data.candidate);
      console.log(candidate);
    });
  }, []);

  console.log(CandidateID);
  console.log(candidate);
  const adminLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
      
          <div id="andidatededicated">
            <AdminCandidateDedicated candidate={candidate} SEID={CandidateID}/>
          </div>
     
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };
  const page = () => {
    if (isAuthenticated && isAdmin) return adminLP();
  };
  return <>{page()}</>;
};
