const fs = require('fs')

//@Description: Writing to database using synchronous function
function writeDataToFile(filename,content) {
  fs.writeFileSync(filename,JSON.stringify(content), 'utf8',(err) => {
    if(err){
      console.log(err)
    }
  })
}

//@Description: Retrieve all data from body of HTTP request
function getPostData(req){
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk.toString()
      })
      req.on('end', () => {
        resolve(body)
      })
    } catch (error){
      reject(error)
    }
  })
}

module.exports = {
  writeDataToFile,
  getPostData
}
