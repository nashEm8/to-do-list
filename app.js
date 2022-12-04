const formAddToDo = document.querySelector('.form-add-todo');
const inputSearch = document.querySelector('.form-search input');
const ul = document.querySelector('.todos-container');

const addTodo = inputValue => {
    if(inputValue.length){
        ul.innerHTML += `
        <li class = "list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
            <span>${inputValue}</span>
            <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
        </li>`;
    
        event.target.reset();
        }
}

formAddToDo.addEventListener('submit', event => {
    event.preventDefault();

    const inputValue = event.target.add.value.trim();
    addTodo(inputValue);
})

const removeTodo = elementClicked => {
    const trashDataValue = elementClicked.dataset.trash;
    const todo = document.querySelector(`[data-todo="${trashDataValue}"]`);

    if(trashDataValue){
        todo.remove();
    }
}

ul.addEventListener('click', event => {
    const elementClicked = event.target;
    removeTodo(elementClicked);
});

const filteredTodos = (todos, inputValue, returnMatchedTodos) =>
    todos.filter(todo => {
        const machedTodos = todo.textContent.toLowerCase().includes(inputValue);
        return returnMatchedTodos ? machedTodos : !machedTodos;
})

const manupulationClass = (todos, addClass, removeClass) => {
    todos.forEach(todo => {
        todo.classList.remove(removeClass)
        todo.classList.add(addClass)
    })
}

const hideTodo = (todos, inputValue) => {
    const todoToHide = filteredTodos(todos, inputValue, false);
    manupulationClass(todoToHide, 'hidden', 'd-flex');
}

const showTodo = (todos, inputValue) => {
    const todoToShow = filteredTodos(todos, inputValue, true);
    manupulationClass(todoToShow, 'd-flex', 'hidden');
}

inputSearch.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase();
    const todos = Array.from(ul.children);

    hideTodo(todos, inputValue);
    showTodo(todos, inputValue);
});