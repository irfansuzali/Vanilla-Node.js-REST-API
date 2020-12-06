// Database interaction, CRUD (Create, Read, Update, Delete) methods
let products = require('../data/products')
const {v4: uuidv4} = require('uuid')
const { writeDataToFile} = require('../utils')

//@Description: Retrieve all products
function findAll() {
  return new Promise((resolve,reject) => {
    resolve(products)
  })
}

//@Description: Retrieve a product by ID
function findById(id) {
  return new Promise((resolve,reject) => {
    const product = products.find((p) => p.id === id)
    resolve(product)
  })
}

//@Description: Create new product and update database
function create(product) {
  return new Promise((resolve,reject) => {
    const newProduct = {
      id: uuidv4(),
      ...product
    }
    products.push(newProduct)
    writeDataToFile('./data/products.json', products)
    resolve(newProduct)
  })
}

//@Description: Update a product and database
function update(id, productData) {
  return new Promise((resolve,reject) => {
    const index = products.findIndex((p) => p.id === id)
    products[index] = {
      id: id,
      ...productData
    }
    writeDataToFile('./data/products.json', products)
    resolve(products[index])
  })
}

//@Description: Remove a product and update database
function remove(id) {
  return new Promise((resolve,reject) => {
    products = products.filter((p) => p.id !== id)
    writeDataToFile('./data/products.json', products)
    resolve()
  })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
}
