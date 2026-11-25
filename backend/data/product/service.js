function ProductService(ProductModel) {
  let service = {
    create,
    findAll,
    find,
    update,
  };

  function create(product) {
    let newProduct = ProductModel(product);
    return save(newProduct);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Could not create the product");

        resolve({
          message: "Product Created",
          product: model,
        });
      });
    });
  }

  function findAll(pagination, filter = {}) {
    const { limit, skip } = pagination;

    return new Promise(function (resolve, reject) {
      ProductModel.find(filter, {}, { skip, limit }, function (err, products) {
        if (err) reject("Could not load the products");

        resolve(products);
      });
    }).then(async (products) => {
      const total = await ProductModel.count(filter);

      return Promise.resolve({
        data: products,
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
      ProductModel.findById(id, function (err, product) {
        if (err) reject("Product not found");

        resolve(product);
      });
    });
  }

  function update(id, product) {
    return new Promise(function (resolve, reject) {
      ProductModel.findByIdAndUpdate(id, product, { new: true }, function (err, productUpdated) {
        if (err) reject("Could not update the product");

        resolve(productUpdated);
      });
    });
  }

  return service;
}

module.exports = ProductService;