const {MongoClient, ObjectID} = require('mongodb');

// Create the database if not exist
// Wont show up in Compass until it's filled with data
MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {

    if (err) { return console.log("Unable to connect to db."); }

    const db = client.db('TodoApp');

    // Collection == table
    let collection = db.collection('Todos');

    //findOneAndUpdate()
    // store previous record in memory and update to new data
    // use update operators or else error
    collection.findOneAndUpdate(
        {_id: new ObjectID("5b7d0171185b0d2104961955")}, // filter

        {                                                // update
            $set: {
                text: "Something to do 95",
                completed: true
            }
        }
    ).then(
        (res) => {
            console.log(JSON.stringify(res, null, 4));
        }
    );

    // $inc - increment number
    collection = db.collection('Users');

    collection.findOneAndUpdate(
        {_id: new ObjectID('5b7d085d185b0d2104961960')},
        {
            $inc: {age: 100}, // add 100 to previous value
            $set: {name: "Bear"}
        }
    ).then(
        (res) => {
            console.log(JSON.stringify(res, null, 4));
        }
    );

});