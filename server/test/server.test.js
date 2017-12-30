const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {server} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seedDB');
beforeEach(populateUsers)
beforeEach(populateTodos);
describe('POST /todos', () => {
  it('should create a new todo', (done)=>{
      var text = 'Test todo text';

      request(server)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
          expect(res.body.text).toBe(text);
      })
      .end((err, res)=>{
          if(err){
             return done(err);
          }
          Todo.find({text}).then((todos)=>{
              expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              done();
          }).catch((e) => done(e));
      });
  });
  it('should not create to do with invalid todo data', (done)=>{
      request(server)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res)=>{
          if(err){
              return done(err);
          }
          Todo.find().then((todos)=>{
              expect(todos.length).toBe(8);
              done();
          }).catch((e)=>done(e));
      });
  });
});


describe('GET /todos', ()=>{
    it('should get all todos', (done)=>{
        request(server)
         .get('/todos')
         .expect(200)
         .expect((res)=>{
             expect(res.body.todos.length).toBe(8);
         })
         .end(done);
    });
});

describe('GET /todos/:id', ()=>{
    it('should return todo doc', (done)=>{
        request(server)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should return 404 if todo not found', (done)=>{
        request(server)
            .get(new ObjectID().toHexString())
            .expect(404)
            .end(done);
    });
    it('should return 404 for non-object ids', (done)=>{
        request(server)
        .get('/todos/236avd')
        .expect(404)
        .end(done);
    });
});
describe('DELETE /todo/:id', ()=>{
    it('should remove a todo', (done)=>{
        var hexId = todos[1]._id.toHexString();

        request(server)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.doc._id).toBe(hexId);
            })
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                Todo.findById(hexId)
                    .then((doc)=>{
                        expect(doc).toBe(null);
                        done();
                    })
                    .catch((e)=>done(e));
            });

    });
    it('should return 404 if todo not found', (done)=>{
        var hexId = new ObjectID().toHexString();
        request(server)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    it('should return 404 if object id is invalid', (done)=>{
        request(server)
        .delete('/todos/236avd')
        .expect(404)
        .end(done);
    });
});