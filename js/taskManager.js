class TaskManager {
    constructor(currentId = 0) {
        // An empty array to save all tasks added (each task - an object - an element of the array) 
        this.tasks = [];
        this.currentId = currentId;
    }

    // Add task method accepts all info from the form as arguments, creates a task (object) and adds it to an array of tasks
    addTask(name, description, assignedTo, dueDate, status, priority) {
        const newTask = {
            id: ++this.currentId,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
            priority: priority,
        };
        // Push a new task into the array
        this.tasks.push(newTask);
        console.log(this.tasks);
    }
    
    // Display method displays tasks from array of tasks. Tasks are displayed in columns according to their status
    display() {
        console.log(this.tasks);
        // Select columns that contains cards with corresponding status from the HTML and assign them to a variables
        const todoTasks = document.querySelector('#todoTasks');
        const inprogressTasks = document.querySelector('#inprogressTasks');
        const reviewTasks = document.querySelector('#reviewTasks');
        const doneTasks = document.querySelector('#doneTasks');

        // Clear columns and give them a header
        todoTasks.innerHTML = '<h5>TODO</h5>';
        inprogressTasks.innerHTML = '<h5>IN PROGRESS</h5>';
        reviewTasks.innerHTML = '<h5>REVIEW</h5>';
        doneTasks.innerHTML = '<h5>DONE</h5>';

        // Create each card in an array of tasks 
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            // Get date to standard format
            const dueByDate = new Date(task.dueDate);
            // Format date to be dd/mm/yyyy
            const formattedDate = dueByDate.getDate() + '/' + (dueByDate.getMonth() + 1) + '/' + dueByDate.getFullYear();
            // Create a new element <div> and give it a bootstrap class row
            const card = document.createElement('div');
            card.className = 'row mb-3';
            // Get the bootstrap class name for styling Priority
            let badge;
            if (task.priority === 'High') {
                badge = 'badge-danger';
            } else if (task.priority === 'Medium') {
                badge = 'badge-primary';
            } else {
                badge = 'badge-secondary';
            };
            // HTML for card
            card.innerHTML = `
                    <div class="list-group-item card" id=${task.id}>
                    <div class="card-body">
                        <h5 class="card-title">${task.name}</h5> 
                        <h6 class="card-subtitle mb-2 text-muted">Due Date: ${formattedDate}</h6>
                        <p class="card-text mb-3">${task.description}</p>
                        <p class="card-text mb-3"><strong>Assigned To: ${task.assignedTo}</strong></p>
                        <div class="alert ${task.status === 'DONE' ? 'alert-success' : (task.status === 'IN PROGRESS' ? 'alert-info' : (task.status === 'REVIEW' ? 'alert-warning' : 'alert-primary'))}">Status: ${task.status}</div>
                        <div class="badge ${badge} mb-4" style="width:100%;">Priority: ${task.priority}</div>
                        <a href="#"><i class="fas fa-edit fa-lg px-2" style="color:rgb(99, 99, 201);"></i></a>
                        <a href="#"><i class="fas fa-trash-alt fa-lg delete-button" style="color: maroon;"></i></a>
                        <button class="btn btn-outline-success done-button ml-5 ${task.status === 'DONE' ? 'invisible' : 'visible'}">Mark As Done</button>
                    </div>
                    </div>
            `;
            // Append HTML card to the corresponding row depending on task status
            if (task.status === 'DONE') {  
                doneTasks.appendChild(card);
            } else if (task.status === 'IN PROGRESS') {
                inprogressTasks.appendChild(card);
            } else if (task.status === 'REVIEW') {
                reviewTasks.appendChild(card);
            } else {  
                todoTasks.appendChild(card);
            };
        };
    }

    // Save tasks to local storage
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

    // Load tasks from local storage
    load() {
        // Check if any tasks are saved in localStorage
        if (localStorage.getItem('tasks')) {
            // Get the JSON string of tasks in localStorage
            const tasksJson = localStorage.getItem('tasks');

            // Convert it to an array and store it in our TaskManager
            this.tasks = JSON.parse(tasksJson);
            console.log(this.tasks);
        } else {
            // If local storage was cleared, to display no tasks we need empty array of tasks
            this.tasks = [];
        };
    
        // Check if the currentId is saved in localStorage
        if (localStorage.getItem('currentId')) {
            // Get the currentId string in localStorage
            const currentId = localStorage.getItem('currentId');

            // Convert the currentId to a number and store it in our TaskManager
            this.currentId = Number(currentId);
        };
    } 

    // Delete task method accepts task id as argument and deletes task with that id from array of tasks
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(item => item.id != taskId)
    }

    // Get task by id method accepts task id as argument and returns task with that id 
    getTaskById(taskId){
        return this.tasks.find(task => task.id === taskId);   
    }
};

module.exports = TaskManager;