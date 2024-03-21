const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const _ = require("lodash");
const knex = require("../connection");

router.use(adminAuth);
router.post("/project", async (req, res) => {
  const obj = _.pick(req.body, ["name", "expiry", "isActive", "description"]);
  await knex("projects").insert({
    ...obj,
    expiry: new Date(obj.expiry),
    owner_id: req.user.id,
  });
  return res.status(201).send("success");
});

router.patch("/projectStatus/:id", async (req, res) => {
  const status = req.body.isActiveStatus;
  const project = await knex("projects").where("id", req.params.id);
  if (!project.length) return res.status(404).send("project not found");
  await knex("projects").where("id", id).update({
    isActive: status,
  });
  return res.status(204);
});

router.get("/projects", async (req, res) => {
  const projects = await knex("projects").select("*");
  return res.status(200).json(projects);
});

router.get("/bids/:pId", async (req, res) => {
  const project = await knex("projects").where("id", req.params.pId);
  if (!project.length) return res.status(404).send("project not found");
  const bids = await knex("bids")
    .select("*")
    .where("project_id", req.params.pId);
  return res.status(200).json(bids);
});

router.put("/projectAssignee/:id", async (req, res) => {
  const project = await knex("projects").where("id", req.params.id);
  if (!project.length) return res.status(404).send("project not found");
  const bids = await knex("bids")
    .select("*")
    .where("project_id", req.params.pId, "approved", true);

  const lowestBid = bids.reduce(
    (prev, current) => (prev.amount < current.amount ? prev : current),
    {}
  );

  await knex("projects").where("id", req.params.id).update({
    assignee: lowestBid.bider_id,
  });
  const user = await knex("users").where("id", lowestBid.bider_id);
  return res.status(200).json(user[0]);
});

router.put("/bidApproved/:id", async (req, res) => {
  await knex("bids").where("id", req.param.id).update({
    approved: true,
  });
  return res.status(204);
});

module.exports = router;
