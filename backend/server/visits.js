const bodyParser = require("body-parser");
const express = require("express");
const Sessions = require("../data/visitorSession");

function VisitsRouter() {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));

  // começa a visita: o frontend guarda o _id da sessão
  router.route("/").post(function (req, res) {
    Sessions.create()
      .then((result) => res.status(201).send(result))
      .catch((err) => res.status(500).send({ message: err }));
  });

  router.route("/:sessionId").get(function (req, res) {
    Sessions.find(req.params.sessionId)
      .then((session) => {
        if (!session) return res.status(404).send({ message: "Session not found" });
        res.status(200).send(session);
      })
      .catch((err) => res.status(500).send({ message: err }));
  });

  return router;
}

module.exports = VisitsRouter;