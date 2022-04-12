//Даров Владик

let addMessage = document.querySelector('.message') //находит поле ввода задачи
let addButton = document.querySelector('.add') //находит кнопку добавления задачи
let todo = document.querySelector('.todo') //находит список задач

let todolist = [] //объявляем массив котоорый хранит объекты (список задач)


//условие сразу же сработает когда страница будет обнавлена
if(localStorage.getItem('todo')){ //если в памяти что то лежит
    todolist = JSON.parse(localStorage.getItem('todo')) //в массив выгружаются из памяти задачи
    displayMessages() //вызов функции, которая выводит задчи на экран 
}

addButton.addEventListener('click', function(){ //эта функция сработает когда будет нажата кнопка добавления задачи
    if(!addMessage.value) return // если ничего не написано то функция не выполняется
    let newToDo = { // объект который хранит задачу (это каждая новая задача)
        ToDo: addMessage.value, // Описание задчи
        checked: false, // Состояние задчи
    }

    todolist.push(newToDo) //Закидывает новую задачу в список задч
    displayMessages() //вызов функции, которая выводит задчи на экран 
    localStorage.setItem('todo', JSON.stringify(todolist)) //Сохраняется список задч
    addMessage.value = ''

})

function displayMessages(){ //функция, которая выводит задчи на экран 
    if(todolist.length === 0) todo.innerHTML = '' //если в массиве ничего нет то ничегг не показзывать
    let displayMessage = '' //переменная которая показывает задчи
    todolist.forEach((item, index) => { //перебор всех задач из массива задач
        displayMessage += ` 
        <li>
            <input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
            <label for='item_${index}'>${item.ToDo}</label>
            <input class = "delate" onclick="delateTask(${index})" type="button" value="">
            <hr>
        </li>
        ` // Прибавляет новые задчи
        todo.innerHTML = displayMessage; //выводит задачи на экран
    })
}

todo.addEventListener('change', (event) =>{ //сработает, когда смениться состаяние любой задачи из списка задач
    let idInput = event.target.getAttribute('id') //находиться ID у задчи, которая сменила состояние
    let valueLabel = todo.querySelector('[for=' + idInput + ']').innerHTML //с помощью ID находиться сама задча

    todolist.forEach((item) => { //перебор всех задач
        if(item.ToDo === valueLabel){ // если задача совпала с той что сменила состояние то
            item.checked = !item.checked; //состояние у этой задачи менятся на противоположное
            localStorage.setItem('todo', JSON.stringify(todolist)); //сохраняется список задач (то-есть их состояние тоже)
        }
    })
})

todo.addEventListener('contextmenu', (event)=>{
    event.preventDefault()
    todolist.forEach((item, i) => {
        if(item.ToDo === event.target.innerHTML){
            todolist.splice(i, 1)   
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todolist))
        }     
    })
})


const delateTask = (index)=>{
    todolist.splice(index, 1)
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todolist))
}