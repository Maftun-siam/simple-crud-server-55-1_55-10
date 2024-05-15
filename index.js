// // maftunhasans
// // QqVXppC6mWA5p33L


const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    await client.connect();                               // Connect the client to the server	(optional starting in v4.7)

    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.get('/users', async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('new user', user)
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.delete('/users/:id', async(req,res)=>{ /* make it async */
      const id = req.params.id;
      console.log('delete this user from database', id);
      const query = {_id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query) /* To use await make async */
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });       // Send a ping to confirm a successful connection
    console.log("Pinged,connected to MongoDB!");
  }

  finally {
    // Ensures that the client will close when you finish/error
  }

  app.get('/', (req, res) => {
    res.send('Simple Crud IS running')
  })

  app.listen(port, () => {
    console.log(`Simple Crud is running on port, ${port}`)
  })

}
run();








