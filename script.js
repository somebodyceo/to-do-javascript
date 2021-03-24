// list of to-do's
const todoList = [];

// Selectors
const input = document.querySelector("#form-input");
const formButton = document.querySelector(".form-button");
const inputFilter = document.querySelector(".content__todo--filter");
const htmlTodoList = document.querySelector(".content__todo--list");



// Event Listeners

/* fetch form input */
formButton.addEventListener("click", (e)=>{
	// prevent page reload
	e.preventDefault();

	if(input.value===""){alert("Please register a valid to-do"); return;}

	// build new todo
	const todo={
		id: Math.round(Math.random()*10000 +1),
		title: input.value,
		state: false // completed: true | uncompleted: false
	};

	// add to-do to array
	todoList.push(todo);

	// reset input field
	input.value="";

	// render HTML
	render(todo);
})

/* listen to to-do's buttons */
htmlTodoList.addEventListener("click",(event)=>{
	if(event.target.matches(".trash-btn")){ /*|| event.target.matches(".fa-trash")*/
		removeTodo(event)
	}
	if(event.target.matches(".complete-btn")){ /*|| event.target.matches(".fa-check")*/
		// selecting button element
		const todo = event.target.parentElement;

		// change todo status on array
		const todoId = todoList.findIndex(el=>el.id == todo.dataset.id);
		const status = todoList[todoId].state;
		todoList[todoId].state = !status;

		//formatting todo
		todo.classList.toggle("complete");

		// formatting todo complete button
		event.target.classList.toggle("check");

		// re-rendering todo list
		filterTodos();
	}
});


// Functions

/* render to-do */
const render = function(todo, filter=false){

	let todoDiv = document.createElement('div');
	todoDiv.classList.add("todo");
	if(todo.state) todoDiv.classList.toggle("complete");


	const newTodo = document.createElement('li');
	newTodo.innerText = todo.title;
	todoDiv.appendChild(newTodo);

	const completeBtn = document.createElement('button');
	const trashBtn = document.createElement('button');

	completeBtn.setAttribute("class","complete-btn");

	trashBtn.setAttribute("class","trash-btn");
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'
	trashBtn.innerHTML = '<i class="fas fa-trash"></i>'

	todoDiv.appendChild(completeBtn);
	todoDiv.appendChild(trashBtn);

	todoDiv.setAttribute("data-id",todo.id)

	htmlTodoList.appendChild(todoDiv);
}


const removeTodo = function(event){
	const htmlTodo = event.target.closest('.todo');
	const todoId = htmlTodo.dataset.id;

	// remove todo from array
	todoList.splice(todoList.findIndex(el=>el.id == todoId));

	// remove todo from html
	event.target.closest('.todo').remove();
}


const filterTodos = function(){

	// completed   - true
	if(inputFilter.value.toLowerCase() === "completed"){
		const completeList = todoList.filter(todo=> todo.state === true);
		htmlTodoList.innerHTML = "";
		completeList.map(todo=>render(todo, true));
		return;

	}
	// uncompleted - false
	else if(inputFilter.value.toLowerCase() === "uncompleted"){
		const uncompleteList = todoList.filter(todo=> todo.state === false);
		htmlTodoList.innerHTML = "";
		uncompleteList.map(todo=>render(todo, true));
		return;
	}
	// all
	else {
		// clean list in case of filter usage
		htmlTodoList.innerHTML = "";
		todoList.map(todo=>render(todo, true));

	}
	

}