var grid=Vue.extend({
	template:'#grid',
	components:{edit:edit,page:page},
	props:['gridName'],
	data:function(){
		return {
			items:[],
			rItem2:{},
			rItem:{}//检索模型
		};
	},
	computed:{
		state:function(){
			return this.$store.state.grid[this.gridName];
		}
	},
	created:function(){
		var that=this;
		that.rItem2.pNames=[];//记录哪些属性传到服务器是要进行等值匹配查询
		this.state.fields.forEach(function(v){
			if(v.isRItem){
				that.rItem2[v.name]=that.rItem[v.name]=v.defVal;
				if(v.type) {
					that.rItem2.pNames.push(v.name);
					that.rItem2[v.name]=that.rItem[v.name]='';
				}
			}
		});
		this.getData();
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
		getData:function(){
			//从服务器拿取数据
			this.$http({
				url:this.$store.state.grid.url+this.gridName+'/getAll',
				method:'POST',
				data:JSON.stringify({
					pageInfo:this.state.pageConfig,
					findInfo:this.rItem2
				})
			}).then(function(res){
				this.items=res.data.data;
				this.state.pageConfig.total=res.data.total;
			},function(){});
		},
		pageChange:function(){this.getData();},
		beginEdit:function(key){
			if(key){
				for(var i=0;i<this.items.length;i++){
					if(key==this.items[i][this.state.key]){
						//this.deepCopy(this.items[i],this.editItem);
						this.$store.commit('grid/beginEdit',{
							item:this.items[i],
							deepCopy:this.deepCopy,
							isAdd:false,
							gridName:this.gridName
						});
						break;
					}
				}
			}else{
				var temp={};
				this.state.fields.forEach(function(v){
					temp[v.name]=v.defVal;
				});
				console.log(temp);
				this.$store.commit('grid/beginEdit',{
					item:temp,
					deepCopy:this.deepCopy,
					isAdd:true,
					gridName:this.gridName
				})
			}
		},
		endEdit:function(){
			this.editShow=false;
		},
		completeEdit:function(){
			if(this.state.addOrUpdate=='add'){
				this.$http({
					url:this.$store.state.grid.url+this.gridName+'/add',
					method:"POST",
					data:JSON.stringify(this.state.editItem)
				}).then(function(res){
					if("1"==res.data){
						this.$store.commit('grid/endEdit',this.gridName);
						this.$store.commit('alert/open','新增成功');
						var temp={};
						this.deepCopy(this.state.editItem,temp);
						this.items.push(temp);
						this.state.pageConfig.total+=1;
					}else{
						this.$store.commit('alert/open',res.data);
					}
				});
			}else{
				this.$http({
					url:this.$store.state.grid.url+this.gridName+'/update',
					method:"POST",
					data:JSON.stringify(this.state.editItem)
				}).then(function(res){
					if("1"==res.data){
						var key=this.state.key;
						this.$store.commit('grid/endEdit',this.gridName);
						this.$store.commit('alert/open','修改成功');
						for(var i=0;i<this.items.length;i++){
							if(this.state.editItem[key]==this.items[i][key]){
								this.deepCopy(this.state.editItem,this.items[i]);
								break;
							}
						}
					}else{
						this.$store.commit('alert/open',res.data);
					}
				});
			}
		},
		del:function(key){
			console.log(this.items);
			if(!confirm('真删?')) return;
			//发送ajax请求
			this.$http({
				url:this.$store.state.grid.url+this.gridName+'/del/'+key,
				method:'get'
			}).then(function(res){
				console.log(res.data);
				if("1"==res.data){
					this.$store.commit('alert/open','删除成功');
					for(var i=0;i<this.items.length;i++){
						if(this.items[i][this.state.key]==key){
							this.items.splice(i,1);
							break;
						}
					}
					//更新总记录数
					this.state.pageConfig.total-=1;
				}
			},function(){});
		},
		selData:function(){
			this.state.pageConfig.curPage=1;
			this.state.pageConfig.pageGroupIndex=1;
			this.deepCopy(this.rItem,this.rItem2);
			this.getData();
		}
	},
	filters:{
		showValue:function(oldValue,field){
			if(field.type){
				for(var i=0;i<field.options.length;i++){
					if(field.options[i].value==oldValue)
						return field.options[i].name;
				}
			}
			return oldValue;
		}
	}
});
//全局注册grid
Vue.component('grid',grid);