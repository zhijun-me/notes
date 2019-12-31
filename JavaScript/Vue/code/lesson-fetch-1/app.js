var vm = new Vue({
	el: '#vue-app',
	data: {
		todos: [],
		todo: {
			title: "",
			completed: false
		}
	},
	// mounted: () => {
	mounted() {
		// fetch('http://jsonplaceholder.typicode.com/todos').then(res => {
		// 	return res.json();
		// }).then(todos => {
		// 	this.todos = todos;
		// });
		//axios

		axios.get('http://jsonplaceholder.typicode.com/todos').then(
			res => {
				this.todos = res.data;
			}
		);
	},
	methods: {
		submit() {
			// fetch('http://jsonplaceholder.typicode.com/todos', {
			// 	method: 'POST',
			// 	body: JSON.stringify(this.todo),
			// 	headers: {
			// 		'Content-Type': 'application/json'
			// 	}

			// }).then(res => {
			// 	return res.json();
			// }).then(todo => {
			// 	this.todos = [
			// 		todo
			// 	];
			// });


			//axios post
			axios.post('http://jsonplaceholder.typicode.com/todos', this.todo).then(res => {
				this.todos.unshift(res.data);
			});
		}
	}
});
