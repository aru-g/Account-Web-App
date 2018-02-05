var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");

//STATIC FILES
app.use(express.static('public'));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data

/*MY SQL Connection Info*/
var pool = mysql.createPool({
	connectionLimit : 25,
	host     : 'localhost',
	user     : 'root',
	password : 'aru123',
	database : 'ibm_account',
	port :'3306'
});


//TEST CONNECTION
pool.getConnection(function (err, connection) {
	if (!err) {
		console.log("Database is connected ... ");
		connection.release();
	} else {
		console.log("Error connecting database ... ");
	}
});

// ROOT - Loads Angular App
app.get('/', function (req, res) {
	res.sendFile( __dirname + "/" + "index.html" );
});

// This responds a GET request for the /list page.
app.get('/api/list', function (req, res) {
	console.log("GET Request :: /list");
	var data = {
        "error": 1,
        "products": ""
    };
	
	pool.getConnection(function (err, connection) {
		connection.query('SELECT * from account', function (err, rows, fields) {
			connection.release();

			if (rows.length !== 0 && !err) {
				data["error"] = 0;
				data["products"] = rows;
				res.json(data);
				console.log(rows);
			} else if (rows.length === 0) {
				//Error code 2 = no rows in db.
				data["error"] = 2;
				data["products"] = 'No accounts Found..';
				res.json(data);
			} else {
				data["products"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
		//		log.error('Error while performing Query: ' + err);
			}
		});
	
	});
});

//INSERT new product
app.post('/api/insert', function (req, res) {
    var acc_name = req.body.acc_name;
    var master_acc_name = req.body.master_acc_name;
    var region = req.body.region;
    var data = {
        "error": 1,
        "products": ""
    };
	console.log('POST Request :: /insert: ');
    if (!!acc_name && !!master_acc_name && !!region) {
		pool.getConnection(function (err, connection) {
			connection.query("INSERT INTO account SET acc_name = ?, master_acc_name = ?, region = ?",[acc_name,  master_acc_name, region], function (err, rows, fields) {
				if (!!err) {
					data["products"] = "Error Adding data";
					if (err.code === 'ER_DUP_ENTRY') {
						data["error"]=2;
      					 console.log("Account Already Exists");
    					}
					console.log(err);
				} else {
					data["error"] = 0;
					data["products"] = "Account Added Successfully";
					//console.log(result)
					console.log("Added: " + [acc_name, master_acc_name, region]);
		
				}
				res.json(data);
			});
        });
    } else {
        data["products"] = "Please provide all required data (i.e : name, desc, price)";
        res.json(data);
    }
});

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("dummy app listening at: " + host + ":" + port);

})