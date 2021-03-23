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
		const todo = event.target.parentElement;
		todo.classList.toggle("completed");
	}
});

// Functions

/* render to-do */
const render = function(todo){
	let todoDiv = document.createElement('div');
	todoDiv.classList.add("todo");

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

	todoList.splice(todoList.findIndex(el=>el.id == todoId));


	event.target.closest('.todo').remove();

}

