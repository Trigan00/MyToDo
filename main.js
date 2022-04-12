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
  
    let newToDo = { // объект который хранит задачу (это каждая новая задача)
        ToDo: addMessage.value, // Описание задчи
        checked: false, // Состояние задчи
    }

    todolist.push(newToDo) //Закидывает новую задачу в список задч
    displayMessages() //вызов функции, которая выводит задчи на экран 
    localStorage.setItem('todo', JSON.stringify(todolist)) //Сохраняется список задч

})

function displayMessages(){ //функция, которая выводит задчи на экран 
    let displayMessage = '' //переменная которая показывает задчи
    todolist.forEach((item, index) => { //перебор всех задач из массива задач
        displayMessage += ` 
        <li>
            <input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
            <label for='item_${index}'>${item.ToDo}</label>
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