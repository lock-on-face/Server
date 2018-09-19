var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
var mongoose = require('mongoose')
var User = require('../model/userModel')

chai.should()
var url = "http://localhost:3000"

describe('User', () => {
  after(function(done){
    mongoose.connect('mongodb://mario:mario123@ds259912.mlab.com:59912/testing-server-finalproject',(err) => {
      User.collection.drop()
      done()
      })
    })
    it('POST /user/register should add data user', function(done){
      chai.request(url)
      .post('/users/register')
      .send({
        'email': 'tes@mail.com',
        'username': 'testingname',
        'password': 'testingpassword',
        'phone': 'testingphone',
        'image': 'testingImage'
      })
      .end(function(err,res){
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.should.have.property('dataUser')
        res.body.dataUser.should.be.a('object')
        res.body.dataUser.should.have.property('email')
        res.body.dataUser.should.have.property('username')
        res.body.dataUser.should.have.property('password')
        res.body.dataUser.should.have.property('phone')
        res.body.dataUser.should.have.property('rented')
        res.body.dataUser.should.have.property('credit')
        res.body.dataUser.should.have.property('image')
        res.body.dataUser.should.have.property('isAdmin')
        done()
      })
    })

    it('GET/user/all should show data user', (done) => {
      chai.request(url)
      .get('/users/all')
      .end(function(err,res){
        res.should.have.status(200)
        res.body.should.be.a('array')
        done()
      })
    })

    it('PUT /user/edit/id should edit data user', (done) => {
      chai.request(url)
      .put('/user/edit/123213')
      .send({
        'username': 'test',
        'email': 'email',
        'phone': 'phone',
        'credit': 'credit'
      })
      .end(function(err,res){
        res.should.have.status(200)
        res.body.should.be.a('object')
      })
    })

    it('DELETE /user/delete/id should delete data user', (done) =>{
      chai.request(url)
      .put('/user/delete/123')
    })
    .end(function(err,res){
      res.should.have.status(200)
    })
})

