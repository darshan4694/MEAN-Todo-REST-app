const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to the database server.');
    }
    console.log('Connected to mongodb server.');

    // db.collection('Todos').insertOne({
    //     text: 'something to do.',
    //     completed: true 
    // } , (err, res) => {
    //     if(err){
    //         return console.log("Unable to insert.")
    //     }

    //     console.log(JSON.stringify(res.ops[0], undefined, 2 ));
    // });

    db.collection('Users').insertOne({
        name: 'Varun',
        age: 24,
        location: 'Dallas'
    }, (err, res) => {
        if(err){
            return console.log("Unable to add data ",err);
        }
        console.log(JSON.stringify(res.ops, undefined, 2));
        console.log(res.ops[0]._id.getTimestamp());

    });
    db.close();
});