const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {

    if (err) {
        return console.log("Unable to connect to the databse ", err);
    }

    db.collection('Todos').find().count().then((count) => {
        console.log('------------------------------------');
        console.log('----------------find all------------');
        console.log('Todos count: ', count);
        //console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch data", err);
    });

    db.collection('Todos').find({ completed: true }).count().then((count) => {
        console.log('------------------------------------');
        console.log('------------------------------------');
        console.log('-------find by property name--------');
        console.log('Todos count: ', count);
        // console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch data", err);
    });

    db.collection('Todos').find({
        _id: ObjectID("598088858db73042a1a09597")
    }).count().then((count) => {
        console.log('------------------------------------');
        console.log('------------------------------------');
        console.log('------find by id--------------------');
        console.log('Todos count: ', count);
        // console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log("Unable to fetch data", err);
    });

    db.close();
});