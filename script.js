window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
  todone = JSON.parse(localStorage.getItem('todone')) || [];
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

    const inputFeild = document.createElement('div')
    inputFeild.classList.add('input-field')

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

		inputFeild.appendChild(label);
		inputFeild.appendChild(content);
		inputFeild.appendChild(actions);
		todoItem.appendChild(inputFeild);
		todoItem.appendChild(dateTime);

		todoList.appendChild(todoItem);

		if (todo.done) {
			inputFeild.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				completedTodos(todo)

			} else {
				DisplayTodos()
			}

			DisplayTodos()

		})

		editButton.addEventListener('click', (e) => {
      const input = content.querySelector('input');
      if(editButton.innerText.toLowerCase() == 'edit'){
        input.removeAttribute('readonly');
        input.focus();
        editButton.innerText = 'Save';
      }else{
        editButton.innerText = "Edit";
				input.setAttribute('readonly', true);
				todo.content = input.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()
      }
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})
	})
}

function completedTodos (selected) {
	const doneList = document.querySelector('#done-list');
	doneList.innerHTML = "";

  todone.push(selected);
  todos = todos.filter(t => t != selected);
  localStorage.setItem('todos', JSON.stringify(todos));
  localStorage.setItem('todone', JSON.stringify(todone));

  
	todone.forEach(selected => {
    if(selected == null){
      todone = todone.filter((x) => {
        return x !== selected
      });
    }else{
      const doneItem = document.createElement('div');
      const inputField = document.createElement('div')
      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');
      const content = document.createElement('div');
      const actions = document.createElement('div');
      const deleteButton = document.createElement('button');
      const dateTime = document.createElement('div');
      const dateDisplay = document.createElement('span');
      const timeDisplay = document.createElement('span');
  
      input.type = 'checkbox';
      input.checked = true;
      span.classList.add('bubble');
      if (selected.category == 'personal') {
        span.classList.add('personal');
      } else {
        span.classList.add('business');
      }
  
      doneItem.classList.add('todo-item');
      inputField.classList.add('input-field')
      content.classList.add('todo-content');
      actions.classList.add('actions');
      deleteButton.classList.add('delete');
      dateTime.classList.add('dataTime');
      dateDisplay.classList.add('datadisplay');
      timeDisplay.classList.add('timedisplay');
  
      content.innerHTML = `<input type="text" value="${selected.content}" readonly>`;
      deleteButton.innerHTML = 'Delete';
      dateDisplay.innerHTML = selected.date;
      timeDisplay.innerHTML = selected.time;
  
      
      label.appendChild(input);
      label.appendChild(span);
      actions.appendChild(deleteButton);
      dateTime.appendChild(dateDisplay)
      dateTime.appendChild(timeDisplay)
      // actions.appendChild(dateTime)
  
      inputField.appendChild(label);
      inputField.appendChild(content);
      inputField.appendChild(actions);
      doneItem.appendChild(inputField);
      doneItem.appendChild(dateTime);
  
      doneList.appendChild(doneItem);
  
      if (selected.done) {
        inputField.classList.add('done');
        doneItem.classList.add('done');
      }
      
      input.addEventListener('change', (e) => {
        selected.done = e.target.checked;
        // localStorage.setItem('todone', JSON.stringify(todone));
  
        if (selected.done) {
          doneItem.classList.add('done');
          completedTodos()
        } else {
            todos.push(selected);
            todone = todone.filter(t => t != selected);
            localStorage.setItem('todos', JSON.stringify(todos));
            localStorage.setItem('todone', JSON.stringify(todone));
            DisplayTodos()
            completedTodos()
        }
      })
  
      deleteButton.addEventListener('click', (e) => {
        todone = todone.filter(t => t != selected);
        localStorage.setItem('todone', JSON.stringify(todone));
        completedTodos()
        DisplayTodos()
      })
    }
	})
}