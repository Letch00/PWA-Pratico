const crypto = require("crypto");

function VisitorSessionService(SessionModel) {
  let service = {
    create,
    find,
  };

  function create() {
    let newSession = SessionModel({
      token: crypto.randomBytes(24).toString("hex"),
    });
    return save(newSession);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Could not start the visit session");

        resolve({
          message: "Session Created",
          session: model,
        });
      });
    });
  }

  function find(id) {
    return new Promise(function (resolve, reject) {
      SessionModel.findById(id, function (err, session) {
        if (err) reject(err);

        resolve(session);
      });
    });
  }

  return service;
}

module.exports = VisitorSessionService;