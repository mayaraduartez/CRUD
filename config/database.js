const mongoose = require("mongoose");

const uri =
  "mongodb://mayaraduartez:mrshztbg@cluster0-shard-00-00.cqb76.mongodb.net:27017,cluster0-shard-00-01.cqb76.mongodb.net:27017,cluster0-shard-00-02.cqb76.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-zinkxw-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;
