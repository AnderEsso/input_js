var tasksArray=JSON.parse(localStorage.getItem("tasks")),addButton=document.getElementById("addButton");function createTask(){var e,t=JSON.parse(localStorage.getItem("tasks")),a=mainForm.elements[0],n=mainForm.elements[0].value,s=mainForm.elements[0].classList;e=null==document.getElementById("list").lastElementChild?0:t.length,""==n?(s.add("has-error"),mainForm.classList.add("has-error"),a.setAttribute("placeholder","Error! Please specify the task")):(a.setAttribute("placeholder","Enter the task"),s.remove("has-error"),mainForm.classList.remove("has-error"),tasksArray.push({text:n,isDone:!1,indexTask:e}),localStorage.setItem("tasks",JSON.stringify(tasksArray)),renderTask(n,!1,e),n="",mainForm.elements[0].value="")}function renderTask(e,t,a){var n=document.getElementById("list"),s=document.createElement("li"),r=document.createTextNode(e),i=document.createElement("input"),o=document.createElement("i");document.getElementsByTagName("i");s.dataset.index=a,i.type="checkbox",i.checked=t,o.classList.add("fa","fa-trash-o"),n.appendChild(s),s.appendChild(r),s.appendChild(i),s.appendChild(o),i.addEventListener("change",(function(e){changeStatus(this.parentNode.dataset.index,this.checked)})),o.addEventListener("click",(function(){deleteItem(a),this.parentNode.parentNode.removeChild(this.parentNode)}))}function changeStatus(e,t){var a=JSON.parse(localStorage.getItem("tasks")),n=a.findIndex((function(t){return t.indexTask==e})),s=a.map((function(e,a){return a==n?{text:e.text,isDone:t,indexTask:n}:e}));localStorage.setItem("tasks",JSON.stringify(s))}function deleteItem(e){var t=JSON.parse(localStorage.getItem("tasks")),a=t.findIndex((function(t){return t.indexTask===e}));t.splice(a,1),localStorage.setItem("tasks",JSON.stringify(t))}addButton.addEventListener("click",(function(){createTask()})),tasksArray?tasksArray.forEach((e,t)=>{renderTask(e.text,e.isDone,e.indexTask)}):tasksArray=[],mainForm.addEventListener("submit",(function(e){e.preventDefault(),createTask()})),mainForm.elements[0].addEventListener("keydown",(function(){mainForm.elements[0].setAttribute("placeholder","Введіть текст"),mainForm.elements[0].classList.remove("has-error"),mainForm.classList.remove("has-error")}));