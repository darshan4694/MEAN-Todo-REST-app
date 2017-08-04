const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {

    if (err) {
        return console.log("Unable to connect to the databse ", err);
    }

   db.collection('Users').findOneAndUpdate({
       _id: new ObjectID('5980ea7c1495bf460f9ff794')
   }, {
       $set: {
           name: 'Anil'
       },
       $inc: {
           age: 30
       }
   }, {
       retunToOriginal: false
   }).then((res)=>{
       console.log(res);
   });

    db.close();
});