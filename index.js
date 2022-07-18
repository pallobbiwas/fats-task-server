const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

//middel tair

app.use(cors());
app.use(express.json());

//database connection

const uri =
  "mongodb+srv://admin:admin@cluster0.lqmxs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
console.log(uri);
async function run() {
  try {
    await client.connect();
    const teamColection = client.db("TeamMember").collection("TeamMember");

    //get

    app.get("/members", async (req, res) => {
      const result = await teamColection.find({}).toArray();
      res.send(result);
    });
    //pos

    app.post("/members", async (req, res) => {
      const newData = req.body;
      const result = await teamColection.insertOne(newData);
      res.send(result);
    });
    //delete

    app.delete("/members/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const querry = { _id: ObjectId(id) };
      const result = await teamColection.deleteOne(querry)
      res.send(result);
    });

    //put

    app.put("/members/:id", async (req, res) => {
      const id = req.params;
      const user = req.body;
      const options = { upsert: true };
      const filter = { _id: ObjectId(id) };
      const updateDoc = {
        $set: user,
      };
      const result = await teamColection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello ami calu aci");
});

app.listen(port, () => {
  console.log(`ami calu aci ${port}`);
});
