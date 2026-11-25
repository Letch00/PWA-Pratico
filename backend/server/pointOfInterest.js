const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const Points = require("../data/pointOfInterest");
const Users = require("../data/users");
const VerifyToken = require("../middleware/token");
const pagination = require("../middleware/pagination");

function PointRouter() {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));
  router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  const auth = [cookieParser(), VerifyToken];

  // backoffice: todos os pontos (com rascunhos). Tem de vir antes do "/:pointId"
  router
    .route("/backoffice")
    .get(auth, Users.autorize(["admin", "manager", "user"]), pagination, function (req, res) {
      Points.findAll(req.pagination)
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(500).send({ message: err }));
    });

  router
    .route("/")
    // público: só publicados (aceita ?room= e ?category=)
    .get(pagination, function (req, res) {
      let filter = { published: true };
      if (req.query.room) filter.room = req.query.room;
      if (req.query.category) filter.category = req.query.category;

      Points.findAll(req.pagination, filter)
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(500).send({ message: err }));
    })
    .post(auth, Users.autorize(["admin", "manager", "user"]), function (req, res) {
      let body = req.body;
      // o Utilizador só cria rascunhos
      if (req.roleUser === "user") body.published = false;

      Points.create(body)
        .then((result) => res.status(201).send(result))
        .catch((err) => res.status(500).send({ message: err }));
    });

  // público: ponto por id (é a página que o QR Code abre)
  router.route("/:pointId").get(function (req, res) {
    Points.find(req.params.pointId)
      .then((point) => {
        if (!point || !point.published) {
          return res.status(404).send({ message: "Point not found" });
        }
        res.status(200).send(point);
      })
      .catch((err) => res.status(500).send({ message: err }));
  });

  return router;
}

module.exports = PointRouter;