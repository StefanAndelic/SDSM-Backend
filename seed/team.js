const { Team } = require('../models/team_model')
const mongoose = require('mongoose')
const db = require('../config/staging_env.json')
const bcrypt = require('bcrypt')
const data = [
  {
    id: '1',
    name: 'Project Manager',
    email: 'PM@us.ibm.com',
    role: 'Project Manager',
    password: 'test1#',
  },
  {
    id: '2',
    name: 'test2',
    email: 'test2@ibm.com',
    role: 'Backend Engineer',
    password: 'test2#',
  },
]

async function connectDB() {
  const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.o3fhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  //`mongodb://localhost/${db.testing_db}`
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${process.env.DB_USERNAME} database`)) //db.testing_db
    .catch((err) => error('Could not connect to DB...Please try again'))
}

async function seedDB() {
  await connectDB()
  await Team.deleteMany({})

  for (let member of data) {
    await new Team({
      id: member.id,
      name: member.name,
      email: member.email,
      role: member.role,
      password: member.password,
    }).save()

    //generates the salt value of 10
    const salt = await bcrypt.genSalt(10)

    //hashes the password with the generated salt
    member.password = await bcrypt.hash(member.password, salt)

    await Team.insertMany(member)
  }

  mongoose.disconnect()

  console.info('Done!')
  console.info('Team DB table sucessfully populated!')
}

seedDB()
