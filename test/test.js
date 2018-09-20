var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
var mongoose = require('mongoose')
var User = require('../model/userModel')
var Locker = require('../model/lockerModel')
var jwt = require('jsonwebtoken')
var chaiChanges = require("chai-changes");
var expect = require('chai').expect
chai.use(chaiChanges);
chai.should()
var url = "http://localhost:3000"

// describe('User', () => {
  // afterEach(function(done){
  //   mongoose.connect('mongodb://mario:mario123@ds259912.mlab.com:59912/finalproject-testingserver',{useNewUrlParser:true},(err) => {
  //     if(err){
  //       console.log(err)
  //     }else{
  //       User.collection.drop()
  //       done()
  //     }  
  //   })
  // })

    // it('POST /user/signup should add data user', function(done){
    //   chai.request(url)
    //   .post('/users/signup')
    //   .send({
    //     'email': 'mario1@mail.com',
    //     'username': 'mario1',
    //     'password': '12345',
    //     'phone': 'testingphone12345',
    //     'image': 'testingImage12345'
    //   })
    //   .end(function(err,res){
    //     res.should.have.status(201)
    //     res.body.should.be.a('object')
    //     res.body.should.have.property('data')
    //     res.body.should.have.property('msg')
    //     res.body.data.should.have.property('username')
    //     res.body.data.should.have.property('email')
    //     res.body.data.should.have.property('password')
    //     res.body.data.should.have.property('phone')
    //     res.body.data.should.have.property('image')
    //     res.body.data.should.have.property('credits')
    //     res.body.data.should.have.property('isAdmin')
    //     res.body.data.username.should.be.a('string')
    //     res.body.data.email.should.be.a('string')
    //     res.body.data.image.should.be.a('string')
    //     res.body.data.password.should.be.a('string')
    //     res.body.data.phone.should.be.a('string')
    //     res.body.data.credits.should.be.a('number')
    //     res.body.data.isAdmin.should.be.a('boolean')
    //     done()
    //   })
    // })

    // it('POST /users/signin should login',function(done){
    //   chai.request(url)
    //   .post('/users/signin')
    //   .send({
    //     "username": "mario1",
    //     "password": "12345"
    //   })
    //   .end(function(err,res){
    //     var decoded = jwt.verify(res.body.token,'secret')
    //     res.should.have.status(200)
    //     res.body.should.have.property('token')
    //     decoded.should.have.property('username')
    //     decoded.should.have.property('image')
    //     decoded.should.have.property('credits')
    //     decoded.should.have.property('isAdmin')
    //     decoded.username.should.equal('mario1')
    //     done()
    //   })
    // })

    // it('POST /users/admin should register admin',function(done){
    //   chai.request(url)
    //   .post('/users/admin')
    //   .send({
    //     "username": "adminmario1",
    //     "password": "12345",
    //     "email": "marioadmin@mail.com",
    //     "phone": "phoneAdmin1",
    //     "image": "imageAdmin1"
    //   })
    //   .end(function(err,res){
    //     res.should.have.status(201)
    //     res.body.should.be.a('object')
    //     res.body.should.have.property('data')
    //     res.body.data.username.should.be.a('string')
    //     res.body.data.email.should.be.a('string')
    //     res.body.data.phone.should.be.a('string')
    //     res.body.data.image.should.be.a('string')
    //     done()
    //   })
    // })

    // it('GET /users should get all data users', (done) =>{
    //   chai.request(url)
    //   .get('/users')
    //   .end((err,res) =>{
    //     res.should.have.status(200)
    //     res.body.should.have.property('data')
    //     res.body.should.be.a('object')
    //     done()
    //   })
    // })

//     it('PUT /users/topup should add credits user', (done) => {
//       var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTMwMGMxYjU1NDNkMGM5OWFhMDQwMCIsInVzZXJuYW1lIjoiamFjayIsImVtYWlsIjoiamFja0BtYWlsLmNvbSIsInBob25lIjoiMTIzNDU1IiwiaW1hZ2UiOiJqaHNkYWZkc2pmamtramlqaCIsImlzQWRtaW4iOmZhbHNlLCJjcmVkaXRzIjoxMCwiaWF0IjoxNTM3NDA5Mjk2fQ.MTLKMJEV7bgZBE0SdFSNoPwQb1LtatE-u2h4wYuMyGY'
//       // var decoded = jwt.sign(token,'secret')
//       chai.request(url)
//       .put('/users/topup')
//       .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTMwMGMxYjU1NDNkMGM5OWFhMDQwMCIsInVzZXJuYW1lIjoiamFjayIsImVtYWlsIjoiamFja0BtYWlsLmNvbSIsInBob25lIjoiMTIzNDU1IiwiaW1hZ2UiOiJqaHNkYWZkc2pmamtramlqaCIsImlzQWRtaW4iOmZhbHNlLCJjcmVkaXRzIjoxMCwiaWF0IjoxNTM3NDA5Mjk2fQ.MTLKMJEV7bgZBE0SdFSNoPwQb1LtatE-u2h4wYuMyGY')
//       .send({
//         "amount": "10",
//       })
//       .end((err,res)=> {
//         if(err){
//           console.log(err)
//         }else{
//           res.should.have.status(201)
//           res.body.should.have.property('data')
//           res.body.data.should.have.property('credits')
//           res.body.data.credits.should.be.a('number')
//           done()
//         }
//       })
//     })
    
// })



