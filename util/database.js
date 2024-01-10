const { MongoClient } = require("mongodb");
const url = "mongodb+srv://admin:"+process.env.NEXTAUTH_SECRET+"@cluster0.sltoxb3.mongodb.net/forum?retryWrites=true&w=majority"
const options = { useNewUrlParser: true }
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }