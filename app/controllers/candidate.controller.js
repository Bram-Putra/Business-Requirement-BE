const db = require("../models");
const Candidate = db.candidates;
const Op = db.Sequelize.Op;

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
            // create a Candidate
            const candidate = {
                email: req.body.email,
                password: req.body.password,
                givenName: req.body.givenName,
                familyName: req.body.familyName,
                dob: req.body.dob,
                height: req.body.height,
                weight: req.body.weight,
                address1: req.body.address1,
                address2: req.body.address2,
                city: req.body.city,
                province: req.body.province,
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
    // for SOFT delete, comment rows 125-143
    // and uncomment rows 101-123
    // for hard delete, comment rows 95-97 and 101-119
    // and uncomment rows 125-143

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

// delete all Candidates from the database
exports.deleteAll = (req, res) => {
    Candidate.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} Candidates were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all Candidates."
            });
        });
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