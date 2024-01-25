const express = require("express");
const candidateRouter = express.Router();

const Candidate = require("../models/Candidate");

candidateRouter.post("/addcandidate", (req, res) => {
  const { name,contact,email,skills,node, react, salary } = req.body;

  const newCandidate = new Candidate({
    name:name,
    contact:contact,
    email:email,
    skills:skills,
    node:node,
    react:react,
    salary:salary,
    status:"Pending",

  });
  

  newCandidate.save((err) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    else
      res.status(201).json({
        message: {
          msgBody: "Candidate successfully added",
          msgError: false,
        },
      });
  });
});

candidateRouter.post("/editcandidate", (req, res) => {
  console.log(req.body.candidate)
  Candidate.findByIdAndUpdate(req.body.SEID, req.body.candidate, (err) => {
    if (err) {
      console.log("Candidate failed to update");
      res.status(500).json({
        message: { msgBody: "Candidate failed to update", msgError: true },
      });
    } else {
      console.log("Candidate updated successfully");
    }
  });
});


candidateRouter.get("/candidates", (req, res) => {
  console.log("Fetching Candidates");
  Candidate.find().exec((err, document) => {
    if (err) {
      console.log("Candidates failed to fetch");
      res.status(500).json({
        message: { msgBody: "Candidates failed to fetch", msgError: true },
      });
    } else {
      console.log("Candidates fetched successfully",document);
      res.status(200).json({ candidates: document });
    }
  });
});
candidateRouter.post("/getcandidatebyid", (req, res) => {
  console.log("Fetching Candidate",req.body);
  Candidate.findById(req.body._id).exec((err, document) => {
    if (err) {
      console.log("Candidate failed to fetch");
      res.status(500).json({
        message: { msgBody: "Candidate failed to fetch", msgError: true },
      });
    } else {
      console.log("Candidate fetched successfully",document);
      res.status(200).json({ candidate: document });
    }
  });
});
module.exports = candidateRouter;
