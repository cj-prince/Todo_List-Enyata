  //select window
  window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || []; //initialises the array of tasks into local storage so the list does not clear when the page is refreshed. 
    const form = document.querySelector("#newtask");
	const input = document.querySelector("#input");      //selecting our form and input


  form.addEventListener('submit', (e)=>{
    e.preventDefault(); // stoping page refresh

    //adds the text value to a variable
    const list = input.value;

    //This is to stop empty tasks from being added
    if(!list){
        alert("Please include a task.")
        return;
    }

    //creates an object that holds the text value of a task
    const todo = {
        content: list
    }
   
    //moves the task object into the array of tasks
    todos.push(todo);

    //localStorage cannot hold arrays so this converts it into a string
    localStorage.setItem('todos', JSON.stringify(todos));

    input.value = ''

    displayList()
  });

        displayList()
  })

  //This function checks the array of tasks, makes changes and then displays the rendered html elements
  function displayList(){
    const listing = document.querySelector("#displayed"); // selecting task display area
    listing.innerHTML = "";
    
    todos.forEach(todo => {
        const display = document.createElement('div'); //creating a div element
        display.classList.add('task'); //creating a classname for the div

        //creating all the relevant elements to be added
        const content = document.createElement('div');
        const list_dis = document.createElement('input'); // creating and selecting input display
        const list_actions = document.createElement('div');
        const text_edit = document.createElement('button');
        const text_delete = document.createElement('button');

        //this is a specifying a singular task item.  
        list_dis.type = 'text';
        list_dis.value = todo.content;
        list_dis.setAttribute('readonly', 'readonly');

        //adding HTML classes to the created elements so that they will be styled properly
        content.classList.add('content');
        list_dis.classList.add('text');
        list_actions.classList.add('buttons');
        text_edit.classList.add('edit');
        text_delete.classList.add('delete');

        //labelling the buttons
        text_edit.innerHTML = 'Edit';
        text_delete.innerHTML = 'Delete';

        //properly appending tchild elements to their parents
        content.appendChild(list_dis);
        display.appendChild(content); 
        list_actions.appendChild(text_edit);
        list_actions.appendChild(text_delete);
        display.appendChild(list_actions);

        listing.appendChild(display); //content display: ;

        text_edit.addEventListener('click', (e) => {                    //text editng 
			if (text_edit.innerText.toLowerCase() == 'edit') {
				list_dis.removeAttribute("readonly");
				list_dis.focus();
        text_edit.innerText = "Save";
			} else {
				text_edit.innerText = "Edit";
				list_dis.setAttribute("readonly", "readonly");
                todo.content = list_dis.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				displayList();
			}
		});

		text_delete.addEventListener('click', (e) => {              //text delete
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			displayList();
		});
    })
  }