//utils
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//model
const { Team } = require("../models/team_model");

const router = express.Router();

/*
 * authenticates the member
 */
router.post("/", async (req, res) => {
  let member = await Team.findOne({ email: req.body.email });
  if (!member) return res.status(400).send("Invalid email ");
  const validPassword = await bcrypt.compare(
    req.body.password,
    member.password
  );
  if (!validPassword) return res.status(400).send("Invalid password");

  //generate the token
  const token = jwt.sign(
    {
      id: member.id,
      name: member.name,
      email: member.email,
      role: member.role,
      password: member.password,
    },

    "jwtPrivateKey",
    { expiresIn: 60 * 60 }
  );

  //send response
  res.send(token);
});

module.exports = router;
