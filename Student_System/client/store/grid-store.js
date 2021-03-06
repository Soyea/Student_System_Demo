var studentConfig={
	namespace:true,
	title:'基本信息',
	headers:["学号","姓名","性别","家庭住址","民族"],
	isEdit:true,
	editShow:false,
	editItem:{id:"",name:"",sex:"",address:"",nation:""},
	key:'id',
	addOrUpdate:'add',	
	fields:[
		{name:'id',isKey:true,defVal:'',isRItem:true},
		{
			name:'name',
			isRItem:true,
			defVal:'',
			reg:/^[\u4e00-\u9fa5]{2,4}$/,
			errMsg:'出错啦！'
		},
		{
			name:'sex',
			isRItem:true,
			defVal:'male',
			type:'radio',
			options:[
				{name:'男',value:'male'},
				{name:'女',value:'female'}
			]
		},
		{name:'address',defVal:''},
		{
			name:'nation',
			defVal:'汉族',
			type:'select',
			options:[
				{name:'汉族',value:"汉族"},
				{name:'壮族',value:"壮族"},
				{name:'傣族',value:'傣族'},
				{name:'回族',value:"回族"},
				{name:'其它..',value:'其它..'}
			]
		}
	],
	pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1}
};
var domitoryConfig={
	namespaced:true,
	title:'寝室信息',
	headers:["寝室号","类别","可入住人数","空铺数量"],
	isEdit:true,
	editShow:false,
	editItem:{name:"",type:"male",capacity:8,vacancy:8},
	addOrUpdate:'add',
	key:'name',
	fields:[
		{name:'name',isKey:true,defVal:'',isRItem:true,},
		{
			name:'type',
			defVal:'female',
			type:'select',
			options:[
				{name:'男生寝室',value:'male'},
				{name:'女生寝室',value:'female'}
			]
		},
		{name:'capacity',defVal:8,reg:/^\d{1,2}$/,errMsg:'出错啦！'},
		{name:'vacancy',defVal:8}
	],
	pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1}
};
var gridModule={
	namespaced:true,
	state:{
		url:"http://localhost:8080/",
		grids:[]
	},
	getters:{
	},
	mutations:{
		addGrid:function(state,name){
			var i=state.grids.indexOf(name);
			if(i==-1) state.grids.push(name);
		},
		delGrid:function(state,i){
			console.log(i);
			state.grids.splice(i,1);
			console.log(state.grids)
		},
		beginEdit:function(state,options){
			var targetStore=state[options.gridName];
			options.deepCopy(options.item,targetStore.editItem);
			targetStore.editShow=true;
			targetStore.addOrUpdate=options.isAdd?'add':'update';
		},
		endEdit:function(state,gridName){
			console.log(gridName);
			state[gridName].editShow=false;
		}
	},
	actions:{},
	modules:{
		student:{state:studentConfig},
		dormitory:{state:domitoryConfig}
	}
};