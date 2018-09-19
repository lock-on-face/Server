var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
var mongoose = require('mongoose')
var User = require('../model/userModel')
var jwt = require('jsonwebtoken')

chai.should()
var url = "http://localhost:3000"

describe('User', () => {
  afterEach(function(done){
    mongoose.connect('mongodb://mario:mario123@ds259912.mlab.com:59912/testing-server-finalproject',{useNewUrlParser:true},(err) => {
      if(err){
        console.log(err)
      }else{
        User.collection.drop()
        done()
      }  
    })
  })

    it('POST /user/signup should add data user', function(done){
      chai.request(url)
      .post('/users/signup')
      .send({
        'email': 'tes@mail1.com',
        'username': 'testingname1',
        'password': 'testingpassword1',
        'phone': 'testingphone1',
        'image': 'testingImage1'
      })
      .end(function(err,res){
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.should.have.property('data')
        res.body.should.have.property('msg')
        res.body.data.should.have.property('username')
        res.body.data.should.have.property('email')
        res.body.data.should.have.property('password')
        res.body.data.should.have.property('phone')
        res.body.data.should.have.property('image')
        res.body.data.should.have.property('credits')
        res.body.data.should.have.property('isAdmin')
        res.body.data.username.should.be.a('string')
        res.body.data.email.should.be.a('string')
        res.body.data.image.should.be.a('string')
        res.body.data.password.should.be.a('string')
        res.body.data.phone.should.be.a('string')
        res.body.data.credits.should.be.a('number')
        res.body.data.isAdmin.should.be.a('boolean')
        done()
      })
    })

    it('POST /users/signin should login',function(done){
      chai.request(url)
      .post('/users/signin')
      .send({
        "username": "testingname1",
        "password": "testingpassword1"
      })
      .end(function(err,res){
        var decoded = jwt.verify(res.body.token,'secret')
        res.should.have.status(200)
        res.body.should.have.property('token')
        decoded.should.have.property('username')
        decoded.should.have.property('image')
        decoded.should.have.property('credits')
        decoded.should.have.property('isAdmin')
        decoded.username.should.equal('testingname1')
        done()
      })
    })

    it('POST /users/admin should register admin',function(done){
      chai.request(url)
      .post('/users/admin')
      .send({
        "username": "admintesting",
        "password": "passwordAdmin",
        "email": "email@Admin.com",
        "phone": "phoneAdmin",
        "image": "imageAdmin"
      })
      .end(function(err,res){
        res.should.have.status(201)
        done()
      })
    })

   

 
})

