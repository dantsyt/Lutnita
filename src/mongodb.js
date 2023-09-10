const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// DB Strings

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const database = client.db('lutnita');

    database.collection('testdoi')
    .deleteOne({
        _id: 10
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });