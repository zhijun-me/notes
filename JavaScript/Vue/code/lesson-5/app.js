var vm = new Vue({
	el: '#vue-app',
	data: {
		ary: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
		users: [{
				name: '小猪佩奇',
				age: 3
			},
			{
				name: '小羊苏西',
				age: 4
			}, {
				name: '小兔丽贝卡',
				age: 5
			}

		],
	},
	methods: {
		changeIf: function() {
			this.if_sts = !this.if_sts;
		},
		changeShow: function() {
			this.show_sts = !this.show_sts;
		}
	},
	computed: {

	}
});
