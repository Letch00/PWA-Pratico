const bodyParser = require("body-parser");
const express = require("express");
const Users = require("../data/users");
const cookieParser = require('cookie-parser');
const VerifyToken = require('../middleware/token');

function AuthRouter() {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));
  router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  router.route("/login").post(function (req, res) {
    return Users.findUser(req.body)
      .then((user) => Users.createToken(user))
      .then((response) => {
        res.cookie("token", response.token, { httpOnly: true });
        res.status(200).send(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  });

  router.use(cookieParser());
  router.use(VerifyToken);

  router.route("/logout").get(function (req, res) {
    res.cookie("token", req.cookies.token, { httpOnly: true, maxAge: 0 });
    res.status(200).send({ logout: true });
  });

  router.route("/me").get(function (req, res) {
    res.status(202).send({ auth: true, decoded: req.roleUser });
  });

  return router;
}

module.exports = AuthRouter;