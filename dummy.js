
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());







const uri = "mongodb+srv://maftunhasans:QqVXppC6mWA5p33L@cluster0.swrxkqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();

    const database = client.db("usersDB");
    const userCollection = database.collection("users");


    app.post('users', async (req, res) => {
      const user = req.body;
      console.log('new user', user)
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
// run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Simple Crud IS running')
})


app.listen(port, () => {
  console.log(`Simple Crud is running on port, ${port}`)
})




run();