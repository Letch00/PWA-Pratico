const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const Rooms = require("../data/room");
const Users = require("../data/users");
const VerifyToken = require("../middleware/token");
const pagination = require("../middleware/pagination");

function RoomRouter() {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));
  router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  const auth = [cookieParser(), VerifyToken];

  router
    .route("/")
    // público: o guia lista as salas
    .get(pagination, function (req, res) {
      Rooms.findAll(req.pagination)
        .then((result) => res.status(200).send(result))
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: err });
        });
    })
    // backoffice
    .post(auth, Users.autorize(["admin", "manager", "user"]), function (req, res) {
      Rooms.create(req.body)
        .then((result) => res.status(201).send(result))
        .catch((err) => {
          console.error(err);
          res.status(500).send({ message: err });
        });
    });

  router.route("/:roomId").get(function (req, res) {
    Rooms.find(req.params.roomId)
      .then((room) => {
        if (!room) return res.status(404).send({ message: "Room not found" });
        res.status(200).send(room);
      })
      .catch((err) => res.status(500).send({ message: err }));
  });

  return router;
}

module.exports = RoomRouter;