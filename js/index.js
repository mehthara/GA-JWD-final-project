// Initialize a new instance of TaskManager with current ID set to 0. We are creating a new object taskManager within class TaskManager

const taskManager = new TaskManager(0);


// Loading task from local storage
taskManager.load();

// Displaying tasks in task list
taskManager.display();

// Select the Task Form
const taskForm = document.querySelector('#taskForm');

// Add an 'onsubmit' event listener
taskForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();

    // Select the inputs
    const taskName = document.querySelector('#taskName');
    const taskDescription = document.querySelector('#taskDescription');
    const taskAssignedTo = document.querySelector('#taskAssignedTo');
    const taskDueDate = document.querySelector('#taskDueDate');
    const taskStatus = document.querySelector('#taskStatus');
    const errorMessage = document.querySelector('#alertMessage');

    // Get the values of the inputs
    const name = taskName.value;
    const description = taskDescription.value;
    const assignedTo = taskAssignedTo.value;
    const dueDate = taskDueDate.value;
    const status = taskStatus.value;

    // Get the checked state of priority checkboxes
    const highPriority = document.getElementById('taskHighPriority').checked;
    const mediumPriority = document.getElementById('taskMediumPriority').checked;
    const lowPriority = document.getElementById('taskLowPriority').checked;
    // Get the checked priority
    let priority;
    if (highPriority) {
        priority = 'High';
    } else if (mediumPriority) {
        priority = 'Medium';
    } else {
        priority = 'Low';
    };

    console.log(name);
    console.log(description);
    console.log(dueDate);
    console.log(assignedTo);
    console.log(status);

    //name validation
    if (!validFormFieldInput(name)) {
        errorMessage.innerHTML = 'Invalid name input';
        errorMessage.style.display = 'block';
        console.log('validating name if block');
    
    //description validation
    } else if (!validFormFieldInput(description)) {
        errorMessage.innerHTML = 'Invalid description input';
        errorMessage.style.display = 'block';
        console.log('validating description if block');

    //date validation
    } else if (!validFormFieldInput(dueDate)) {
    errorMessage.innerHTML = 'Please select Due Date';
    errorMessage.style.display = 'block';
    console.log('validating due date if block');

    //assigned to validation
    } else if (!validFormFieldInput(assignedTo)) {
        errorMessage.innerHTML = 'Please select Assigned to';
        errorMessage.style.display = 'block';
        console.log('validating assigned to if block');
    
    //status validation
    } else if (!validFormFieldInput(status)) { 
        errorMessage.innerHTML = 'Please select Status';
        errorMessage.style.display = 'block';
        console.log('validating status if block');
    
    } else {
        errorMessage.style.display = 'none';
        console.log('else block');

        // Add the new task to the task manager. We are calling the method addTask on the object taskManager
        taskManager.addTask(name, description, assignedTo, dueDate, priority);

        // Save to local storage
        taskManager.save();

        // Display in task list
        taskManager.display();

        // Clear the form after submitting
        event.target.reset();
    };
});

function validFormFieldInput(data) {
    return data !== null && data !== '';
};

const taskList = document.querySelector('#taskList');

taskList.addEventListener('click', (event) => {
  // If DONE button was clicked - changing status to DONE  
  if(event.target.classList.contains('done-button')){

    const button = event.target;
    const parentTask = button.parentElement.parentElement;

    // Garantee the return of the id as a number
    const parentTaskId = Number(parentTask.id);
    
    // Find the task id that matches the parent id
    const task = taskManager.tasks.find(task => task.id === parentTaskId);

    // Change the task status
    task.status = 'DONE';

    // Save task to local storage
    taskManager.save();

    // Display in task list
    taskManager.display();
  };

  // If delete button was clicked - delete task
  if (event.target.classList.contains('delete-button')) {
    // Get the parent Task
    const parentTask = event.target.parentElement.parentElement.parentElement;
    console.log(parentTask);
    // Get the taskId of the parent Task.
    const taskId = Number(parentTask.id);
    console.log(taskId);
    // Delete the task
    taskManager.deleteTask(taskId);

    // Save tasks to localStorage
    taskManager.save();

    // Display tasks in task list
    taskManager.display();
};
});

// Setting date's min value:
let today = new Date();
const dd = today.getDate();
const mm = today.getMonth()+1; //January is 0!
const yyyy = today.getFullYear();
today = yyyy+'-'+mm+'-'+dd;
taskDueDate.min = today;
console.log(taskDueDate);