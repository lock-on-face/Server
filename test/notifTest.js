var chai = require('chai')
var chaiHttp = require('chai-http')
var mongoose = require('mongoose')
var Notif = require('../model/notificationModel')
var app = require('../app')
var User = require('../model/userModel')
var Locker = require('../model/lockerModel')
mongoose.set('useCreateIndex', true); 
var jwt = require('jsonwebtoken')

chai.use(chaiHttp)
chai.should()
var url = "http://localhost:3000"
mongoose.set('useCreateIndex',true)

describe('Notif', ()=> {
  after(function(done){
    mongoose.connect('mongodb://mario:mario123@ds259912.mlab.com:59912/finalproject-testingserver',{useNewUrlParser:true},(err) => {
      if(err){
        console.log(err)
      }else{
        Notif.collection.drop()
        Locker.collection.drop()
        User.collection.drop()
        done()
      }  
    })
  })
  it('POST /notification should create notification', async function(done){
    this.timeout(10000);
    try {
      const dataUser = await User.create({
        username: "hoffnung",
        password: "12345",
        email: "hoffnung@mail.com",
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
      const dataLocker = await Locker.create({
        serialNumber: "003",
        owner: dataUser._id,
        rented: true,
        isLocked: true
      })
      // console.log('ini locker',dataLocker)
        chai.request(app)
        .post('/notification')
        .set('token',token)
        .send({
          "locker": dataLocker._id,
          "owner": dataUser._id,
          "message": "testing",
          "due":"2018-09-20T07:53:20.785Z",
          "status": "1"
        })
        .end((err,res) => {
          // console.log('ini notif',res.body)
          res.should.have.status(201)
          res.body.should.have.property('data')
          res.body.data.should.have.property('due')
          res.body.data.should.have.property('message')
          res.body.data.message.should.equal('testing')
          done()
        })
    } catch (error) {
      console.log(error)
      done()
    }
  })

  it('should failed create notif', async function(done){
    this.timeout(10000);
    try {
      const dataUser = await User.findOne({
        username: "hoffnung",
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
      const dataLocker = await Locker.create({
        serialNumber: "003",
        owner: dataUser._id,
        rented: true,
        isLocked: true
      })
      // console.log('ini locker',dataLocker)
        chai.request(app)
        .post('/notification')
        .set('token',token)
        .end((err,res) => {
          res.should.have.status(400)
          done()
        })
    } catch (error) {
      console.log(error)
      done()
    }
  })

  it('GET /notification should get notification by owner', async function(done){
    this.timeout(10000);
    try {
      const dataUser = await User.findOne({
        username: 'hoffnung'
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
      .get('/notification')
      .set('token',token)
      .end((err,res)=>{
        res.should.have.status(200)
        res.body.should.have.property('msg')
        res.body.data.should.be.a('array')
        res.body.data[0].should.have.property('message')
        res.body.data[0].should.have.property('due')
        res.body.data[0].should.have.property('status')
        res.body.data[0].should.have.property('owner')
        res.body.data[0].should.have.property('locker')
        done()
      })
    } catch (error) {
      console.log(error)
      done()
    }
  })

  it('DELETE /notification/id should delete data notification', (done)=>{
    chai.request(app)
    .delete('/notification/5ba35203e8b22e39312e0317')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTM0OTkxZDg4NDNlMzQxZWQ5MzI2NiIsInVzZXJuYW1lIjoibHVjaSIsImVtYWlsIjoibHVjaUBtYWlsLmNvbSIsInBob25lIjoiMTIzMjU2IiwiaW1hZ2UiOiIzcCIsImlzQWRtaW4iOnRydWUsImNyZWRpdHMiOjEwLCJpYXQiOjE1Mzc0Mjc5MTR9.E9gNbg0VhfIskr1tTFp7zJpjEbeNaJYRlognnO19D24')
    .end((err,res)=>{
      res.should.have.status(201)
      done()
    })
  })

  it('should failed delete notification', async function(done){
    try {
      const dataUser = await User.findOne({
        username: 'hoffnung'
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
    .delete('/notification/1')
    .set('token',token)
    .end((err,res)=>{
      res.should.have.status(400)
      done()
    })
    } catch (error) {
      console.log(error)
      done()
    }
  })

})