const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/ToDoApp', { useMongoClient: true });

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var todo2 = new Todo({
    text: "Finish homework"
    // completed: false
});

// todo2.save().then((doc)=>{
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e)=>{
//     console.log("Unable to save");
// });
// Output: 
// {
//   "__v": 0,
//   "text": "Finish homework",
//   "_id": "598255868b1c4f56eb2d92e8",
//   "completedAt": null,
//   "completed": false
// }


mongoose.connect('mongodb://localhost:27017/Users', { useMongoClient: true });

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var user1 = new User({ email: 'd' });

user1.save().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
}, (e) => {
    console.log("Unable to save.");
});
