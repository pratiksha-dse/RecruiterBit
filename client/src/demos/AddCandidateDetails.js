import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";

import AddCandidateDetails from "components/features/AddCandidateDetails.js";

import tw from "twin.macro";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";


export default () => {
  const {
    isAuthenticated,
    isAdmin,
  } = useContext(AuthContext);

  const userLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
          <div id="addcandidatedetails">
            <AddCandidateDetails />
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
