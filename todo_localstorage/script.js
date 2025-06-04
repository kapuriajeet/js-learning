document.addEventListener("DOMContentLoaded", () => {
  // 1. Grab input, button, ul
  // 2. Create an array to store task in array
  // 3. Add tasks to local storage
  // 4. render each task to the dom
  // 5. Append li to the list

  const todoInput = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const tasksList = document.getElementById("todo-list");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    renderTask(task);
  });
  addTaskBtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask)
    todoInput.value = "";
    console.log(tasks);
  });

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `<span> ${task.text}</span>
      <button>Delete</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id != task.id);
      li.remove();
      saveTask();
    });

    tasksList.appendChild(li);
  }
});
