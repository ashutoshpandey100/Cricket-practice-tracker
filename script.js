const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progress-fill");

let tasks = JSON.parse(localStorage.getItem("cricketTasks")) || [];

function updateProgress() {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    progressText.textContent = `Progress: ${percent}%`;
    progressFill.style.width = `${percent}%`;
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span>
            <button onclick="deleteTask(${index})">❌</button>
        `;
        taskList.appendChild(li);
    });
    updateProgress();
    localStorage.setItem("cricketTasks", JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return alert("Please enter a task!");
    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", renderTasks);
