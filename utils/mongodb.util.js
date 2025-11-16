const { MongoClient } = require("mongodb");

class MongoDB {
  static client = null;
  
  static connect = async (uri) => {
    if (this.client) {
      return this.client;
    }
    try {
      this.client = await MongoClient.connect(uri);
      return this.client;
    } catch (error) {
      throw error;
    }
  };
  
  static getClient() {
    if (!this.client) {
      throw new Error("MongoDB client not initialized. Call connect() first.");
    }
    return this.client;
  }
}

module.exports = MongoDB;