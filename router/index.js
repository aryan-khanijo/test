const express = require("express");
const router = express.Router();
const knex = require("../connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.use("/admin", require("./admin"));
router.use("/user", require("./users"));
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let secret = process.env.JWT_USER_SECRET;
  const users = await knex("users").select("*").where("username", username);
  if (!users.length) return res.status(400).json({ messasge: "no user found" });
  const user = users[0];
  const passwordHash = user.password;
  const match = await bcrypt.compare(password, passwordHash);
  if (!match) return res.status(400).json({ messasge: "incorrect password" });
  const role = await knex("roles").select("*").where("id", user.role_id);
  if (role[0].name === "admin") secret = process.env.JWT_ADMIN_SECRET;
  const token = jwt.sign({ ...user, ...role[0] }, secret);
  return res.status(200).json({
    token,
  });
});

router.post("/signup", async (req, res) => {
  const obj = _.pick(req.body, ["name", "username", "password"]);
  const checkUser = await knex("users")
    .select("*")
    .where("username", obj.username);
  if (checkUser.length)
    return res.status(400).json({ message: "user Already exists" });
  const salt = await bcrypt.genSalt(10);
  const roles = await knex("roles").where("name", "user");
  await knex("users").insert({
    name: obj.name,
    username: obj.username,
    password: await bcrypt.hash(obj.password, salt),
    role_id: roles[0].id,
  });
  return res.status(201).json({ message: "success" });
});

module.exports = router;
