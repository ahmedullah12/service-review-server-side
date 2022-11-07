const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//user photographer-user
//password rACNZhHXC67lKv1v



const uri = "mongodb+srv://photographer-user:rACNZhHXC67lKv1v@cluster0.ttiygsx.mongodb.net/?retryWrites=true&w=majority";
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




app.get('/', (req, res) => {
    res.send("Server Running")
});
app.listen(port, () => {
    console.log("server running on port ", port)
});