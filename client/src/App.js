import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import UserRoute from "./hocs/UserRoute";
import AdminRoute from "./hocs/AdminRoute";
import Home from "demos/Home.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import AdminCandidateView from "demos/AdminCandidateView";
import Candidate from "demos/Candidate";
import AdminCandidates from "demos/AdminCandidates";
import CandidateEdit from "demos/CandidateEdit";
import AddCandidateDetails from "demos/AddCandidateDetails";


export default function App() {

  return (
    <Router>
      <Switch>
       
      
        <UserRoute exact path="/candidate" component={Candidate} />
        <UserRoute path="/candidate_edit" component={CandidateEdit} />
        <UserRoute path="/addcandidatedetails" component={AddCandidateDetails} />

        <AdminRoute exact path="/admin_candidates" component={AdminCandidates} />
        <AdminRoute path="/admin_candidate" component={AdminCandidateView} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
