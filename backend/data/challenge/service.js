function ChallengeService(ChallengeModel) {
  let service = {
    create,
    findByPoint,
    find,
  };

  function create(challenge) {
    let newChallenge = ChallengeModel(challenge);
    return save(newChallenge);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Could not create the challenge");

        resolve({
          message: "Challenge Created",
          challenge: model,
        });
      });
    });
  }

  // challenges of one point of interest
  function findByPoint(point) {
    return new Promise(function (resolve, reject) {
      ChallengeModel.find({ point }, function (err, challenges) {
        if (err) reject("Could not load the challenges");

        resolve(challenges);
      });
    });
  }

  function find(id) {
    return new Promise(function (resolve, reject) {
      ChallengeModel.findById(id, function (err, challenge) {
        if (err) reject("Challenge not found");

        resolve(challenge);
      });
    });
  }

  return service;
}

module.exports = ChallengeService;