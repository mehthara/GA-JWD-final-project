// Initialize a new TaskManager with current ID set to 0
const taskManager = new TaskManager(0);
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

    console.log(name);
    console.log(description);
    console.log(dueDate);
    console.log(assignedTo);
    console.log(status);
    //console.log(priority);

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
}   else if (!validFormFieldInput(dueDate)) {
    errorMessage.innerHTML = 'Please select Due Date';
    errorMessage.style.display = 'block';
    console.log('validating due date if block');

    //assigned to validation
    } else if (!validFormFieldInput(assignedTo)) {
        errorMessage.innerHTML = 'Please select Assigned to';
        errorMessage.style.display = 'block';
        console.log('validating assigned to if block');
    
    //dropdown status validation
    } else if (!validFormFieldInput(status)) { 
        errorMessage.innerHTML = 'Please select Status';
        errorMessage.style.display = 'block';
        console.log('validating status if block');
    
    } else {
        errorMessage.style.display = 'none';
        console.log('else block');
        // Add the new task to the task manager
        taskManager.addTask(name, description, assignedTo, dueDate);
        //Clear the form after submitting
        taskName.value = '';
        taskDescription.value = '';
        taskAssignedTo.value = '';
        taskDueDate.value = '';
        taskStatus.value = '';
    };
});

function validFormFieldInput(data) {
    return data !== null && data !== '';
}


//setting date's min value:
let today = new Date();
const dd = today.getDate();
const mm = today.getMonth()+1; //January is 0!
const yyyy = today.getFullYear();
today = yyyy+'-'+mm+'-'+dd;
taskDueDate.min = today;