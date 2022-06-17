  //select window
  window.addEventListener('load', () => {
  const form = document.querySelector("#newtask");
	const input = document.querySelector("#input");      //selecting our form and input
	const listing = document.querySelector("#displayed"); // selecting task display area


  form.addEventListener('submit', (e)=>{
    e.preventDefault(); // stoping page refresh

    const list = input.value;

    //This is to stop empty tasks from being added
    if(!list){
        alert("Please include a task. :)")
        return;
    }

    const display = document.createElement('div'); //creating a div element
    display.classList.add('task'); //creating a classname for the div

    const content = document.createElement('div')
    content.classList.add('content');
    // content.innerText = list;  // displays the form input value in div

    display.appendChild(content);

    const list_dis = document.createElement('input'); // creating and selecting input display
    list_dis.classList.add('text');
    list_dis.type = 'text';
    list_dis.value = list;
    list_dis.setAttribute('readonly', 'readonly');

    content.appendChild(list_dis);
  
    const list_actions = document.createElement('div');
    list_actions.classList.add('buttons');

    const text_edit = document.createElement('button');
    text_edit.classList.add('edit');
    text_edit.innerHTML = 'Edit';

    const text_delete = document.createElement('button');
    text_delete.classList.add('delete');
    text_delete.innerHTML = 'Delete';

    list_actions.appendChild(text_edit);
    list_actions.appendChild(text_delete);

    display.appendChild(list_actions);

    listing.appendChild(display); //content display: ;

    input.value = ''

    text_edit.addEventListener('click', (e) => {                    //text editng 
			if (text_edit.innerText.toLowerCase() == 'edit') {
				list_dis.removeAttribute("readonly");
				list_dis.focus();
        text_edit.innerText = "Save";
			} else {
				text_edit.innerText = "Edit";
				list_dis.setAttribute("readonly", "readonly");
			}
		});

		text_delete.addEventListener('click', (e) => {              //text delete
			listing.removeChild(display);
		});
  });


  })