const {MongoClient, ObjectID} = require('mongodb');

// Create the database if not exist
// Wont show up in Compass until it's filled with data
MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {

    if (err) { return console.log("Unable to connect to db."); }

    console.log("Todos Collection");

    const db = client.db('TodoApp');

    // Collection == table
    let collection = db.collection('Todos');

    // get all records
    // find() returns a cursor and toArray returns a promise
    collection.find().toArray().then(
        (docs) => {

            for (let doc of docs) {
                console.log(doc.text);
            }
        },

        (err) => {
            console.log("Unable to fetch todos");
        }
    );

    // get only record that are not completed
    collection.find({completed: false}).toArray().then(
        (docs) => {

            console.log("\n\n");

            for (let doc of docs) {
                console.log(doc.text);
            }
        },

        (err) => {
            console.log("Unable to fetch todos");
        }
    );

    // get record using object id
    collection.find({_id: new ObjectID('5b7ace7b3b994723d85adf5d')}).toArray().then(
        (docs) => {

            console.log("\n\n");

            for (let doc of docs) {
                console.log(doc.text);
            }
        },

        (err) => {
            console.log("Unable to fetch todos");
        }
    );

    // Count all the todos in the collection
    collection.find().count().then(
        (num) => {

            console.log("\n\n");

            console.log(num);
        },

        (err) => {
            console.log("Unable to fetch total documents");
        }
    );

    collection = db.collection('Users');

    collection.find({name: "Denieall J."}).toArray().then(
        (docs) => {

            console.log("\n\nUsers Collection");

            if (docs === undefined || docs.length === 0) {

                console.log("No users with that name.");

            } else {

                for (let doc of docs) {
                    console.log("--- Details ---");
                    console.log("Name: " + doc.name);
                    console.log("Age: " + doc.age);
                }

            }


            client.close();

        },

        (err) => {
            console.log("Unable to fetch users");
            client.close();
        }
    );

});