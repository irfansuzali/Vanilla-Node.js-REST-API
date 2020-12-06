const http = require('http')
const {getProducts, getProduct, createProduct, updateProduct, removeProduct} = require('./controllers/productController')


const server = http.createServer((req,res) => {
  //@Description: Retrieve all products
  //@HTTP request: GET http://localhost:PORT/api/products
  if(req.url === '/api/products' && req.method === 'GET'){
    getProducts(req,res)

  //@Description: Retrieve a product by ID
  //@HTTP request: GET http://localhost:PORT/api/products/:id
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3]
    getProduct(req,res,id)

  //@Description: Create new product
  //@HTTP request: POST http://localhost:PORT/api/products/
  } else if (req.url === '/api/products' && req.method === 'POST'){
    createProduct(req,res)

  //@Description: Update product information
  //@HTTP request: POST http://localhost:PORT/api/products/:id
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[3]
    updateProduct(req,res,id)

  //@Description: Remove a product
  //@HTTP request: DELETE http://localhost:PORT/api/products/:id
  } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3]
    removeProduct(req,res,id)

  //@Description: Error message
  } else {
    res.writeHead(404,{'Content-Type': 'application/json'})
    res.end(JSON.stringify({message: "Route Not Found"}))
  }
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
