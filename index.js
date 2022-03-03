const express = require("express");
const app = express('express');
const cors = require('cors');

app.use (cors())

const mongoClient = require("mongodb").MongoClient //声明标识符
let db

mongoClient.connect('mongodb+srv://wei:jklasd@lesson.0zazi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
    db = client.db('lesson3145')
})
//链接到mongodb数据库
app.use(express.static('static'));

app.use(function(req, res, next) {
        console.log("Request IP: " + req.url);
        console.log("Request date: " + new Date());
        next();
    });
    
    app.use(function(request, response, next){
        console.log("In comes a " + request.method + " to " + request.url);
        next();
    });
    app.use(function(request, response, next) { 
    console.log("In comes a request to: " + request.url);
    next();
    });
//logger middleware

app.param('collectionName',(req,res,next,collectionName) => {
    req.collection = db.collection(collectionName)
    return next()
})

app.get('/',(req,res,next) => {
    res.send('Welcome to the MongoDB Express server.')
})
//主页面

app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
    if (e) return next(e)
    res.send(results)
    })
})

/*app.get('/collection/:collectionName', (req, res, next) => {
req.collection.find({}, {limit: 10, sort: [['price', -1]]})
.toArray((e, results) => {
if (e) return next(e)
res.send(results)
})
})*/
//价格降序10个项目

app.post('/collection/:collectionName'
, (req, res, next) => {
req.collection.insert(req.body, (e, results) => {
if (e) return next(e)
res.send(results.ops)
})
})
//新增项目

//app.listen(3000)

const port = process.env.PORT || 3000
app.listen(port)
