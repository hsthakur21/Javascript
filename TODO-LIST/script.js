// Get DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTodos);

// Add task event
todoForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const taskText = todoInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    saveToLocalStorage(taskText);
    todoInput.value = "";
  }
});

// Add task to list
function addTask(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;
  
  // Add complete functionality
  li.addEventListener("click", function() {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  // Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function() {
    li.remove();
    removeFromLocalStorage(taskText);
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// Save task to localStorage
function saveToLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks.push(taskText);
  localStorage.setItem("todos", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTodos() {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(function(task) {
    addTask(task);
  });
}

// Get tasks from localStorage
function getTasksFromLocalStorage() {
  let tasks = localStorage.getItem("todos");
  return tasks ? JSON.parse(tasks) : [];
}

// Update task status in localStorage
function updateLocalStorage() {
  const allTasks = document.querySelectorAll("li");
  const tasks = [];

  allTasks.forEach(function(task) {
    if (!task.classList.contains("completed")) {
      tasks.push(task.textContent.replace("Delete", "").trim());
    }
  });

  localStorage.setItem("todos", JSON.stringify(tasks));
}

// Remove task from localStorage
function removeFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem("todos", JSON.stringify(tasks));
}
