module.exports = {
    HOST: "localhost",
    USER: "resta_user",
    PASSWORD: "resu_atser",
    DB: "resta",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};