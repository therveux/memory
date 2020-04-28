const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connectionString = process.env.DATABASE_URL

try {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "memory"
  });
} catch (e) {
  console.log("ERROR ", e);
}
