var vm = new Vue({
	el: '#vue-app',
	data: {
		if_sts:false,
		show_sts:false
	},
	methods:{
		changeIf: function() {
			this.if_sts=!this.if_sts;
		},
		changeShow:function(){
			this.show_sts=!this.show_sts;
		}
	},
	computed: {
		
	}
});
