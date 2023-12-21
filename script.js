const taskList = document.getElementById('taskList');
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        function saveTasksToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function createTask() {
            const id = document.getElementById('product_id').value;
            const name = document.getElementById('product_name').value;
            const price = document.getElementById('product_price').value;
            const image = document.getElementById('product_image').value;
            const description = document.getElementById('product_description').value;

            const newTask = {
                id: Date.now(),
                name: name,
                price: price,
                image: image,
                description: description
            };

            tasks.push(newTask);
            location.replace("http://127.0.0.1:5501/First/viewProducts.html")
            saveTasksToLocalStorage();
            updateTaskList();

            // Clear the form fields
            document.getElementById('product_id').value = '';   
            document.getElementById('product_name').value = '';
            document.getElementById('product_price').value = '';
            document.getElementById('product_image').value = '';
            document.getElementById('product_description').value = '';
        }

        function updateTaskList() {
            // Clear existing table rows
            taskList.innerHTML = '';
            
            // Iterate through tasks and add table rows
            tasks.forEach(task => {
                const tableRow = document.createElement('tr');
                
                const idCell = document.createElement('td');
                idCell.innerText = task.id;
                
                const nameCell = document.createElement('td');
                nameCell.innerText = task.name;

                const priceCell = document.createElement('td');
                priceCell.innerText = task.price;
                
                const imageCell = document.createElement('td');
                imageCell.innerText = task.image;
                
                const descriptionCell = document.createElement('td');
                descriptionCell.innerText = task.description;
                
                const actionsCell = document.createElement('td');
                actionsCell.classList.add('taskActions');
                actionsCell.innerHTML = `
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
                `;
                
                tableRow.appendChild(idCell);
                tableRow.appendChild(nameCell);
                tableRow.appendChild(priceCell);
                tableRow.appendChild(imageCell);
                tableRow.appendChild(descriptionCell);
                tableRow.appendChild(actionsCell);

                taskList.appendChild(tableRow);
            });
        }

        function editTask(taskId) { 
            const taskToEdit = tasks.find(task => task.id === taskId);

            if (taskToEdit) {
                document.getElementById('product_id').value = taskToEdit.id;
                document.getElementById('product_name').value = taskToEdit.name;
                document.getElementById('product_price').value = taskToEdit.price;
                document.getElementById('product_image').value = taskToEdit.image;
                document.getElementById('product_description').value = taskToEdit.description;

                // Remove the task from the list
                tasks = tasks.filter(task => task.id !== taskId);
                saveTasksToLocalStorage();
                updateTaskList();
            }
        }

        function deleteTask(taskId) {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasksToLocalStorage();
            updateTaskList();
        }
        
        // Initial update of the task list
        updateTaskList();