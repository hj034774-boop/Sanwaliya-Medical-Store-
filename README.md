const STORAGE_KEY = 'todo-list-items';
const filters = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const taskCount = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let activeFilter = 'all';

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updateTaskCounter() {
  const remaining = tasks.filter((task) => !task.completed).length;
  const total = tasks.length;
  taskCount.textContent = `${remaining} of ${total} remaining`;
}

function render() {
  const visibleTasks = tasks.filter(filters[activeFilter]);

  todoList.innerHTML = '';

  if (visibleTasks.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }

  visibleTasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `todo-item ${task.completed ? 'completed' : ''}`;
    item.dataset.id = task.id;

    const checkbox = document.createElement('button');
    checkbox.type = 'button';
    checkbox.className = 'check-btn';
    checkbox.setAttribute('aria-label', task.completed ? 'Mark task as incomplete' : 'Mark task as complete');
    checkbox.addEventListener('click', () => toggleTask(task.id));

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('aria-label', `Delete task: ${task.text}`);
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteBtn);
    todoList.appendChild(item);
  });

  updateTaskCounter();
}

function addTask(text) {
  const trimmedText = text.trim();
  if (!trimmedText) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    text: trimmedText,
    completed: false,
  });

  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(input.value);
  input.value = '';
  input.focus();
});

clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    render();
  });
});

render();
