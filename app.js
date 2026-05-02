let input = document.querySelector('.entered-list');
let addBtn = document.querySelector('.add-list');
let tasks = document.querySelector('.tasks');

//add btn disabled

input.addEventListener('keyup', () => {
    if(input.value.trim() != 0){
        addBtn.classList.add('active')
    } else {
        addBtn.classList.remove('active')
    }
})

// add new item to list

addBtn.addEventListener('click', () => {
    if(input.value.trim() != 0){
       let newItem = document.createElement('div');
       newItem.classList.add('item');
        
       newItem.innerHTML = createTaskHTML(input.value);
        
            tasks.appendChild(newItem);
            input.value = '';
    } else {
        alert('Please enter a task')
    }
})

tasks.addEventListener('click', (e) => {

  // COMPLETE (text pe click)
  if (e.target.tagName === "P") {
    e.target.classList.toggle('completed');

    let itemText = e.target.innerText;

    tasksArray = tasksArray.map(task => {
      if (task.text === itemText) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  // DELETE
  else if (e.target.classList.contains('fa-xmark')) {
    let itemText = e.target.parentElement.parentElement.querySelector("p").innerText;

    tasksArray = tasksArray.filter(task => task.text !== itemText);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));

    e.target.parentElement.parentElement.remove();
  }

  // EDIT
  else if (e.target.classList.contains('fa-pen-to-square')) {
    let taskElement = e.target.parentElement.parentElement.querySelector("p");
    let oldText = taskElement.innerText;

    let newText = prompt("Edit task:", oldText);

    if (newText && newText.trim() !== "") {
      taskElement.innerText = newText;

      tasksArray = tasksArray.map(task => {
        if (task.text === oldText) {
          return { ...task, text: newText };
        }
        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(tasksArray));
    }
  }

});

function createTaskHTML(text, completed = false) {
  return `
    <p class="${completed ? 'completed' : ''}">${text}</p>
    <div class="item-btn">
      <i class="fa-solid fa-pen-to-square"></i>
      <i class="fa-solid fa-xmark"></i>
    </div>
  `;
}

window.onload = () => {
  tasksArray.forEach(task => {
    let newItem = document.createElement('div');
    newItem.classList.add('item');

    newItem.innerHTML = createTaskHTML(task.text, task.completed);

    tasks.appendChild(newItem);
  });
};

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addBtn.click();
  }
});
