let todoInput=document.querySelector(".input");
let addtobutton=document.querySelector(".button");
let show_container=document.querySelector(".todos-container")
let todo;
// let todoList =  [];
let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];

// Creating an unique id for every todoinput
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (param) { 
        var r = Math.random() * 16 | 0,
            v = param == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// (/[xy]/g) means repalce all xy with global by this function // math.random() function create a random number//

addtobutton.addEventListener("click",(e)=>{
    e.preventDefault();
    todo=todoInput.value;
   if(todo.length>0){
    todoList.push({id: uuid(), todo, isCompleted: false});
   }
   render(todoList) ;
   localStorage.setItem("todos", JSON.stringify(todoList));
   todoInput.value=" ";
});

function render(todoList){
    show_container.innerHTML=todoList.map(({id, todo, isCompleted}) =>
    `<div class="todo relative">
    <input id="item-${id}" data-key=${id}  type="checkbox"  class="t-checkbox t-pointer"  ${isCompleted ? "checked": ""} >    
      <label for="item-${id}" data-key=${id} class="todo t-pointer todo-text ${isCompleted ? "checked-todo": ""}">${todo}</label>
      
      <button class="absolute right-0 button cursor" ><span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span></button>
      </div>`) 
}
show_container.addEventListener("click",(e)=>{
    e.preventDefault();
    let key=e.target.dataset.key;
    let deltodokey=e.target.dataset.todokey;
   todoList=todoList.map(todo => todo.id===key?{...todo, isCompleted: !todo.isCompleted} : todo);
   todoList=todoList.filter(todo => todo.id !==deltodokey);
   localStorage.setItem("todos", JSON.stringify(todoList));
    render(todoList)
});
render(todoList)
