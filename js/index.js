// Initialize a new instance of TaskManager with current ID set to 0. We are creating a new object taskManager within class TaskManager
const taskManager = new TaskManager(0);

// Load task from local storage
taskManager.load();

// Display tasks in task list
taskManager.display();

// Select 'Clear task list' button
const clearStorageModalBtn = document.getElementById('clearStorageModalBtn');

// Select 'Add new task' button
const newTaskBtn = document.getElementById('newTaskBtn');

// Select task list
const taskList = document.querySelector('#taskList');

// Select 'Delete' button in delete modal window
const deleteModalBtn = document.getElementById('deleteModalBtn');

// Select task modal window
const taskModal = document.getElementById('taskModal');

// Select task modal window title
const taskModalTitle = document.getElementById('taskModalTitle');

// Select the task form
const taskForm = document.querySelector('#taskForm');

// Create variable to store task form state - 'add' or 'edit'
let taskFormState;

// 
let editedTask;

// Select the inputs
const taskName = document.querySelector('#taskName');
const taskDescription = document.querySelector('#taskDescription');
const taskAssignedTo = document.querySelector('#taskAssignedTo');
const taskDueDate = document.querySelector('#taskDueDate');
const taskStatus = document.querySelector('#taskStatus');
const taskHighPriority = document.querySelector('#taskHighPriority');
const taskMediumPriority = document.querySelector('#taskMediumPriority');
const taskLowPriority = document.querySelector('#taskLowPriority');

// Select validation alerts
const alertTaskName = document.querySelector('#alertTaskName');
const alertTaskDescription = document.querySelector('#alertTaskDescription');
const alertTaskDueDate = document.querySelector('#alertTaskDueDate');
const alertTaskAssignedTo = document.querySelector('#alertTaskAssignedTo');

// Add an 'onsubmit' event listener for the task form
taskForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();

    // Clear validation alerts (and red borders) from previous submit
    clearValidation();

    // Get the values of the inputs
    const name = taskName.value;
    const description = taskDescription.value;
    const assignedTo = taskAssignedTo.value;
    const dueDate = taskDueDate.value;
    const status = taskStatus.value;

    // Get the checked state of priority checkboxes
    const highPriority = taskHighPriority.checked;
    const mediumPriority = taskMediumPriority.checked;
    const lowPriority = taskLowPriority.checked;
    // Get the checked priority
    let priority;
    if (highPriority) {
        priority = 'High';
    } else if (mediumPriority) {
        priority = 'Medium';
    } else if (lowPriority) {
        priority = 'Low';
    };

    // Name validation
    if (!validFormFieldInput(name)) {
        alertTaskName.style.display = 'block';
        taskName.style.borderColor = 'red';
    };

    // Description validation
    if (!validFormFieldInput(description)) {
        alertTaskDescription.style.display = 'block';
        taskDescription.style.borderColor = 'red';
    };

    // Date validation
    if (!validFormFieldInput(dueDate)) {
        alertTaskDueDate.style.display = 'block';
        taskDueDate.style.borderColor = 'red';
    };

    // Assigned to validation
    if (!validFormFieldInput(assignedTo)) {
        alertTaskAssignedTo.style.display = 'block';
        taskAssignedTo.style.borderColor = 'red';
    };
    
    // If all fields are filled, add or edit task in array of tasks, save array to local storage, display from array in task list
    if (validFormFieldInput(name) & validFormFieldInput(description) & validFormFieldInput(dueDate) & validFormFieldInput(assignedTo)) {
        // Add new task to array of tasks if task form state is 'add'
        if (taskFormState === 'add') {
            taskManager.addTask(name, description, assignedTo, dueDate, status, priority);
        };
        // Edit task in array of tasks if task form state is 'edit'
        if (taskFormState === 'edit') {
            taskManager.editTask(editedTask, name, description, assignedTo, dueDate, status, priority);
        };

        // Save tasks from array of tasks to local storage
        taskManager.save();
        // Display tasks from array of tasks in task list
        taskManager.display();
        // Clear validation alerts (and red borders) after submitting
        clearValidation();
        // Clear the form after submitting
        event.target.reset();
    };
});

function validFormFieldInput(data) {
    return data !== null && data !== '';
};

function clearValidation () {
    alertTaskName.style.display = 'none';
    taskName.style.borderColor = '';
    alertTaskDescription.style.display = 'none';
    taskDescription.style.borderColor = '';
    alertTaskDueDate.style.display = 'none';
    taskDueDate.style.borderColor = '';
    alertTaskAssignedTo.style.display = 'none';
    taskAssignedTo.style.borderColor = '';
};

// Add 'onclick' event listener for 'Cancel' and 'Close' buttons in task modal window to clear the task form and validation alerts (and red borders)
taskModal.addEventListener('click', (event) => {
    if(event.target.id === 'cancelBtn' || event.target.id === 'close') {
        clearValidation();
        taskForm.reset();
    };
});

// Add 'onclick' event listener for 'Delete', 'Edit' and change status buttons
taskList.addEventListener('click', (event) => {
    // If 'Delete' button was clicked, delete task
    if (event.target.id === 'deleteTaskBtn') {
        // Get the parent task
        const parentTask = event.target.parentElement.parentElement.parentElement;
        // Add 'onclick' event listener for 'Delete' button in delete modal window
        deleteModalBtn.addEventListener('click', () => {
            // Get the task id of the parent task
            const parentTaskId = Number(parentTask.id);
            // Delete the task from array of tasks
            taskManager.deleteTask(parentTaskId);
            // Save tasks from array of tasks to local storage 
            taskManager.save();
            // Display tasks from array of tasks in task list
            taskManager.display();
        });
    };

    // If 'Edit' button was clicked, edit task in task modal window
    if (event.target.id === 'editTaskBtn') {
        // Change task modal window title to 'Edit Task'
        taskModalTitle.innerHTML = 'Edit Task';
        // Change task form state to 'edit'
        taskFormState = 'edit';
        // Get the parent task
        const parentTask = event.target.parentElement.parentElement.parentElement;
        // Get the task id of the parent task
        const parentTaskId = Number(parentTask.id);
        // Find the task that matches the parent task id
        editedTask = taskManager.getTaskById(parentTaskId);
        // Fill task form fields with values of found task
        taskName.value = editedTask.name;
        taskDescription.value = editedTask.description;
        taskAssignedTo.value = editedTask.assignedTo;
        taskDueDate.value = editedTask.dueDate;
        taskStatus.value = editedTask.status;
        if (editedTask.priority === 'High') {
            taskHighPriority.checked = true;
        } else if (editedTask.priority  === 'Medium') {
            taskMediumPriority.checked = true;
        } else if (editedTask.priority  === 'Low') {
            taskLowPriority.checked = true;
        };
    };

    // If one of change status buttons was clicked, change status to corresponding one
    if (event.target.id === 'radioToDo' || event.target.id === 'radioInProgress' || event.target.id === 'radioReview' || event.target.id === 'radioDone') {
        // Get the parent task
        const parentTask = event.target.parentElement.parentElement.parentElement.parentElement;
        // Get the task id of the parent task
        const parentTaskId = Number(parentTask.id);
        // Find the task that matches the parent task id
        const task = taskManager.getTaskById(parentTaskId);
        // Change the task status in the array of tasks
        if (event.target.id === 'radioToDo') {
            task.status = 'TODO';
        } else if (event.target.id === 'radioInProgress') {
            task.status = 'IN PROGRESS';
        } else if (event.target.id === 'radioReview') {
            task.status = 'REVIEW';
        } else if (event.target.id === 'radioDone') {
            task.status = 'DONE';
        };
        // Save tasks from array of tasks to local storage
        taskManager.save();
        // Display tasks from array of tasks in task list
        taskManager.display();
    };
});

// Add 'onclick' event listener for 'Clear task list' button
clearStorageModalBtn.addEventListener('click', () => {
    localStorage.clear();
    taskManager.load();
    taskManager.display();
});

// Add 'onclick' event listener for 'Add new task' button to change task modal window title to 'New Task' and task form state to 'add'
newTaskBtn.addEventListener('click', () => {
    taskModalTitle.innerHTML = 'New Task';
    taskFormState = 'add';
});

// Setting date's min value:
// let today = new Date();
// const dd = today.getDate();
// const mm = today.getMonth()+1; //January is 0!
// const yyyy = today.getFullYear();
// today = yyyy+'-'+mm+'-'+dd;
// taskDueDate.min = today;
// console.log(taskDueDate);

// Display greeting in header
const today = new Date();
const date = today.getDate();
const month = today.getMonth();
function displayMonth(month) {
    switch(month) {
    case 0: return 'January'; break;
    case 1: return 'February'; break;
    case 2: return 'March'; break;
    case 3: return 'April'; break;
    case 4: return 'May'; break;
    case 5: return 'June'; break;
    case 6: return 'July'; break;
    case 7: return 'August'; break;
    case 8: return 'September'; break;
    case 9: return 'October'; break;
    case 10: return 'November'; break;
    case 11: return 'Decemeber'; break;
    default: return 'Invalid'; break;
    }
};
const monthName = displayMonth(month);
const year = today.getFullYear();
let timeNow = today.getHours();
let minute = today.getMinutes();
let greeting;
let ampm;
function time(time) {
    if (time <= 11) {
        greeting = "Good Morning!";
        ampm = "am";
    } else if (time > 11 && time < 18) {
        greeting = "Good Afternoon!";
        ampm = "pm";
        if (time >= 13) {
        timeNow = time - 12;
        };
    } else {
        greeting = "Good Night!";
        ampm = "pm";
        timeNow = time - 12;
    };
    if (minute < 10) {
        minute = '0' + minute;
    };
};
function displayGreeting() {
    time(timeNow);
    let greet = greeting + " Today is " + monthName + " " + date + " " + year + " and the time is " + timeNow + ":" + minute + " " + ampm;
    document.getElementById("greetMe").innerHTML = greet;
};
displayGreeting();