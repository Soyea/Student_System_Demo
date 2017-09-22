var edit=Vue.extend({
	template:'#edit',
	components:{popwindow:popwindow},
	data:function(){
		return {
			isValid:true,
			errMsg:''
		};
	},
	props:['gridName'],
	computed:{//计算属性
		state:function(){return this.$store.state.grid[this.gridName];},
		title:function(){
			return this.state.addOrUpdate=='add'
				?"新增"
				:"修改-"+this.state.editItem[this.state.key];
			
		}
	},
	methods:{
		deepCopy:function(obj1,obj2){
			for(var p in obj1){
				if(Array.isArray(obj1[p]))
					obj2[p]=obj1[p].slice(0);
				else if(obj1[p]!=null&&(typeof obj1[p]=='object')){
					obj2[p]={};
					arguments.callee(obj1[p],obj2[p]);
				}else
					obj2[p]=obj1[p];
			}
		},
		editComplete:function(){
			if(this.isValid)
				this.$emit('edit-complete');
			else
				this.$store.commit('alert/open',this.errMsg);
		},
		validate:function(value,reg,errMsg){
			if(reg){
				if(!reg.test(value)){
					this.isValid=false;
					this.errMsg=errMsg;
					this.$store.commit('alert/open',errMsg);
				}else
					this.isValid=true;
			}
		}
	}
});