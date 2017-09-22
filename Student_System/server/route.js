//获取数据http://localhost:8080/musics/getAll
var Student=require('./studentRoute.js');
var Dormitory=require('./dormitoryRoute.js');
function route(req,res){
	var reg=/^\/(\w+)\/(\w+)/;
	var result=req.url.match(reg);
	switch(result[1]){
		case 'student':
			Student[result[2]](req,res);
			break;
		case "dormitory":
			Dormitory[result[2]](req,res);
			break;
		default:break;
	}
}
module.exports=route;