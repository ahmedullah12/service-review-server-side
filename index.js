const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


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
        app.get('/limited-services', async(req, res) => {
            const query = {};
            const cursor  = serviceCollection.find(query).sort({_id: -1});
            const limitedServices = await cursor.limit(3).toArray();
            res.send(limitedServices);
        });
        app.get('/services', async(req, res) => {
            const query = {};
            const cursor  = serviceCollection.find(query).sort({_id: -1});
            const services = await cursor.toArray();
            res.send(services);
        });
        app.post('/services', async(req, res) => {
            const service = req.body;
            console.log(service)
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        })
        app.get('/services/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const service = await serviceCollection.findOne(query);
            res.send(service);
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