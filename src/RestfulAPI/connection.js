const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://TheAceMan:B9nuOZxmoRAHhSwD@theacemanager.4oacd.mongodb.net/userpasswords?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});