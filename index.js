const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

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
