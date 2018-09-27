const {MongoClient} = require('mongodb');

// Create the database if not exist
// Wont show up in Compass until it's filled with data
MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {

    if (err) { return console.log("Unable to connect to db."); }

    const db = client.db('TodoApp');

    // Collection == table
    let collection = db.collection('Todos');

    // deleteMany()
    // delete all document with the text "Something to do 5"
    collection.deleteMany({text: 'Something to do 5'}).then(
        (res) => {
            if (res.deletedCount <= 0) {
                console.log("Nothing to delete");
            } else {
                console.log(`Successfully deleted ${res.deletedCount} document`);
            }
        }
    );

    // deleteOne()
    // delete the first document with the text "Something to do 4" and leave the rest
    collection.deleteOne({text: 'Something to do 4'}).then(
        (res) => {
            if (res.deletedCount <= 0) {
                console.log("Nothing to delete");
            } else {
                console.log(`Successfully deleted ${res.deletedCount} document`);
            }
        }
    );

    // findOneAndDelete()
    // fetch one document and delete it and temporarily stores deleted document in res.value
    collection.findOneAndDelete({text: 'Something to do 5'}).then(
        (res) => {
            if(res.value == null) {
                console.log("Nothing to delete");
            } else {
                console.log("Successfully deleted\n");
                console.log(`Value:\n_id: ${res.value._id}\ntext: ${res.value.text}\ncompleted: ${res.value.completed}`);
            }
        }
    );

});