var express = require("express");
var app = express();
var fs = require("fs");
var request = require("request");
var http = require("http").Server(app);


app.use(express.static(__dirname + '/statics/'));


var html = fs.readFileSync("./views/index.html");

http.listen(3000, function(){
	console.log('Server on port 3000');
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