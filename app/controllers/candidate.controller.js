const db = require("../models");
const Candidate = db.candidates;
const Op = db.Sequelize.Op;
const hashAndSalt = require('password-hash-and-salt');
const path = require('path');

// create and save a new Candidate
exports.create = (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            message: "Content cannot be empty."
        });
        return;
    }

    const email = req.body.email;
    var condition = email ? { email: { [Op.eq]: `${email}` } } : null;
    Candidate.findAll({ where: condition }).then(data => {
        if((data == "")) {
            // hash and salt password
            var password = req.body.password;
            hashAndSalt(password).hash(function(error, hash) {
                if (error) {
                    throw new Error('Something went wrong!');
                }

                // create a Candidate
                const candidate = {
                    email: req.body.email,
                    password: hash,
                    photoPath: 'uploads/profile.png',
                    givenName: req.body.givenName,
                    familyName: req.body.familyName,
                    dob: req.body.dob,
                    height: req.body.height,
                    weight: req.body.weight,
                    address1: req.body.address1,
                    address2: req.body.address2,
                    city: req.body.city,
                    province: req.body.province,
                    role: req.body.role,
                    active: req.body.active ? req.body.active : false
                };

                // save Candidate in the database
                Candidate.create(candidate)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Candidate."
                        });
                    });
                });
        } else {
            res.status(500).send({
                message:
                    "Email is already registered."
            });
        }
    });
};

// retrieve all Candidates from the database
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

    Candidate.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving candidates."
            });
        });
};

// find a single Candidate with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Candidate.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Candidate with id=" + id
            });
        });
};

// update a Candidate by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Candidate.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                message: "Candidate was updated successfully."
                });
            } else {
                res.send({
                message: `Cannot update Candidate with id=${id}. Maybe Candidate was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Candidate with id=" + id
            });
        });
};

// delete a Candidate with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    // TODO:
    // for SOFT delete, comment rows 157-175
    // and uncomment rows 133-155
    // for HARD delete, comment rows 133-155
    // and uncomment rows 157-175

    req.body = {
        active: false
    };
    
    Candidate.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                message: "Candidate with id="+id+" was safely deleted."
                });
            } else {
                res.send({
                message: `Cannot soft delete Candidate with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Candidate with id=" + id
            });
        });
    
    // Candidate.destroy({
    //         where: { id: id }
    //     })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //             message: "Candidate was deleted successfully!"
    //             });
    //         } else {
    //             res.send({
    //             message: `Cannot delete Candidate with id=${id}. Maybe Candidate was not found!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Could not delete Candidate with id=" + id
    //         });
    //     });
};

// find all active Candidates
exports.findAllActive = (req, res) => {
    Candidate.findAll({ where: { active: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving candidates."
            });
        });
};

// update a Candidate by the id in the request
exports.login = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
    Candidate.findOne({ where: condition })
        .then(data => {
            hashAndSalt(password).verifyAgainst(data.password, function(error, verified) {
                if(error) {
                    throw new Error('Something went wrong!');
                }
                    
                if(!verified) {
                    res.send(null);
                } else {
                    res.send(data);
                }
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                "Email is not registered."
            });
        });
};

// to record the path to the profile photo
exports.upload = (req, res) => {
    var candidate = { photoPath: req.file.path };
    const id = req.params.id;
    Candidate.update(candidate, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                message: "Photo has been stored."
                });
            } else {
                res.send({
                message: `Cannot store the photo of Candidate with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error storing the photo Candidate with id=" + id
            });
        });
};

// to send profile photo to the front end
exports.getProfilePhoto = (req, res) => {
    const id = req.params.id;
    Candidate.findByPk(id)
        .then(data => {
            var photoPath = path.join(__dirname, '../../'+data.dataValues.photoPath);
            res.sendFile(photoPath);
        });
};