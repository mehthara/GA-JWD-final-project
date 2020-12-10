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
}   else if (dueDate == 0) {
    errorMessage.innerHTML = 'Please select Due Date';
    errorMessage.style.display = 'block';
    console.log('validating due date if block');

    //assigned to validation
    } else if (assignedTo == 0) {
        errorMessage.innerHTML = 'Please select Assigned to';
        errorMessage.style.display = 'block';
        console.log('validating assigned to if block');
    
    //dropdown status validation
    } else if (status == 0){ 
        errorMessage.innerHTML = 'Please select Status';
        errorMessage.style.display = 'block';
        console.log('validating status if block');
    
    } else {
        errorMessage.style.display = 'none';
        console.log('status else block');
    };

});

function validFormFieldInput(data){
    return data !== null && data !== '';
}


//setting date's min value:
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
today = yyyy+'-'+mm+'-'+dd;
document.getElementById("taskDueDate").setAttribute("min", today);