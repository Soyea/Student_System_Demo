var alert=Vue.extend({
	template:'#alert',
	//局部注册popwindow组件
	components:{popwindow:popwindow}
});
//全局注册alert组件
Vue.component('alert',alert);