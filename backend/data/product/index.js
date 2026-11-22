const Products = require('./product');
const ProductsService = require('./service');

const service = ProductsService(Products);

module.exports = service;