function PointOfInterestService(PoiModel) {
  let service = {
    create,
    findAll,
    find,
  };

  function create(poi) {
    let newPoi = PoiModel(poi);
    return save(newPoi);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Could not create the point of interest");

        resolve({
          message: "Point Created",
          point: model,
        });
      });
    });
  }

  function findAll(pagination, filter = {}) {
    const { limit, skip } = pagination;

    return new Promise(function (resolve, reject) {
      PoiModel.find(filter, {}, { skip, limit }, function (err, points) {
        if (err) reject(err);

        resolve(points);
      });
    }).then(async (points) => {
      const total = await PoiModel.count(filter);

      return Promise.resolve({
        data: points,
        pagination: {
          pageSize: limit,
          page: Math.floor(skip / limit),
          hasMore: skip + limit < total,
          total: total,
        },
      });
    });
  }

  function find(id) {
    return new Promise(function (resolve, reject) {
      PoiModel.findById(id, function (err, point) {
        if (err) reject(err);

        resolve(point);
      });
    });
  }

  return service;
}

module.exports = PointOfInterestService;