const userSelector = document.getElementById('userSelector')
const todoTable = document.getElementById('todoTable')
const tbody = document.querySelector('#todoTable tbody')

const newTodoBtn = document.getElementById('newTodoBtn')

fetch('http://localhost:8083/api/users')
.then(response => response.json())
.then(users => {
    users.forEach((user) => {
        const userDropdown = new Option(user.name, user.id)
        userSelector.appendChild(userDropdown)
    })
})

userSelector.addEventListener('change', () => {
    const selectedUser = userSelector.value;

    tbody.innerHTML = '';
    
    fetch(`http://localhost:8083/api/todos/byuser/${selectedUser}`)
    .then(response => response.json())
    .then(todos => {
        todos.forEach((todo) => {
            console.log(todo)
            buildTodoTable(tbody, todo)
        })
    })
})

function buildTodoTable(table, todo) {
    const row = table.insertRow()

    const statusCheckbox = document.createElement('input')
    statusCheckbox.setAttribute('type', 'checkbox')
    statusCheckbox.classList.add('form-check-input','status-check')

    if(todo.completed != "false") {
        statusCheckbox.checked
    }

    const statusCell = row.insertCell()
    statusCell.append(statusCheckbox)

    const categoryCell = row.insertCell()
    categoryCell.innerHTML = todo.category;

    const descriptionCell = row.insertCell()
    descriptionCell.innerHTML = todo.description;

    const deadlineCell = row.insertCell()
    deadlineCell.innerHTML = todo.deadline;

    const priorityCell = row.insertCell()
    priorityCell.innerHTML = todo.priority;

}

newTodoBtn.addEventListener('click', () => {
    window.location.href = './new-todos.html'
})