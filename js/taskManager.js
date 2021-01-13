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
        const taskList = document.querySelector('#taskList');
        // Create a new element <div> (column = card) in the HTML file and give it a class
        const card = document.createElement('div');
        card.className ='col-lg-4 col-md-6 my-4';
        // Get the bootstrap class name for styling priority
        let badge;
        if (newTask.priority === 'High') {
            badge = 'badge-danger';
        } else if (newTask.priority === 'Medium') {
            badge = 'badge-primary';
        } else {
            badge = 'badge-secondary';
        };
        // Create HTML card to display the new task added
        card.innerHTML = `
                    <div class="list-group-item card" id=${newTask.id}>
                    <div class="card-body">
                        <h5 class="card-title">${newTask.name}</h5> 
                        <h6 class="card-subtitle mb-2 text-muted">Due Date: ${formattedDate}</h6>
                        <p class="card-text mb-3">${newTask.description}</p>
                        <p class="card-text mb-3"><strong>Assigned To: ${newTask.assignedTo}</strong></p>
                        <div class="alert alert-info">Status: ${newTask.status}</div>
                        <div class="badge ${badge} mb-4" style="width:100%;">Priority: ${newTask.priority}</div>
                        <a href="#"><i class="fas fa-edit fa-lg px-2" style="color:rgb(99, 99, 201);"></i></a>
                        <a href="#" class="delete-button"><i class="fas fa-trash-alt fa-lg" style="color: maroon;"></i></a>
                        <button class="btn btn-outline-success done-button ml-5">Mark As Done</button>
                    </div>
            </div>
        `;
        //Append new HTML card to the row that contains all cards   
        taskList.appendChild(card);
    }    

        //saving to local storage
        save() {
            // Create a JSON string of the tasks
            const tasksJson = JSON.stringify(this.tasks);
    
            // Store the JSON string in localStorage
            localStorage.setItem('tasks', tasksJson);
    
            // Convert the currentId to a string;
            const currentId = String(this.currentId);
    
            // Store the currentId in localStorage
            localStorage.setItem('currentId', currentId);
        }

        //load from local storage
        load() {
            // Check if any tasks are saved in localStorage
            if (localStorage.getItem('tasks')) {
                // Get the JSON string of tasks in localStorage
                const tasksJson = localStorage.getItem('tasks');
    
                // Convert it to an array and store it in our TaskManager
                this.tasks = JSON.parse(tasksJson);

                this.tasks.map(eachTask =>{
                    const {name,description,assignedTo,dueDate,status,priority} =eachTask;
                    this.addTask(name,description,assignedTo,dueDate,status,priority);       
                })
            }
    
            // Check if the currentId is saved in localStorage
            if (localStorage.getItem('currentId')) {
                // Get the currentId string in localStorage
                const currentId = localStorage.getItem('currentId');
    
                // Convert the currentId to a number and store it in our TaskManager
                this.currentId = Number(currentId);
            }
        }

        // Create the deleteTask method
        deleteTask(taskId) {
        // Create an empty array and store it in a new variable, newTasks
        const newTasks = [];

        // Loop over the tasks
        for (let i = 0; i < this.tasks.length; i++) {
            // Get the current task in the loop
            const task = this.tasks[i];

            // Check if the task id is not the task id passed in as a parameter
            if (task.id !== taskId) {
                // Push the task to the newTasks array
                newTasks.push(task);
            }
        }

            // Set this.tasks to newTasks
            this.tasks = newTasks;
        }
    
}