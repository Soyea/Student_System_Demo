var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/vue-data";

function MongoUtil(collectionName){
	this.collectionName=collectionName;
}
MongoUtil.prototype={
	connect:function(callback){
		var that=this;
		MongoClient.connect(DB_STR,function(err,db){
			if(err){res.end(err);db.Close();return;}
			var collection=db.collection(that.collectionName);
			callback(collection,db);
		});
	},
	del:function(key,callback){
		this.connect(function(collection,db){
			collection.remove(key,function(err,result){
				callback(result.result.n.toString());
				db.close();
			})
		});
	},
	add:function(item,callback){
		this.connect(function(collection,db){
			collection.insert(item,function(err,result){
				callback(result.result.n.toString());
				db.close();
			})
		});
	},
	update:function(par1,item,callback){
		this.connect(function(collection,db){
			collection.update(par1,{$set:item},function(err,result){
				callback(result.result.n.toString());
				db.close();
			})
		});	
	},
	getAll:function(sql,callback){
		this.connect(function(collection,db){
			db.eval(sql,function(err,result){
				callback(result);
				db.close();
			})
		})
	}
};
module.exports=MongoUtil;








