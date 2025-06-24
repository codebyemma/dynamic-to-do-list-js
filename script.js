document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function addTask(taskText, save = true) {
    if (taskText !== "") {
      if (save) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
      }

      const task = document.createElement("li");
      task.textContent = taskText;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");

      removeButton.addEventListener("click", () => {
        task.remove();
        removeTaskFromStorage(taskText); // Optional: remove from localStorage too
      });

      task.appendChild(removeButton);
      taskList.appendChild(task);
    } else {
      alert("Please enter a task");
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
    addTask(taskText); // only pass cleaned input here
    taskInput.value = ""; // clear after adding
  });
});
