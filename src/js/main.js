var tasksArray = JSON.parse(localStorage.getItem('tasks'));
var addButton = document.getElementById('addButton');

addButton.addEventListener('click', function () {
  createTask()
});

if (tasksArray) {
  tasksArray.forEach((item, index) => {
    renderTask(item.text, item.isDone, item.indexTask);
  });
} else {
  tasksArray = [];
}

function createTask() {
  var array = JSON.parse(localStorage.getItem('tasks'));

  var inputText = mainForm.elements[0];
  var inputVal = mainForm.elements[0].value;
  var inputClass = mainForm.elements[0].classList;

  var list = document.getElementById('list');
  var itemIndex;

  if (list.lastElementChild == null) {
    itemIndex = 0;
  } else {
    itemIndex = array.length;
  }

  if (inputVal == '') {
    inputClass.add('has-error');
    mainForm.classList.add('has-error');
    inputText.setAttribute('placeholder', 'Error! Please specify the task');
  } else {
    inputText.setAttribute('placeholder', 'Enter the task');
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
  var tasksList = document.getElementById("list");
  var taskSelector = document.createElement("li");
  var textNode = document.createTextNode(text);
  var checkbox = document.createElement('input');
  var deleteIcon = document.createElement('i');
  var icon = document.getElementsByTagName('i');

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


  deleteIcon.addEventListener('click', function () {
    deleteItem(index);
    this.parentNode.parentNode.removeChild(this.parentNode);
  });

}


function changeStatus(index, status) {

  var array = JSON.parse(localStorage.getItem('tasks'));

  var indexElement = array.findIndex(function (el) {
    return el.indexTask == index;
  });


  var newArray = array.map(function (item, indexArr) {

    if (indexArr == indexElement) {
      return {
        text: item.text,
        isDone: status,
        indexTask: indexElement
      }
    } else {
      return item;
    }
  });

  localStorage.setItem('tasks', JSON.stringify(newArray));
}


function deleteItem(index) {
  var array = JSON.parse(localStorage.getItem('tasks'));
  var elementArray = array.findIndex(function (el) {
    return el.indexTask === index;
  });

  array.splice(elementArray, 1);
  localStorage.setItem('tasks', JSON.stringify(array));
}
