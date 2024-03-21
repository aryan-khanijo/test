const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const _ = require("lodash");
const knex = require("../connection");

router.use(userAuth);


router.get("/projects", async (req, res) => {
  const projects = await knex("projects").select("*");
  return res.status(200).json(projects);
});

router.post("/bid", async (req, res) => {
  const amt = req.body.amount;
  const project = req.body.project;
  await knex("bids").insert({
    bider_id: req.user.id,
    amount: amt,
    project_id: project,
  });

  return res.status(201).send("Success");
});

module.exports = router;
