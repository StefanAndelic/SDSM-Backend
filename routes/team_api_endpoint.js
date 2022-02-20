//utils
const express = require("express");
const bcrypt = require("bcrypt");

//model
const { Team } = require("../models/team_model");

const router = express.Router();

/*
 * returns all members from DB
 */
router.get("/", async (req, res) => {
  const member = await Team.find().select("-__v").sort("name");
  if (!member) return res.status(404).send("Team members could not be found");

  res.send(member);
});

/*
 * posts a user to the db
 */
router.post("/", async (req, res, next) => {
  //check if user already exists in DB
  let team_member = await Team.findOne({ email: req.body.email });

  if (team_member != null) {
    return res.status(400).send("Team member already exists");
  }

  const member = new Team({
    id: req.body.id,
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
  });

  //generates the salt value of 10
  const salt = await bcrypt.genSalt(10);

  //hashes the password with the generated salt
  member.password = await bcrypt.hash(member.password, salt);

  member.save();

  res.status(201).json({
    message: "Team member added",
    createdMember: member,
  });
});

/*
 * deletes a user from the db
 */
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  //if it doesn't exit throw an error
  if (!id) return res.status(404).send("User does not exist in DB");

  Team.deleteMany({ id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
