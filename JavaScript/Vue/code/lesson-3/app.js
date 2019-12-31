var data={
	name: '米斯特吴'
}
Vue.component('greeting', {
	template: `<div>
	<h2>这是全局组件greeting 我的名字是 {{name}} </h2>
	<button type="button" @click="changeName">改名</button>
	</div>
	`,
	data() {
		return data;
	},
	methods: {
		changeName() {
			data.name+='米修在线'
		}
	}
});

var vm = new Vue({
	el: '#vue-app',
	data: {
		mrChangeColor: true,
		mrChangeLength: true
	},
	methods: {
		ChangeLength: function() {
			this.mrChangeLength = !this.mrChangeLength;
		}
	},
	computed: {
		ChangeColor: function() {
			return {
				changeColor: this.mrChangeColor,
				changeLength: this.mrChangeLength
			};
		},

	}
});
