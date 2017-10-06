var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var session = require("express-session");
var path = require("path");
var app = express();

app.use(session({ secret: 'codingdojorocks' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
//setup views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

/////////////// routes ///////////////////
app.get('/', function (req, res) {
	res.render("index");
})
app.post('/', function (req, res) {
	res.render("index");
})

///////////////// Socket data ///////////////////////
var server = app.listen(8000, function(){
	console.log("listening on port 8000.")
})

var io = require('socket.io').listen(server);

var count = 0;	
io.sockets.on('connection', function (socket) {
	/////////////////
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);
	socket.on("count", function (data) {
		console.log("testign**************888")
		/////////////////
		count++;
		socket.emit('counter', {
			counter: count
		});
		socket.broadcast.emit('counter', {
			counter: count
		});
	})

	socket.on("reset", function (data) {
		count=0;
		socket.emit('counter', {
			counter: count
		});
		socket.broadcast.emit('counter', {
			counter: count
		});
		})

	
/////////////////
})
