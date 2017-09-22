var http=require('http');
var route=require('./route.js');
var server=http.createServer(function(req,res){
	if(/favicon.ico/.test(req.url)) {
		res.end();return;
	}
	res.writeHeader(200,{
		'Access-Control-Allow-Methods':'POST,GET,PUT,DELETE,OPTIONS',
		'Access-Control-Allow-Headers':'Content-Type',
		'Access-Control-Allow-Origin':'*'

	});
	if(req.method=='OPTIONS') res.end();
	else route(req,res);
});
server.listen(8080);
console.log('server is running at 8080 port...');