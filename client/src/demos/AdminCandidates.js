import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";

import CandidateDetails from "components/cards/CandidateDetails.js";
import tw from "twin.macro";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";

export default () => {
  const {
    isAuthenticated,
    isAdmin,
  } = useContext(AuthContext);

  const adminLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
          <div id="admin_candidates">
            <CandidateDetails />
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
