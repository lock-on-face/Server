var chai = require('chai')
var chaiHttp = require('chai-http')
var mongoose = require('mongoose')
var Notif = require('../model/notificationModel')

chai.use(chaiHttp)
chai.should()
var url = "http://localhost:3000"
mongoose.set('useCreateIndex',true)

describe('Notif', ()=> {
  it('POST /notification should create notification', (done) =>{
    chai.request(url)
    .post('/notification')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTMwMGMxYjU1NDNkMGM5OWFhMDQwMCIsInVzZXJuYW1lIjoiamFjayIsImVtYWlsIjoiamFja0BtYWlsLmNvbSIsInBob25lIjoiMTIzNDU1IiwiaW1hZ2UiOiJqaHNkYWZkc2pmamtramlqaCIsImlzQWRtaW4iOmZhbHNlLCJjcmVkaXRzIjoxODAsImlhdCI6MTUzNzQyOTE4Mn0.1RxWoS6_oYil8R8TIlioM6IqKOLvXHU3Xh_bPDaEuIU')
    .send({
      "locker": "5ba350671ac122376fbc9bcf",
      "owner": "5ba300c1b5543d0c99aa0400",
      "message": "testing",
      "due":"2018-09-20T07:53:20.785Z"
    })
    .end((err,res) => {
      res.should.have.status(201)
      res.body.should.have.property('data')
      res.body.data.should.have.property('due')
      res.body.data.should.have.property('message')
      res.body.data.message.should.equal('testing')
      done()
    })
  })

  it('GET /notification should get notification by owner', (done) =>{
    chai.request(url)
    .get('/notification')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTMwMGMxYjU1NDNkMGM5OWFhMDQwMCIsInVzZXJuYW1lIjoiamFjayIsImVtYWlsIjoiamFja0BtYWlsLmNvbSIsInBob25lIjoiMTIzNDU1IiwiaW1hZ2UiOiJqaHNkYWZkc2pmamtramlqaCIsImlzQWRtaW4iOmZhbHNlLCJjcmVkaXRzIjoxODAsImlhdCI6MTUzNzQyOTE4Mn0.1RxWoS6_oYil8R8TIlioM6IqKOLvXHU3Xh_bPDaEuIU')
    .end((err,res)=>{
      res.should.have.status(200)
      res.body.data.should.be.a('array')
      res.body.data[0].should.have.property('message')
      res.body.data[0].should.have.property('due')
      done()
    })
  })

  it('DELETE /notification/id should delete data notification', (done)=>{
    chai.request(url)
    .delete('/notification/5ba35203e8b22e39312e0317')
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYTM0OTkxZDg4NDNlMzQxZWQ5MzI2NiIsInVzZXJuYW1lIjoibHVjaSIsImVtYWlsIjoibHVjaUBtYWlsLmNvbSIsInBob25lIjoiMTIzMjU2IiwiaW1hZ2UiOiIzcCIsImlzQWRtaW4iOnRydWUsImNyZWRpdHMiOjEwLCJpYXQiOjE1Mzc0Mjc5MTR9.E9gNbg0VhfIskr1tTFp7zJpjEbeNaJYRlognnO19D24')
    .end((err,res)=>{
      res.should.have.status(201)
      done()
    })

  })
})