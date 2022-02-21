const { MongoClient } = require("mongodb");
const config = require('./config');

const connectionString = `mongodb://${config.db.host}:${config.db.port}`;
const mongoClient = new MongoClient(connectionString);

module.exports = {
    connect: async function () {
      try{
        let client = await mongoClient.connect();
        console.log("Successfully connected to MongoDB.");
        return client.db("taskdb");
      }
      catch(error) {
        console.error(`Fatal error occurred: ${error}`);
        return null;
      }
    }
  };