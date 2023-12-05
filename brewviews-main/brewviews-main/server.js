/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const axios = require('axios');
const qs = require('query-string');

//Create Database Connection
var pgp = require('pg-promise')();

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.
		We'll be using `db` as this is the name of the postgres container in our
		docker-compose.yml file. Docker will translate this into the actual ip of the
		container for us (i.e. can't be access via the Internet).
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab,
		we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database. We set this in the
		docker-compose.yml for now, usually that'd be in a seperate file so you're not pushing your credentials to GitHub :).
**********************/
var dbConfig = {
	host: 'localhost',//'ec2-52-200-188-218.compute-1.amazonaws.com',
	port: 5432,
	// ssl: true,
	database: 'brewReviews',//'dd5vi4p6eben13',
	user: 'postgres',//'tznwbmejlekxth',
	password: 'password'//'9f7a101732e6fdb1790e10b1b3de8c6d8f34a669f19f926c33c4664cb0a59f94
};

// const isProduction = process.env.NODE_ENV === 'production';
// dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
let db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

// main page
app.get('/', function(req, res) {
	res.render('pages/main',{
		my_title:"Main Page",
		items: '',
		error: false
	});
});

app.get('/main', function(req, res) { 
	res.render('pages/main',{
		my_title:"Main Page",
		items: '',
		error: false
	});
});

// reviews page
app.get('/reviews', function(req, res) {
	var get_statement = "SELECT brewery_name, review, review_date FROM reviews;"

	db.task('get-everything', task => {
		return task.batch([
			task.any(get_statement)
		]);
	})
	.then(info => {
		res.render('pages/reviews',{
			data: info[0],
			filter: ''
			})
	})
	.catch(err => {
			console.log('error', err);
			res.render('pages/reviews', {
			data: '',
			filter: ''
			})
	});
});

//to request data from API for given search criteria
//TODO: You need to edit the code for this route to search for movie reviews and return them to the front-end
app.post('/get_feed', function(req, res) {

	// console.log("Getting breweries...");

	var city = req.body.city; 
  
	if(city) {
	  axios({
		url: `https://api.openbrewerydb.org/breweries?by_city=${city}`,
		  method: 'GET',
		  dataType:'json',
		})
		  .then(items => {
			res.render('pages/main', {
			  my_title: "BrewReviews",
			  items: items.data,
			  error: false,
			  message: ''
			});
		  })
		  .catch(error => {
			console.log(error);
			res.render('pages/main',{
			  my_title: "BrewReviews",
			  items: '',
			  error: true,
			  message: error
			})
		  });
	}
	else {
	  // TODO: Render the home page and include an error message (e.g., res.render(...);); Why was there an error? When does this code get executed? Look at the if statement above
	  // Stuck? On the web page, try submitting a search query without a search term
	}
  });

// Sends the reviews from input modal to database
app.post('/review/add_review', function(req, res) {
	var name = req.body.brew_name;
	var review = req.body.brew_review;
	var get_statement = "SELECT brewery_name, review, review_date FROM reviews;"
	var insert_statement = "INSERT INTO reviews(brewery_name, review)";
	insert_statement += " VALUES ('" + name + "','" + review + "');"; // Write a SQL statement to insert a review

	// console.log("Ran: " + insert_statement);

	db.task('get-everything', task => {
		return task.batch([
			task.any(insert_statement),
			task.any(get_statement)
		]);
	})
	.then(info => {
		res.render('pages/reviews',{
			data: info[1],
			filter: ''
			})
	})
	.catch(err => {
			console.log('error', err);
			res.render('pages/reviews', {
			data: '',
			filter: ''
			})
	});
});

// This will populate the review page after filtering
app.post('/reviews/get_reviews', function(req, res) {
	var brewery = req.body.brewery;
	var get_statement = "SELECT brewery_name, review, review_date FROM reviews WHERE brewery_name='";
	get_statement += brewery + "';"
	var getall_statement = "SELECT brewery_name, review, review_date FROM reviews;"
	// console.log("Ran: ", get_statement);

	db.task('get-everything', task => {
		return task.batch([
			task.any(get_statement),
			task.any(getall_statement)
		]);
	})
	.then(info => {
		res.render('pages/reviews',{
			data: info[1],
			filter: info[0]
			})
	})
	.catch(err => {
			console.log('error', err);
			res.render('pages/reviews', {
				data: '',
				filter: ''
			})
	});

});

module.exports = app.listen(3000);
// const PORT = process.env.PORT || 8080;

// const server = app.listen(PORT, () => {
// 	console.log(`Express running → PORT ${server.address().port}`);
// });
console.log('3000 is the magic port');