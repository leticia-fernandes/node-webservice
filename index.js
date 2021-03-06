var express = require('express');

var app = express();

//verifying if it's a test
app.use(function(req,res,next){
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';   
    next();
});


//set up handlebars view engine
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//defining port
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));


//routes
app.get('/', function(req,res){
    res.render('home');
});

var fortune = require('./lib/fortune.js');
app.get('/about', function(req, res){    
    res.render('about', {
        fortune : fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/content/content1', function(req, res){
    res.render('content/content1');
});

app.get('/content/help', function(req, res){
    res.render('content/help');
});

    //404 catch-all handler (middleware)
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

    //500 error handler (middleware)
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + 
        app.get('port') + '; press ctrl-c to terminate.');
});