var alertModule={
	namespaced:true,
	state:{
		isShow:false,
		msg:''
	},
	getters:{},
	mutations:{
		open:function(state,msg){
			state.isShow=true;
			state.msg=msg;
		},
		close:function(state){
			state.isShow=false;
		}
	},
	actions:{}
};