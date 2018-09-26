var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
var mongoose = require('mongoose')
var Locker = require('../model/lockerModel')
var User = require('../model/userModel')
var chaiChanges = require("chai-changes");
chai.use(chaiChanges);
chai.should()
var app = require('../app')
mongoose.set('useCreateIndex', true); 
var jwt = require('jsonwebtoken')

describe('Locker', () =>{
  after(function(done){
      mongoose.connect('mongodb://mario:mario123@ds259912.mlab.com:59912/finalproject-testingserver',{useNewUrlParser:true},(err) => {
        if(err){
          console.log(err)
        }else{
          Locker.collection.drop()
          User.collection.drop()
          done()
        }  
      })
    })
    it('POST /users/admin should register admin',function(done){
      this.timeout(100000);
      chai.request(app)
      .post('/users/admin')
      .send({
        "username": "wein",
        "password": "12345",
        "email": "weinadmin@mail.com",
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


  it('POST /locker should create locker', async function(done){
    this.timeout(100000);
    try {
      const data = await User.findOne({
        username: 'wein'
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
      .post('/locker')
      .set('token',token)
      .send({
        "serialNumber":"001"
      })
      .end((err,res)=>{
        res.should.have.status(201)
        res.body.should.have.property('data')
        res.body.data.should.have.property('owner')
        res.body.data.should.have.property('serialNumber')
        res.body.data.should.have.property('_id')
        res.body.data.should.be.a('object')
        res.body.data.serialNumber.should.be.a('string')
        res.body.data.owner.should.be.a('string')
        done()
      })
    } catch (error) {
      console.log(error)
      done()
    }
  })

  it('should failed create locker', async function(done){
    this.timeout(100000);
    try {
      const data = await User.findOne({
        username: 'wein'
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
      .post('/locker')
      .set('token',token)
      .send({
        "serialNumber":"001"
      })
      .end((err,res)=>{
        res.should.have.status(400)
        done()
      })
    } catch (error) {
      console.log(error)
      done()
    }
  })

  it('GET /locker should get all data locker', (done) =>{
    chai.request(app)
    .get('/locker')
    .end((err,res)=>{
      res.should.have.status(200)
      res.should.be.a('object')
      res.body.data.should.be.a('array')
      res.body.data[0].owner.should.have.property('credits')
      res.body.data[0].owner.should.have.property('username')
      res.body.data[0].owner.should.have.property('email')
      res.body.data[0].owner.should.have.property('phone')
      res.body.data[0].owner.should.have.property('image')
      res.body.data[0].should.have.property('serialNumber')
      res.body.data[0].should.have.property('rented')
      res.body.data[0].should.have.property('_id')
      done()
    })
  })

  it('GET /self should get one data locker', async function(done){
    this.timeout(100000);
    try {
      const data = await User.findOne({
        username: 'wein'
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
      .get('/locker/self')
      .set('token',token)
      .end((err,res)=>{
        res.should.have.status(200)
        res.should.be.a('object')
        res.body.data[0].should.have.property('owner')
        res.body.data[0].should.have.property('serialNumber')
        res.body.data[0].should.have.property('rented')
        res.body.data[0].owner.should.have.property('credits')
        res.body.data[0].owner.should.have.property('username')
        res.body.data[0].owner.should.have.property('email')
        res.body.data[0].owner.should.have.property('phone')
        res.body.data[0].owner.should.have.property('image')
        done()
      })
    } catch (error) {
      console.log(error)
      done()
    }
  })

  it('PUT /locker/:id should edit data locker', async function(done){
    try {
      const dataUser = await User.create({
        username: "cherry",
        password: "12345",
        email: "cherryadmin@mail.com",
        phone: "phoneAdmin1",
        image: "imageAdmin1",
        imageFile: "fileadmin"
      })
      var token = jwt.sign({
        username: dataUser.username,
        password: dataUser.password,
        email: dataUser.email,
        id: dataUser._id,
        phone: dataUser.phone,
        image: dataUser.image,
        imageFile: dataUser.imageFile
      },"secret")
      const locker = await Locker.findOne({
        serialNumber: "001"
      })
      chai.request(app)
      .put(`/locker/${locker._id}`)
      .set('token',token)
      .send({
        "owner": "null",
        "items": "rahasia",
        "rented": "true",
        "isLocked": "true"
      })
      .end((err,res) =>{
        res.should.have.status(201)
        res.body.should.have.property('data')
        res.body.data.should.be.a('object')
        res.body.data.should.have.property('owner')
        res.body.data.should.have.property('rented')
        res.body.data.should.have.property('serialNumber')
        done()
      })
    } catch (error) {
      console.log(error)
      done()
    }
  })

  it('should failed update locker', async function(done){
    try {
      const dataUser = await User.findOne({
        username: "cherry"
      })
      var token = jwt.sign({
        username: dataUser.username,
        password: dataUser.password,
        email: dataUser.email,
        id: dataUser._id,
        phone: dataUser.phone,
        image: dataUser.image,
        imageFile: dataUser.imageFile
      },"secret")
      const locker = await Locker.findOne({
        serialNumber: "001"
      })
      chai.request(app)
      .put(`/locker/${locker._id}`)
      .set('token',token)
      .send({
        "owner": "undefined",
        "items": "rahasia",
        "rented": "undefined",
        "isLocked": "undefined"
      })
      .end((err,res) =>{
        res.should.have.status(400)
        done()
      })
    } catch (error) {
      console.log(error)
      done()
    }
  })

 

  it('DELETE /locker/:id should delete data locker', (done) =>{
    chai.request(app)
    .delete('/locker/5ba340cd9d4b05306f475502')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTM0OTkxZDg4NDNlMzQxZWQ5MzI2NiIsInVzZXJuYW1lIjoibHVjaSIsImVtYWlsIjoibHVjaUBtYWlsLmNvbSIsInBob25lIjoiMTIzMjU2IiwiaW1hZ2UiOiIzcCIsImlzQWRtaW4iOnRydWUsImNyZWRpdHMiOjEwLCJpYXQiOjE1Mzc0Mjc5MTR9.E9gNbg0VhfIskr1tTFp7zJpjEbeNaJYRlognnO19D24')
    .end((err,res)=>{
      res.should.have.status(201)
      done()
    })
  })

  it('should failed delete locker', async function(done){
    try {
      const dataUser = await User.findOne({
        username: "cherry"
      })
      var token = jwt.sign({
        username: dataUser.username,
        password: dataUser.password,
        email: dataUser.email,
        id: dataUser._id,
        phone: dataUser.phone,
        image: dataUser.image,
        imageFile: dataUser.imageFile
      },"secret")
      chai.request(app)
      .delete('/locker/1giuhgui7798')
      .set('token',token)
      .end(function(err,res){
        res.should.have.status(400)
        done()
      })
    } catch (error) {
      console.log(error)
      done()
    }
  })

})