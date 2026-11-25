function RouteService(RouteModel) {
  let service = {
    create,
    findAll,
    find,
  };

  function create(route) {
    let newRoute = RouteModel(route);
    return save(newRoute);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Could not create the route");

        resolve({
          message: "Route Created",
          route: model,
        });
      });
    });
  }

  function findAll(pagination, filter = {}) {
    const { limit, skip } = pagination;

    return new Promise(function (resolve, reject) {
      RouteModel.find(filter, {}, { skip, limit }, function (err, routes) {
        if (err) reject(err);

        resolve(routes);
      });
    }).then(async (routes) => {
      const total = await RouteModel.count(filter);

      return Promise.resolve({
        data: routes,
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
      RouteModel.findById(id)
        .populate("points")
        .exec(function (err, route) {
          if (err) reject(err);

          resolve(route);
        });
    });
  }

  return service;
}

module.exports = RouteService;