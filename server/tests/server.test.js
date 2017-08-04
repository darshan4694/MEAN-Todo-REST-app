const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

var todos = [
    {
        _id: new ObjectID(),
        text: 'Test data 1'
    },
    {
        _id: new ObjectID(),
        text: 'Test data 2'
    },
    {
        _id: new ObjectID(),
        text: 'Test data 3'
    }
]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create new todo and must store in the database', (done) => {
        var text = 'Test to do';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not add bad Todo into db', (done) => {

        request(app)
            .post('/todos')
            .send({ text: null })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done();
                }).catch((e) => done(e));
            });
    });

});

describe('GET /todos', () => {
    it('should return all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {

                expect(res.body.todos.length).toBe(3);
                // expect(res.body.todos).toBe(todos);
                // done();
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return a todos', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {

                expect(res.body.todo.text).toBe(todos[0].text);
                // expect(res.body.todos).toBe(todos);
                // done();
            })
            .end(done);
    });

    it('should return a not vaid todo', (done) => {
        // var id_tmp = "1223"
        request(app)
            .get(`/todos/1223`)
            .expect(404)
            .end(done);
    });

     it('should return a bad todo', (done) => {
         var newId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${newId}}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todos', (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {

                expect(res.body.todo._id).toBe(todos[0]._id.toHexString());
                // expect(res.body.todos).toBe(todos);
                // done();
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }

                Todo.findById(todos[0]._id.toHexString()).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e)=> done(e));
            });
    });

    it('should return 404 for non existing todo todo', (done) => {
         var newId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${newId}}`)
            .expect(404)
            .end(done);
    });
    
    
    it('should return 404 for invalid todo id', (done) => {
         var newId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${newId}}`)
            .expect(404)
            .end(done);
    });
});