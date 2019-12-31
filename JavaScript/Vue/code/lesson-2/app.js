var vm=new Vue({
	el:'#body',
	data:{
		name:null,
		age:null
	},
	methods:{
		getName(){
			this.name=this.$refs.name.value;
		},
		getAge(){
			this.age=this.$refs.age.value;
		}
		
	},
	watch:{
		name:function(val,oldvar){
			console.log(val+' '+oldvar);
		}
	}
	
});