const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const progressBar = document.getElementById('progress-bar');

// Add progress percentage text
const progressPercentage = document.createElement('div');
progressPercentage.id = 'progress-percentage';
progressPercentage.textContent = '0%'; // Initial percentage
document.getElementById('progress-container').appendChild(progressPercentage);

// Event listener for adding a task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
  }
});

// Function to add a task
function addTask(taskText) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  const taskContent = document.createElement('span');
  taskContent.textContent = taskText;

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete-btn');
  completeBtn.innerHTML = '&#x2714;'; // Animated green checkmark
  completeBtn.addEventListener('click', () => {
    taskItem.classList.toggle('completed');
    updateProgress();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.innerHTML = '&#x2716;'; // Animated red X
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    updateProgress();
  });

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn');
  editBtn.innerHTML = '&#9998;'; // Animated edit icon
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit task:', taskContent.textContent);
    if (newText) {
      taskContent.textContent = newText;
    }
  });

  taskItem.appendChild(taskContent);
  taskItem.appendChild(completeBtn);
  taskItem.appendChild(deleteBtn);
  taskItem.appendChild(editBtn);
  taskList.appendChild(taskItem);

  updateProgress();
}

// Update the progress bar and percentage
function updateProgress() {
  const totalTasks = taskList.children.length;
  const completedTasks = document.querySelectorAll('.task-item.completed').length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const dashOffset = 314 - (314 * progress) / 100;
  progressBar.style.strokeDashoffset = dashOffset;
  progressPercentage.textContent = `${Math.round(progress)}%`;
}
