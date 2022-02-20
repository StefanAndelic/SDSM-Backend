const { Project } = require('../models/project_model')
const mongoose = require('mongoose')
const db = require('../config/staging_env.json')

const data = [
  {
    id: '1',
    phase: 'Start',
    activity: 'Initiate Project',
    task: 'Develop Quality Management Plan',
    input: '**INPUT**',
    output: 'Define Project Management System',
  },
  {
    id: '2',
    phase: 'Start',
    activity: 'Initiate Project',
    task: 'Develop Quality Management Plan',
    input: '**INPUT**',
    output: 'Define Project Management System',
  },
  {
    id: '3',
    phase: 'Start',
    activity: 'Initiate Project',
    task: 'Develop Quality Management Plan',
    input: '**INPUT**',
    output: 'Define Project Management System',
  },
  {
    id: '4',
    phase: 'Start',
    activity: 'Initiate Project',
    task: 'Develop Quality Management Plan',
    input: '**INPUT**',
    output: 'Define Project Management System',
  },
]

function connectDB() {
  const URI =
    'mongodb+srv://Team6:BEv7VDdBxpH4vUDK@cluster0.o3fhw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  //`mongodb://localhost/${db.testing_db}`
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${db.testing_db} database`))
    .catch((err) => error('Could not connect to DB...Please try again'))
}

async function seed() {
  connectDB()

  await Project.deleteMany({})

  for (let project of data) {
    const project_object = await new Project({
      id: project.id,
      phase: project.phase,
      activity: project.activity,
      task: project.task,
      input: project.input,
      output: project.output,
    }).save()

    await Project.insertMany(project)
  }

  mongoose.disconnect()

  console.info('Done!')
  console.info('Project DB table sucessfully populated!')
}

seed()
