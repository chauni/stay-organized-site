const userSelector = document.getElementById('userSelector')
const categorySelector = document.getElementById('categorySelector')
const prioritySelector = document.getElementById('prioritySelector')
const descriptionInput = document.getElementById('descriptionInput')
const deadlineInput = document.getElementById('deadlineInput')

const addTodoBtn = document.getElementById('addTodoBtn');
const confirmTodoBtn = document.getElementById('confirmTodoBtn');

fetch('http://localhost:8083/api/users')
.then(response => response.json())
.then(users => {
    users.forEach((user) => {
        const userDropdown = new Option(user.name, user.id)
        userSelector.appendChild(userDropdown)
    })
})

fetch('http://localhost:8083/api/categories')
.then(response => response.json())
.then(categories => {
    categories.forEach((category) => {
        const categoryDropdown = new Option(category.name, category.name)
        categorySelector.appendChild(categoryDropdown)
    })
})

addTodoBtn.addEventListener('click', () => {
    const selectedUser = userSelector.value;
    const selectedCategory = categorySelector.value;
    const selectedPriority = prioritySelector.value;
    const taskDescription = descriptionInput.value;
    const taskDeadline = deadlineInput.value;

    fetch('http://localhost:8083/api/todos', {
        method: 'POST',
        body: JSON.stringify({
            userid: selectedUser,
            category: selectedCategory,
            description: taskDescription,
            deadline: taskDeadline,
            priority: selectedPriority
        }),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    })
})

confirmTodoBtn.addEventListener('click', () => {
    window.location.href = './todos.html'
})