//utils
const staging = require('../config/staging_env.json')
const mongoose = require('mongoose')

const URI =
  'mongodb+srv://Team6:BEv7VDdBxpH4vUDK@cluster0.o3fhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

function db() {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to Team6 database`)) //${staging.testing_db}
    .catch((err) => error('Could not connect to DB...Please try again'))
}
module.exports = db
