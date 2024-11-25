const mongoose = require("mongoose")

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_DB)
        .then((conn) => {
            console.log("Database Connected " + conn.connection.host)
        })
        .catch((e) => {
            console.error('Database Error : ' + e)
            process.exit(1)
        })
}

module.exports = dbConnection