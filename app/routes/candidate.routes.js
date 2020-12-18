module.exports = app => {
    const candidate = require("../controllers/candidate.controller.js");
    const { validateCandidate } = require('../validators/candidate.validator');
  
    var router = require("express").Router();
  
    // Create a new Candidate
    router.post("/", validateCandidate, candidate.create);
  
    // Retrieve all Candidates
    router.get("/", candidate.findAll);
  
    // Retrieve all active Candidates
    router.get("/active", candidate.findAllActive);
  
    // Retrieve a single Candidate with id
    router.get("/:id", candidate.findOne);
  
    // Update a Candidate with id
    router.put("/:id", validateCandidate, candidate.update);
  
    // Update a Candidate with id
    router.put("/login/auth/", validateCandidate, candidate.login);
  
    // Delete a Candidate with id
    router.delete("/:id", candidate.delete);
  
    // Delete all Candidates
    // router.delete("/", candidates.deleteAll);
  
    app.use('/api/candidates', router);
  };