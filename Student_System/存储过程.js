
//存储过程测试代码
var pageInfo={pageSize:8,curPage:1,total:0};
var findInfo={id:'',name:'',sex:'male',pNames:['sex']};
db.eval('getAll("student",\''+JSON.stringify(pageInfo)+'\',\''+JSON.stringify(findInfo)+'\')')


//创建存储过程
db.system.js.insert({
	_id:'getAll',
	value:function(name,pageInfo,findInfo){
		pageInfo=JSON.parse(pageInfo);
		findInfo=JSON.parse(findInfo);
		var skip=(pageInfo.curPage-1)*pageInfo.pageSize;
		var condition={};
		Object.keys(findInfo).forEach(function(v){
			if(v!='pNames'&&findInfo[v]!='')
				condition[v]=findInfo.pNames.indexOf(v)==-1
						?new RegExp(findInfo[v])
						:findInfo[v];
		})
		return {
			total:db[name].count(condition),
			data:db[name].find(condition,{_id:0})
				.skip(skip).limit(pageInfo.pageSize)
				.toArray()
		};
	}
});
//分组
db.dormitory.group({
	key:{type:true},
	initial:{count:0,names:[]},
	reduce:function(cur,end){
		end.names.push(cur.name);
		end.count++;
		return end;
	},
	condition:{type:'male'}
})