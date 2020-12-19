module.exports = (sequelize, Sequelize) => {
    const Candidate = sequelize.define("candidate", {
        email: {
            type: Sequelize.STRING
        },
        password: {
            // hash-and-salted password will be 270 chars long
            // and this data type can store up to 1000 characters
            type: Sequelize.STRING(1000)
        },
        photoPath: {
            type: Sequelize.STRING
        },
        givenName: {
            type: Sequelize.STRING
        },
        familyName: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.DATE
        },
        height: {
            type: Sequelize.INTEGER
        },
        weight: {
            type: Sequelize.FLOAT
        },
        address1: {
            type: Sequelize.STRING
        },
        address2: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        province: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.BOOLEAN
        }
    });

    return Candidate;
};