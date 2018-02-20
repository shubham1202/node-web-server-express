const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');    

const port    = process.env.PORT || 3000;

var app = express();

//using partial templates
hbs.registerPartials(__dirname + '/views/partials');
//using handlebars
app.set('view engine', 'hbs');                    //used to set express configuration,takes key-value                                                         pairs
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to append to server.log');
		}
	});
 	next();
});

//maintanence middleware
//app.use((req, res ,next) => {
//	res.render('maintenance.hbs');
//});

//middleware(serving static directory/pages)
app.use(express.static(__dirname + '/public'));  //express.static takes absolute path to the folder u want                                                    to serve up
                                                 //dirname stores the path to ur project directory(node-web-server), +/public(concatenate to )


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//routing
app.get('/', (req, res) => {
	//res.send('<h1>Hello Express!</h1>');
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMsg: 'Welcome to Home Page'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Bad request'
	});
});

//bind aplication to server
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});