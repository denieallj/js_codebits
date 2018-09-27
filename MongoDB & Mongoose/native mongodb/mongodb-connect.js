const MongoClient = require('mongodb').MongoClient;

// Create the database if not exist
// Wont show up in Compass until it's filled with data
MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {

    if (err) { return console.log("Unable to connect to db."); }

    console.log("Connected to MongoDB server");

    const db = client.db('TodoApp');

    // Collection == table
    let collection = db.collection('Todos');

    // TODO: Creates table and insert one data
    // Insert duplicates if data already exist
    collection.insertOne(
        {
            text: "Something to do 1",
            completed: false
        },

        (err, result) => {
            if (err) {
                console.log("Unable to insert data");
            } else {
                console.log(JSON.stringify(result.ops, null, 4));
            }
        }
    );

    // Insert data for Users collection
    collection = db.collection('Users');

    collection.insertOne(
        {
            name: "Denieall J.",
            age: 23,
            location: "Malaysia"
        },

        (err, result) => {
            if (err) {
                console.log("Unable to insert data");
            } else {
                console.log(JSON.stringify(result.ops, null, 4));
            }
        }
    );

    client.close();

});