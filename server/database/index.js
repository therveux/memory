const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connectionString =
  "mongodb+srv://hurobaki:Muvicote99.@cluster0-35nd4.mongodb.net/test?retryWrites=true&w=majority";

const uri =
  "mongodb+srv://mongoMemory:neLSjRN2amw2GZt@cluster0-35nd4.mongodb.net/test?retryWrites=true&w=majority";

try {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "memory"
  });
  console.log("SUCCESS");
} catch (e) {
  console.log("ERROR ", e);
}
