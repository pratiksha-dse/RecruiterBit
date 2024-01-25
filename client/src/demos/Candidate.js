import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";

import UserCandidateDetails from "components/cards/UserCandidateDetails.js";

import tw from "twin.macro";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";
import CandidateDetails from "components/cards/CandidateDetails";

const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default () => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  // console.log(isAdmin, user)

  const userLP = () => {
    if (isAdmin) {
      return (
        <>
          <AnimationRevealPage>
            <Hero getstarted="#bookaslot" />
            <div id="admin_candidates">
              <CandidateDetails/>
            </div>
          </AnimationRevealPage>
          <Footer />
        </>
      );
    }
    else {
      return (
        <>
          <AnimationRevealPage>
            <Hero getstarted="#bookaslot" />
            <div id="candidate">
              <UserCandidateDetails />
            </div>

          </AnimationRevealPage>
          <Footer />
        </>
      );
  }
};
const page = () => {
  if (isAuthenticated && !isAdmin) return userLP();
};
return <>{page()}</>;
};
