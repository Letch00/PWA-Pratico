const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const Orders = require("../data/order");
const Users = require("../data/users");
const VerifyToken = require("../middleware/token");
const pagination = require("../middleware/pagination");

function OrderRouter(io) {
  let router = express();

  router.use(bodyParser.json({ limit: "100mb" }));
  router.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

  const auth = [cookieParser(), VerifyToken];

  router
    .route("/")
    // visitante cria a encomenda
    .post(function (req, res) {
      // TODO: validar stock e preços com Products.find e calcular o total aqui
      Orders.create(req.body)
        .then((result) => {
          io.sockets.emit("admin_notifications", {
            message: "New order",
            key: "Order",
          });
          res.status(201).send(result);
        })
        .catch((err) => res.status(500).send({ message: err }));
    })
    // Gestor/Admin: todas (?status=ready)
    .get(auth, Users.autorize(["admin", "manager"]), pagination, function (req, res) {
      let filter = {};
      if (req.query.status) filter.status = req.query.status;

      Orders.findAll(req.pagination, filter)
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(500).send({ message: err }));
    });

  // visitante: encomendas da sua sessão
  router.route("/session/:sessionId").get(function (req, res) {
    Orders.findBySession(req.params.sessionId)
      .then((orders) => res.status(200).send(orders))
      .catch((err) => res.status(500).send({ message: err }));
  });

  // Gestor/Admin muda o estado (confirmed -> ready -> delivered)
  router
    .route("/:orderId")
    .put(auth, Users.autorize(["admin", "manager"]), function (req, res) {
      Orders.update(req.params.orderId, { status: req.body.status })
        .then((order) => {
          if (req.body.status === "ready") {
            io.sockets.emit("order_ready", { orderId: order._id });
          }
          res.status(200).send(order);
        })
        .catch((err) => res.status(500).send({ message: err }));
    });

  return router;
}

module.exports = OrderRouter;