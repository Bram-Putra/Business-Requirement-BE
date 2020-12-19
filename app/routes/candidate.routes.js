module.exports = app => {
    const candidate = require("../controllers/candidate.controller.js");
    const { validateCandidate } = require('../validators/candidate.validator');

    const multer = require('multer');
    
    const myStorage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, './uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, Math.random().toString().substring(2) + file.originalname);
      }
    });

    const myFileFilter = function(req, file, cb) {
      if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png')) {
        cb(null, true);
      } else {
        cb(new Error('Only accept .jpg, .jpeg, or .png file'), false);
      }
    };
    
    const upload = multer({
      storage: myStorage,
      limits: {
        fileSize: 1024 * 1024 * 3
      },
      fileFilter: myFileFilter
    });
  
    var router = require("express").Router();
  
    // Create a new Candidate
    router.post("/", validateCandidate, candidate.create);

    // Upload Photo
    router.put("/upload/:id", upload.single('candidatePhoto'), candidate.upload);
  
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

    // Get the profile photo of Candidate with id
    router.get("/profile/photo/:id", candidate.getProfilePhoto);
  
    app.use('/api/candidates', router);
  };