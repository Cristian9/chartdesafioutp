var express = require("express");
var app = express();
var fs = require("fs");
var request = require("request");
var http = require("http").Server(app);
var PORT = process.env.PORT || 3000;


app.use(express.static(__dirname + '/statics/'));


var html = fs.readFileSync("./views/index.html");

http.listen(PORT, function(){
	console.log('Server on port: ' + PORT);
});

app.get("/", function(req, res){
	var html = fs.readFileSync('views/index.html');
	res.write(html);
	res.end();
});

app.get("/graficar", function(req, res){
	request({
		uri : 'http://desafio.utp.edu.pe/resumenporcurso/',
		method : 'GET',
		qs : {
			course_id : req.query.curso_id
		}
	}, function(err, response, body){
		res.send(body);
	});
});