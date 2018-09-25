var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
var mongoose = require('mongoose')
var User = require('../model/userModel')
var Locker = require('../model/lockerModel')
var jwt = require('jsonwebtoken')
var chaiChanges = require("chai-changes");
chai.use(chaiChanges);
chai.should()
mongoose.set('useCreateIndex',true)
var app = require('../app')




describe('User', () => {
  after(function(done){
    mongoose.connect('mongodb://mario:mario123@ds259912.mlab.com:59912/finalproject-testingserver',{useNewUrlParser:true},(err) => {
      if(err){
        console.log(err)
      }else{
        User.collection.drop()
        done()
      }  
    })
  })

    it('POST /user/signup should add data user', function(done){
      this.timeout(10000);
      chai.request(app)
      .post('/users/signup')
      .send({
        'email': 'jack@mail.com',
        'username': 'jack',
        'password': '12345',
        'phone': 'testingphone12345',
        'image': 'testingImage12345',
        'imageFile': 'filetesting'
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
        res.body.data.should.have.property('imageFile')
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

    it('POST /user/signup should error', function(done){
      chai.request(app)
      .post('/users/signup')
      .send({
        'email': 'jack@mail.com',
        'username': 'jack',
        'password': '12345',
        'phone': 'testingphone12345',
        'image': 'testingImage12345',
        'imageFile': 'filetesting'
      })
      .end(function(err,res){
        res.should.have.status(400)
        done()
      })
    })

    it('should erorr signup without password', function (done) {
      this.timeout(10000);
      chai.request(app)
      .post('/users/signup')
      .end(function (err,res){
        res.should.have.status(500)
        done();
      })
    })

    it('POST /users/signin should login',function(done){
      chai.request(app)
      .post('/users/signin')
      .send({
        "username": "jack",
        "password": "12345"
      })
      .end(function(err,res){
        var decoded = jwt.verify(res.body.token,'secret')
        res.should.have.status(200)
        res.body.should.have.property('token')
        decoded.should.have.property('username')
        decoded.should.have.property('image')
        decoded.should.have.property('credits')
        decoded.should.have.property('isAdmin')
        decoded.should.have.property('image')
        decoded.username.should.equal('jack')
        done()
      })
    })

    it('should erorr because wrong password', function(done){
      chai.request(app)
      .post('/users/signin')
      .send({
        "username": "jack",
        "password": "12"
      })
      .end(function(err,res){
        res.should.have.status(401)
        res.body.should.have.property('msg')
        done()
      })
    })

    it('POST /user/signin should error' ,function(done){
      chai.request(app)
      .post('/users/signin')
      .send({
        "username": "undefined",
        "password": "12345"
      })
      .end(function(err,res){
        res.should.have.status(401)
        done()
      })
    })

    it('should error login because no username or pass', function(done){
      chai.request(app)
      .post('/users/signin')
      .send({
        "username": undefined
      })
      .end(function(err,res){
        res.should.have.status(401)
        res.body.should.have.property('msg')
        done()
      })
    })
  

    it('POST /users/admin should register admin',function(done){
      chai.request(app)
      .post('/users/admin')
      .send({
        "username": "mario",
        "password": "12345",
        "email": "marioadmin@mail.com",
        "phone": "phoneAdmin1",
        "image": "imageAdmin1",
        "imageFile": "fileadmin"
      })
      .end(function(err,res){
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.should.have.property('data')
        res.body.data.username.should.be.a('string')
        res.body.data.email.should.be.a('string')
        res.body.data.phone.should.be.a('string')
        res.body.data.image.should.be.a('string')
        done()
      })
    })

    it('POST /user/admin should error', function(done){
      chai.request(app)
      .post('/users/admin')
      .send({
        "username": "mario",
        "password": "12345",
        "email": "marioadmin@mail.com",
        "phone": "phoneAdmin1",
        "image": "imageAdmin1",
        "imageFile": "fileadmin"
      })
      .end(function(err,res){
        res.should.have.status(400)
        done()
      })
    })

    it('should failed register admin', function(done){
      chai.request(app)
      .post('/users/admin')
      .end(function(err,res){
        res.should.have.status(500)
        done()
      })
    })

    it('GET /users should get all data users', (done) =>{
      chai.request(app)
      .get('/users')
      .end((err,res) =>{
        res.should.have.status(200)
        res.body.should.have.property('data')
        res.body.should.be.a('object')
        done()
      })
    })

    it('PUT /users/topup should add credits user',  async function(done) {
        this.timeout(100000);
        try {
          const data = await User.findOne({
            username: 'jack'
          })
          let token = jwt.sign({
            id: data._id,
            username: data.username,
            email: data.email,
            phone: data.phone,
            image: data.image,
            isAdmin: data.isAdmin,
            credits: data.credits,
            imageFile:data.imageFile
          },"secret")
          chai.request(app) 
          .put('/users/topup')
          .set('token',token)
          .send({
            "owner": data._id,
            "amount": "10",
          })
          .end(function(err,res) {
            res.should.have.status(201)
            res.body.should.have.property('data')
            res.body.should.have.property('msg')
            res.body.data.should.have.property('credits')
            res.body.data.credits.should.be.a('number')
          done()
          })
        } catch (error) {
          console.log(error)
          done()
        }
    })

    it('should get error when top up', (done) =>{
      chai.request(app)
      .put('/users/topup')
      .end((err,res) =>{
        res.should.have.status(403)
        done()
      })
    })
    
})



