document.addEventListener("DOMContentLoaded", () => {
  // Create and insert the UI dynamically
  const input = document.createElement("input");
  input.id = "task-input";
  input.placeholder = "Enter a task";

  const button = document.createElement("button");
  button.id = "add-task-btn";
  button.textContent = "Add Task";

  const ul = document.createElement("ul");
  ul.id = "task-list";

  document.body.appendChild(input);
  document.body.appendChild(button);
  document.body.appendChild(ul);

  const taskInput = document.getElementById("task-input");
  const addButton = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  function addTask(taskText, save = true) {
    if (taskText === "") {
      alert("Please enter a task");
      return;
    }

    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (save && storedTasks.includes(taskText)) {
      alert("Task already exists.");
      return;
    }

    const task = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    task.appendChild(span);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    removeButton.addEventListener("click", () => {
      task.remove();
      removeTaskFromStorage(span.textContent);
    });

    task.appendChild(removeButton);
    taskList.appendChild(task);

    if (save) {
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  function removeTaskFromStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
    taskInput.value = "";
  });

  loadTasks();
});
