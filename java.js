// Cierra el menú hamburguesa al hacer clic en un link
document.querySelectorAll(".ul_links .il_links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("menu_burger").checked = false;
  });
});

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';

  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);
  const sortedTasks = [...pending, ...completed];

  sortedTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(index));

    const span = document.createElement('span');
    span.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '🗑️';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addTask();
  }
});

renderTasks();


function generarColorAleatorio() {
  const letras = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}

function cambiarColores() {
  let fondo, fuente;

  do {
    fondo = generarColorAleatorio();
    fuente = generarColorAleatorio();
  } while (fondo === fuente);

  document.body.style.backgroundColor = fondo;
  document.body.style.color = fuente;
}

document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("btn");
  boton.addEventListener("click", cambiarColores);
});

