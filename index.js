const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//user photographer-user
//password rACNZhHXC67lKv1v



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttiygsx.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        const serviceCollection = client.db('ahmedPhotography').collection('services');
        const reviewCollection = client.db('ahmedPhotography').collection('reviews')
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

        app.get('/reviews', async(req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews)
        })
        app.post('/reviews', async(req, res) => {
            const reviews = req.body;
            const result = await reviewCollection.insertOne(reviews);
            res.send(result);
        });

        app.get('/reviews', async(req, res) => {
            let query = {}
            if(req.query.email){
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        
        app.get('/service-reviews/:id', async(req, res) => {
            const serviceId = req.params.id;
            const query = {
                serviceId : serviceId
            }
            const cursor = reviewCollection.find(query).sort({_id: -1});
            const result = await cursor.toArray();
            res.send(result)
        })
        app.get('/reviews/:id', async(req, res) => {
            const id = req.params.id;
            
            const query = {
                _id : ObjectId(id)
            }
            const cursor = await reviewCollection.findOne(query);
            
            res.send(cursor)
        })
        app.put('/reviews/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const review = req.body.review
            const option = {upsert: true};
            const updatedReview = {
                $set: {
                    review: review
                }
            }

            const result = await reviewCollection.updateOne(filter, updatedReview, option);
            res.send(result)
        })
        app.delete('/reviews/:id', async(req, res)=> {
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
            
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