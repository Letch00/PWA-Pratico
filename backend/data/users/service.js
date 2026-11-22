const config = require("../../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function UserService(UserModel) {
  return { createToken, verifyToken, findUser, autorize };

  function createToken(user) {
    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, config.secret, {
      expiresIn: config.expiresPassword,
    });
    return { auth: true, token };
  }

  function verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return reject();
        resolve(decoded);
      });
    });
  }

  function findUser({ name, password, isQrCode }) {
    return UserModel.findOne({ name }).then((user) => {
      if (!user) return Promise.reject("This data is wrong");

      if (isQrCode) {
        return user.password === password ? user : Promise.reject("User not valid");
      }
      return bcrypt.compare(password, user.password).then((match) =>
        match ? user : Promise.reject("User not valid")
      );
    });
  }

  // uso: router.get("/x", Autorize(["admin", "manager"]), ...)
  function autorize(scopes) {
    return (req, res, next) => {
      if (scopes.includes(req.roleUser)) {
        next();
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    };
  }
}

module.exports = UserService;