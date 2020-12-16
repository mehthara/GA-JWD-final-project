class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }
    //Method to add a task
    addTask(name, description, assignedTo, dueDate) {
        const newTask = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: 'TODO'
        };
        this.tasks.push(newTask);
        console.log(this.tasks);
    
        // display card
        // get date to standard format
        const dueByDate = new Date(newTask.dueDate);
        // Format date to be dd/mm/yyyy
        const formattedDate = dueByDate.getDate() + '/' + (dueByDate.getMonth() + 1) + '/' + dueByDate.getFullYear();
        // Select the empty div from the HTML and assign it to a variable
        const card = document.querySelector('#task-card')
        //create element div
        const div =document.createElement('div');
        div.className = 'card';
        //create HTML card to display tasks
        div.innerHTML = `<div class="card-body">
                            <h5 class="card-title">${newTask.name}</h5> 
                            <h6 class="card-subtitle mb-2 text-muted">${formattedDate}</h6>
                            <p class="card-text mb-3">${newTask.description}</p>
                            <p class="card-text mb-3"><strong>${newTask.assignedTo}</strong></p>
                            <div class="alert alert-info">${newTask.status}</div>
                            <div class="badge badge-danger mb-4" style="width:100%;">Priority : High</div>
                            <a href="#"><i class="fas fa-edit fa-lg px-2" style="color:rgb(99, 99, 201);"></i></a>
                            <a href=""><i class="fas fa-trash-alt fa-lg" style="color: maroon;"></i></a>
                        </div> `;

        //Append new HTML card to the empty div    
        card.appendChild(div);            
    }


}