/*************************************
 *         Helper Functions
 *************************************/
function getTasks() {
    // Retrieve tasks from localStorage, or return an empty array if none exist
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
  
  function saveTasks(tasks) {
    // Save an array of tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  /**
   * Check how close the deadline is using Day.js:
   * - If overdue (deadline < today), mark red
   * - If within 1 day of deadline, mark yellow
   */
  function getDeadlineClass(deadline) {
    const now = dayjs();
    const taskDeadline = dayjs(deadline);
  
    // If past deadline -> overdue
    if (taskDeadline.isBefore(now, 'day')) {
      return 'overdue';
    }
  
    // If deadline is today or within the next 1 day -> near-deadline
    const diffDays = taskDeadline.diff(now, 'day');
    if (diffDays <= 1) {
      return 'near-deadline';
    }
  
    // Otherwise, no special class
    return '';
  }
  
  /**
   * Render tasks to the board. 
   * Each task will be placed in the matching column based on its status.
   */
  function renderTasks() {
    // Clear existing tasks from each column container
    document.getElementById('notYetStartedTasks').innerHTML = '';
    document.getElementById('inProgressTasks').innerHTML = '';
    document.getElementById('completedTasks').innerHTML = '';
  
    // Fetch tasks from localStorage
    const tasks = getTasks();
  
    // For each task, create a task element and insert it into the correct column
    tasks.forEach((task) => {
      const taskElement = document.createElement('div');
      taskElement.className = `task ${getDeadlineClass(task.deadline)}`;
      taskElement.draggable = true;
      taskElement.ondragstart = (event) => dragTask(event, task.id);
  
      // Basic HTML content for the task
      taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p><strong>Deadline:</strong> ${task.deadline}</p>
        <button onclick="deleteTask(${task.id})">Delete</button>
      `;
  
      // Decide which column to append to
      if (task.status === 'Not Yet Started') {
        document.getElementById('notYetStartedTasks').appendChild(taskElement);
      } else if (task.status === 'In Progress') {
        document.getElementById('inProgressTasks').appendChild(taskElement);
      } else if (task.status === 'Completed') {
        document.getElementById('completedTasks').appendChild(taskElement);
      }
    });
  }
  
  /*************************************
   *       Drag & Drop Functions
   *************************************/
  function allowDrop(event) {
    event.preventDefault();
  }
  
  // This will store the dragged task ID in the dataTransfer object
  function dragTask(event, taskId) {
    event.dataTransfer.setData('text/plain', taskId);
  }
  
  // Update the task's status when dropped in a new column
  function dropTask(event, newStatus) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const tasks = getTasks();
  
    // Find the dragged task and update its status
    const updatedTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
  
    // Save and re-render
    saveTasks(updatedTasks);
    renderTasks();
  }
  
  /*************************************
   *       CRUD Operations
   *************************************/
  // Delete a task from localStorage (by id)
  function deleteTask(taskId) {
    const tasks = getTasks();
    const filtered = tasks.filter((task) => task.id !== taskId);
    saveTasks(filtered);
    renderTasks();
  }
  
  /*************************************
   *       Modal & New Task Logic
   *************************************/
  const modal = document.getElementById('modal');
  const newTaskBtn = document.getElementById('newTaskBtn');
  const closeModalBtn = document.getElementById('closeModal');
  const saveTaskBtn = document.getElementById('saveTaskBtn');
  
  // Open the modal
  newTaskBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });
  
  // Close the modal
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Save new task button
  saveTaskBtn.addEventListener('click', () => {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const deadline = document.getElementById('taskDeadline').value;
  
    if (!title || !deadline) {
      alert('Please enter at least a Title and a valid Deadline.');
      return;
    }
  
    // Create a new task object
    const tasks = getTasks();
    // Generate a simple ID for the task by using current timestamp
    const newId = Date.now();
  
    const newTask = {
      id: newId,
      title,
      description,
      deadline,
      status: 'Not Yet Started' // default status
    };
  
    // Save to localStorage
    tasks.push(newTask);
    saveTasks(tasks);
  
    // Clear the form
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDeadline').value = '';
  
    // Hide the modal and re-render tasks
    modal.style.display = 'none';
    renderTasks();
  });
  
  // If user clicks anywhere outside the modal, close it
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
  
  // Initially render tasks when page loads
  renderTasks();
  