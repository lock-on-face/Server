var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
var mongoose = require('mongoose')
var Locker = require('../model/lockerModel')
var chaiChanges = require("chai-changes");
chai.use(chaiChanges);
chai.should()
var url = "http://localhost:3000"
mongoose.set('useCreateIndex', true);

describe('Locker', () =>{
  afterEach(function(done){
      mongoose.connect('mongodb://mario:mario123@ds259912.mlab.com:59912/finalproject-testingserver',{useNewUrlParser:true},(err) => {
        if(err){
          console.log(err)
        }else{
          Locker.collection.drop()
          done()
        }  
      })
    })
  it('POST /locker should create locker', (done) =>{
    chai.request(url)
    .post('/locker')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTMwMGMxYjU1NDNkMGM5OWFhMDQwMCIsInVzZXJuYW1lIjoiamFjayIsImVtYWlsIjoiamFja0BtYWlsLmNvbSIsInBob25lIjoiMTIzNDU1IiwiaW1hZ2UiOiJqaHNkYWZkc2pmamtramlqaCIsImlzQWRtaW4iOmZhbHNlLCJjcmVkaXRzIjoxMCwiaWF0IjoxNTM3NDA5Mjk2fQ.MTLKMJEV7bgZBE0SdFSNoPwQb1LtatE-u2h4wYuMyGY')
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
  })

  it('GET /locker should get all data locker', (done) =>{
    chai.request(url)
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

  it('GET /self should get one data locker', (done) =>{
    chai.request(url)
    .get('/locker/self')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTMwMGMxYjU1NDNkMGM5OWFhMDQwMCIsInVzZXJuYW1lIjoiamFjayIsImVtYWlsIjoiamFja0BtYWlsLmNvbSIsInBob25lIjoiMTIzNDU1IiwiaW1hZ2UiOiJqaHNkYWZkc2pmamtramlqaCIsImlzQWRtaW4iOmZhbHNlLCJjcmVkaXRzIjoxMCwiaWF0IjoxNTM3NDA5Mjk2fQ.MTLKMJEV7bgZBE0SdFSNoPwQb1LtatE-u2h4wYuMyGY')
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
  })

  it('PUT /locker/:id should edit data locker', (done)=>{
    chai.request(url)
    .put('/locker/5ba340cd9d4b05306f475502')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTMwMGMxYjU1NDNkMGM5OWFhMDQwMCIsInVzZXJuYW1lIjoiamFjayIsImVtYWlsIjoiamFja0BtYWlsLmNvbSIsInBob25lIjoiMTIzNDU1IiwiaW1hZ2UiOiJqaHNkYWZkc2pmamtramlqaCIsImlzQWRtaW4iOmZhbHNlLCJjcmVkaXRzIjoxMCwiaWF0IjoxNTM3NDA5Mjk2fQ.MTLKMJEV7bgZBE0SdFSNoPwQb1LtatE-u2h4wYuMyGY')
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
  })

  it('DELETE /locker/:id should delete data locker', (done) =>{
    chai.request(url)
    .delete('/locker/5ba340cd9d4b05306f475502')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTM0OTkxZDg4NDNlMzQxZWQ5MzI2NiIsInVzZXJuYW1lIjoibHVjaSIsImVtYWlsIjoibHVjaUBtYWlsLmNvbSIsInBob25lIjoiMTIzMjU2IiwiaW1hZ2UiOiIzcCIsImlzQWRtaW4iOnRydWUsImNyZWRpdHMiOjEwLCJpYXQiOjE1Mzc0Mjc5MTR9.E9gNbg0VhfIskr1tTFp7zJpjEbeNaJYRlognnO19D24')
    .end((err,res)=>{
      res.should.have.status(201)
      done()
    })
  })

})