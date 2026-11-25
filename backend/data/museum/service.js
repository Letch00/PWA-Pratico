function MuseumService(MuseumModel) {
  let service = {
    create,
    find,
  };

  function create(museum) {
    let newMuseum = MuseumModel(museum);
    return save(newMuseum);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Could not save the museum data");

        resolve({
          message: "Museum saved",
          museum: model,
        });
      });
    });
  }

  function find() {
    return new Promise(function (resolve, reject) {
      MuseumModel.findOne({}, function (err, museum) {
        if (err) reject(err);

        resolve(museum);
      });
    });
  }

  return service;
}

module.exports = MuseumService;