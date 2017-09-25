var express = require('express');

app = express();

var path = require('path');

var cors = require('cors');

var serveStatic = require('serve-static');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var morgan = require('morgan');

var methodOverride = require('method-override');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true  }));

app.use(bodyParser.raw());

app.use(bodyParser.text());

app.use(methodOverride());

app.use(cookieParser());

app.use(morgan('dev'));


mongoose.Promise = global.Promise;

var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.connect('mongodb://arpit:arpit@ds141524.mlab.com:41524/nav_data', {
    useMongoClient: true
});


app.use(serveStatic(path.join(__dirname)));

app.use(cors());

app.get('/', function (req, res) {
    res.redirect('/');
});

var Schema = mongoose.Schema;

var adminSchema = new Schema({
    FIELD1: {
        type: String
    },
    FIELD2: {
        type: String
    },
    FIELD3: {
        type: String
    },
    FIELD4: {
        type: String
    },
    FIELD5: {
        type: String
    },
    FIELD6: {
        type: String
    },
}, {
    collection: 'data'
});

var data = mongoose.model('data', adminSchema);

var collectionData = new Schema({
    FundName : {
        type : String
    },
    DateRequested :{
        type : String
    },
    Amount : {
        type : Number
    },
    Share : {
        type:Number
    },
    CurrentAmount :{
        type: Number
    }
});
var collect = mongoose.model('collect' , collectionData);

app.get('/schemeName', function (req, res) {
    data.find({}).distinct("FIELD2").exec(function (err, users) {
        //console.log(users);
        res.send(users);
    });
});
app.post('/postData' , function(req , res){
    data.findOne({
        'FIELD2' : req.body.string,
        'FIELD6': req.body.date
    } , function(err , data){
        if(err){
            console.log(err);
        }else{
           res.send(data);
        }
    })
})

app.post('/postCurrentData' , function(req , res){
    data.findOne({
        'FIELD2' : req.body.string,
        "FIELD6" : "07-Aug-2017"

    }).then(function(data){
            console.log(data);
            res.send(data)
    } , function(err){
        console.log(err);
    })

});

app.post('/postFinalObject' , function(req , res){
    collect.create({
        FundName : req.body.fundName,
        DateRequested : req.body.datePrev,
        Amount :  req.body.amount,
        Share : req.body.shareBought,
        CurrentAmount : req.body.currentAmountVal
    } , function(err , data){
        if(err){
            console.log(err);
            console.log('DataBase Under Manintaince! Contact Admin!');
        }else{
            console.log('DATA POSTED!');
        }
    });
});

app.get('/allPrevData' , function(req , res){
    collect.find().exec(function(err , data){
        if(err){
            console.log(err);
        }else{
            //console.log(data);
            res.send(data);
        }

    })
})

app.get('*', function(req, res) {
    res.redirect('/');
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log('server started ' + port);