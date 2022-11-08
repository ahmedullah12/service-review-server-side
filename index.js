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

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        const serviceCollection = client.db('ahmedPhotography').collection('services')
        app.get('/services', async(req, res) => {
            const query = {};
            const cursor  = serviceCollection.find(query);
            const services = await cursor.toArray();
            
            res.send(services);
        })
        app.get('/limited-services', async(req, res) => {
            const query = {};
            const cursor  = serviceCollection.find(query);
            const limitedServices = await cursor.limit(3).toArray();
            res.send(limitedServices);
        })
    }
    finally{

    }
}
run().catch(err => console.error(err));



app.get('/', (req, res) => {
    res.send("Server Running")
});
app.listen(port, () => {
    console.log("server running on port ", port)
});