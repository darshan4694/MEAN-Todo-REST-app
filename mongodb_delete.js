const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {

    if (err) {
        return console.log("Unable to connect to the databse ", err);
    }

   db.collection('Users').deleteMany({ name: 'Darshan' }).then((res) => {
       console.log(res.result);
   }, (err) => {});


   db.collection('Users').deleteOne({ name: 'Darshan' }).then((res) => {
       console.log(res.result);
   }, (err) => {});
   
   db.collection('Users').findOneAndDelete({ name: 'Darshan' }).then((res) => {
       console.log(JSON.stringify(res, undefined, 2));
   }, (err) => {});


    db.close();
});