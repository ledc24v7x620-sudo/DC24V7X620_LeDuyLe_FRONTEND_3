const app = require("./app");
const config = require("./config");
const MongoDB = require("./utils/mongodb.util");

async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);

    const PORT = config.app.port;
    app.listen(PORT, () => {
      // Server started
    });
  } catch (error) {
    process.exit();
  }
}

startServer();
