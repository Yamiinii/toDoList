window.addEventListener("DOMContentLoaded",loadTasks)
document.getElementById("addTaskBtn").addEventListener("click",addTask)

function addTask(){
    const input=document.getElementById("taskInput")
    const tasktext = input.value.trim();

    if(tasktext=="" ) return;

    const task={
        text:tasktext,
        done:false
    }

    addTaskToDOM(task);
    saveTask(task);
    input.value="";

}

function addTaskToDOM(task){
    const li=document.createElement("li")
    li.textContent=task.text;

    const doneBtn=document.createElement("button")
    doneBtn.textContent="Done"
    doneBtn.onclick=()=>{
        li.style.textDecoration="line-through";
        doneBtn.disabled=true
        updateTask(task.text,true)
    }
 const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌ Delete";
  deleteBtn.onclick = () => {
    li.remove();
    deleteTask(task.text);
  };

   if (task.done) {
    li.style.textDecoration = "line-through";
    doneBtn.disabled = true;
  }

  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);
}

function saveTask(task){
    const tasks=JSON.parse(localStorage.getItem("tasks") || "[]")
    tasks.push(task)
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function deleteTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks = tasks.filter((t) => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(text, isDone) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks = tasks.map((t) =>
    t.text === text ? { ...t, done: isDone } : t
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach(addTaskToDOM);
}
