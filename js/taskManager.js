class TaskManager {
    constructor(currentId = 0) {
        // An empty array to save all tasks added (each task - an object - an element of the array) 
        this.tasks = [];
        this.currentId = currentId;
    }
    /* Method to add a new task */
    // Method accepts all info from the form (to create a task - object) as parameters
    addTask(name, description, assignedTo, dueDate, priority) {
        const newTask = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: 'TODO',
            priority: priority,
        };
        // Push a new task into the array
        this.tasks.push(newTask);
        console.log(this.tasks);
    
        /* Display cards */
        // Get date to standard format
        const dueByDate = new Date(newTask.dueDate);
        // Format date to be dd/mm/yyyy
        const formattedDate = dueByDate.getDate() + '/' + (dueByDate.getMonth() + 1) + '/' + dueByDate.getFullYear();
        // Select the row that contains all cards from the HTML file and assign it to a variable
        const row = document.querySelector('#row');
        // Create a new element <div> (column = card) in the HTML file and give it a class
        const card = document.createElement('div');
        card.className ='col-lg-4 col-md-6 my-4';
        //create HTML card to display the new task added
        card.innerHTML = `
            <div class="list-group-item card">
                <div class="card-body">
                    <h5 class="card-title">${newTask.name}</h5> 
                    <h6 class="card-subtitle mb-2 text-muted">Due Date: ${formattedDate}</h6>
                    <p class="card-text mb-3">${newTask.description}</p>
                    <p class="card-text mb-3"><strong>Assigned To: ${newTask.assignedTo}</strong></p>
                    <div class="alert alert-info">Status: ${newTask.status}</div>
                    <div class="badge badge-danger mb-4" style="width:100%;">Priority: ${newTask.priority}</div>
                    <a href="#"><i class="fas fa-edit fa-lg px-2" style="color:rgb(99, 99, 201);"></i></a>
                    <a href=""><i class="fas fa-trash-alt fa-lg" style="color: maroon;"></i></a>
                </div>
            </div>
        `;
        //Append new HTML card to the row that contains all cards   
        row.appendChild(card);
    }
}