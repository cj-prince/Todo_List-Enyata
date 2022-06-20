window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');
  const dateInput = document.querySelector('#dateInput');
  const timeInput = document.querySelector('#timeInput');
  const sortItems = document.querySelector('#sortBtn');

	const username = localStorage.getItem('username') || '';
	nameInput.value = username;

  let dateValue, timeValue, todaysDate, currentDate, sortDate;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

  dateInput.addEventListener('click', ()=>{
    let todayDate = new Date()
    if(todayDate.getMonth >9){
      todaysDate = `${todayDate.getFullYear()}-${todayDate.getMonth()+1}-${todayDate.getUTCDate()}`;
    }else{
      todaysDate = `${todayDate.getFullYear()}-0${todayDate.getMonth()+1}-${todayDate.getUTCDate()}`;
    }
    document.getElementById("dateInput").min=todaysDate;
  })

  timeInput.addEventListener('click', ()=>{
    let todayDate = new Date()
    todaysTime = `${todayDate.getHours()}:${todayDate.getMinutes()}`;
    document.getElementById("timeInput").min=todaysTime;
  })

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

    if(!e.target.elements.content.value){
      alert("Please add a task.")
      return;
    }

    if(!e.target.elements.category.value){
      alert("Please add a category.")
      return;
    }

    if(!dateInput.value){
      currentDate = new Date();
      if(currentDate.getMonth >9){
        dateValue = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getUTCDate()}`;
        sortDate = currentDate;
      }else{
        dateValue = `${currentDate.getFullYear()}-0${currentDate.getMonth()+1}-${currentDate.getUTCDate()}`;
        sortDate = currentDate;
      }
    }else{
      dateValue = dateInput.value;
      sortDate = new Date(dateValue);
      dateInput.value="";
    }

    if(!timeInput.value){
      currentDate = new Date()
      timeValue = `${currentDate.getHours()}:${currentDate.getMinutes()}`
      console.log(timeValue);
    }else{
      timeValue = timeInput.value;
      timeInput.value="";
    }

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
      date: dateValue,
      time: timeValue,
			createdAt: new Date().getTime(),
      taskDate: sortDate
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

  sortItems.addEventListener("click",(e)=>{
    todos = todos.sort((a, b) => {
      return new Date(a.taskDate) - new Date(b.taskDate);
    });
    localStorage.setItem('todos', JSON.stringify(todos));

     DisplayTodos()
  } );
  
	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const editButton = document.createElement('button');
		const deleteButton = document.createElement('button');
		const dateTime = document.createElement('div');
		const dateDisplay = document.createElement('span');
		const timeDisplay = document.createElement('span');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		editButton.classList.add('edit');
		deleteButton.classList.add('delete');
		dateTime.classList.add('dataTime');
		dateDisplay.classList.add('datadisplay');
		timeDisplay.classList.add('timedisplay');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		editButton.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';
    dateDisplay.innerHTML = todo.date;
    timeDisplay.innerHTML = todo.time;

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(editButton);
		actions.appendChild(deleteButton);
    dateTime.appendChild(dateDisplay)
    dateTime.appendChild(timeDisplay)
    // actions.appendChild(dateTime)
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		todoItem.appendChild(dateTime);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		editButton.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})
	})
}