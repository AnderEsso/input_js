var tasksArray = JSON.parse(localStorage.getItem('tasks'));
// localStorage.removeItem('tasks'); //видалення даних з local

console.log(tasksArray);
if (tasksArray) {
  tasksArray.forEach((item, index) => {
    renderTask(item.text, item.isDone, index);
  });
} else {
  tasksArray = [];
}

///////////ДОДАВАННЯ ЗАВДАНЬ В РОЗМІТКУ///////////////
function createTask() {
  let array = localStorage.getItem('tasks');

  var inputText = mainForm.elements[0];
  var inputVal = mainForm.elements[0].value;
  var inputClass = mainForm.elements[0].classList;

  var list = document.getElementById('list');
  var itemIndex;

  //////ЗАДАННЯ DATA-INDEX ЕЛЕМЕНТУ <LI>//////////////
  if (list.lastElementChild == null) {

    itemIndex = 0;

  } else {

    let lastElement = parseInt(list.lastElementChild.dataset.index) + 1;

    itemIndex = array[lastElement].indexTask;
  }

  if (inputVal == '') {
    inputClass.add('has-error');
    mainForm.classList.add('has-error');
    inputText.setAttribute('placeholder', 'Error! Тут має бути текст');
  }
  else {
    inputText.setAttribute('placeholder', 'Введіть текст');
    inputClass.remove('has-error');
    mainForm.classList.remove('has-error');

    tasksArray.push({
      text: inputVal,
      isDone: false,
      indexTask: itemIndex
    });

    localStorage.setItem('tasks', JSON.stringify(tasksArray));

    renderTask(inputVal, false, itemIndex);


    inputVal = "";
    mainForm.elements[0].value = "";

  }
}

mainForm.addEventListener('submit', function (e) {
  e.preventDefault();
  createTask();
});

mainForm.elements[0].addEventListener('keydown', function () {
  mainForm.elements[0].setAttribute('placeholder', 'Введіть текст');
  mainForm.elements[0].classList.remove('has-error');
  mainForm.classList.remove('has-error');
});


function renderTask(text, status, index) {
  let tasksList = document.getElementById("list");
  let taskSelector = document.createElement("li");
  let textNode = document.createTextNode(text);
  let checkbox = document.createElement('input');
  let deleteIcon = document.createElement('i');
  let icon = document.getElementsByTagName('i');

  taskSelector.dataset.index = index;


  checkbox.type = 'checkbox';
  checkbox.checked = status;

  deleteIcon.classList.add("fa", "fa-trash-o");

  tasksList.appendChild(taskSelector);
  taskSelector.appendChild(textNode);
  taskSelector.appendChild(checkbox);
  taskSelector.appendChild(deleteIcon);



  checkbox.addEventListener('change', function (event) {
    changeStatus(this.parentNode.dataset.index, this.checked);
  });


  //Видалення taskSelector при кліку на іконку
  deleteIcon.addEventListener('click', function () {
    deleteItem(index);
    this.parentNode.parentNode.removeChild(this.parentNode);
  });

}
let addButton = document.getElementById('addButton');

addButton.addEventListener('click', function () {
  createTask()
});

///////////ЗМІНА СТАТУСУ CHECKBOX І ЗАПИС ЗМІНИ В ОБЕКТ В МАСИВІ ЯКИЙ ЗБЕРІГАЄТСЯ В LOCAL STORAGE////
function changeStatus(index, status) {

  var array = JSON.parse(localStorage.getItem('tasks'));

  let newArray = array.map(function (item, indexArr) {


    if (indexArr == index) {
      return {
        text: item.text,
        isDone: status

      }
    } else {
      return item;
    }

  });
  console.log('newArray: ' + newArray);
  localStorage.setItem('tasks', JSON.stringify(newArray));
}


///////////ВИДАЛЕННЯ ЕЛЕМЕНТА <LI> І ЗАПИС В LOCAL STORAGE/////////////
function deleteItem(index) {
  var array = JSON.parse(localStorage.getItem('tasks'));

  var elementArray = array.findIndex(function (el) {
    return el.indexTask === index;
  });


  array.splice(elementArray, 1);

  localStorage.setItem('tasks', JSON.stringify(array));

}
