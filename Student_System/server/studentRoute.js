
var MongoUtilCtr=require('./mongoUtil.js');
var MongoUtil=new MongoUtilCtr('student');
var Student={
	del:function(req,res){
		var key=req.url.match(/[^\/]+$/)[0];
		MongoUtil.del({id:key},function(result){
			res.write(result);
			res.end();
		});
	},
	add:function(req,res){
		var qStr='';
		//从请求体中获取请求数据会不断触发data事件
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		//从请求体中获取完请求数据会触发end事件
		req.addListener('end',function(){
			var temp=JSON.parse(qStr);
			MongoUtil.add(temp,function(result){
				res.write(result);
				res.end();
			});
		});
	},
	update:function(req,res){
		var qStr='';
		//从请求体中获取请求数据会不断触发data事件
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		//从请求体中获取完请求数据会触发end事件
		req.addListener('end',function(){
			var temp=JSON.parse(qStr);
			MongoUtil.update({id:temp.id},temp,function(result){
				res.write(result);
				res.end()
			});
		});
	},
	getAll:function(req,res){
		var qStr='';
		//从请求体中获取请求数据会不断触发data事件
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		//从请求体中获取完请求数据会触发end事件
		req.addListener('end',function(){
			var obj=JSON.parse(qStr);
			var findInfo=JSON.stringify(obj.findInfo);
			var pageInfo=JSON.stringify(obj.pageInfo);
			var sql='getAll("student",\''+pageInfo+'\',\''+findInfo+'\')';
			MongoUtil.getAll(sql,function(result){
					res.write(JSON.stringify(result));
					res.end();
			});
		});
	}
};
module.exports=Student;