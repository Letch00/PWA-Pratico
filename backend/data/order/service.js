function OrderService(OrderModel) {
  let service = {
    create,
    findAll,
    findBySession,
    update,
  };

  function create(order) {
    let newOrder = OrderModel(order);
    return save(newOrder);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Could not create the order");

        resolve({
          message: "Order Created",
          order: model,
        });
      });
    });
  }

  // Manager/Admin: filter can have { status } or { createdAt: { $gte, $lte } }
  function findAll(pagination, filter = {}) {
    const { limit, skip } = pagination;

    return new Promise(function (resolve, reject) {
      OrderModel.find(filter, {}, { skip, limit }, function (err, orders) {
        if (err) reject("Could not load the orders");

        resolve(orders);
      });
    }).then(async (orders) => {
      const total = await OrderModel.count(filter);

      return Promise.resolve({
        data: orders,
        pagination: {
          pageSize: limit,
          page: Math.floor(skip / limit),
          hasMore: skip + limit < total,
          total: total,
        },
      });
    });
  }

  // orders of one visitor session
  function findBySession(session) {
    return new Promise(function (resolve, reject) {
      OrderModel.find({ session }, function (err, orders) {
        if (err) reject("Could not load the session orders");

        resolve(orders);
      });
    });
  }

  // used to change the status (confirmed -> ready -> delivered)
  function update(id, order) {
    return new Promise(function (resolve, reject) {
      OrderModel.findByIdAndUpdate(id, order, { new: true }, function (err, orderUpdated) {
        if (err) reject("Could not update the order");

        resolve(orderUpdated);
      });
    });
  }

  return service;
}

module.exports = OrderService;