document.getElementById("addTaskBtn").addEventListener("click",addTask)

function addTask(){
    const input=document.getElementById("taskInput")
    const tasktext = input.value.trim();

    if(tasktext=="" ) return;

    const li=document.createElement("li");
    li.textContent=tasktext;

    const doneBtn= document.createElement("button")
    doneBtn.textContent="Done"
    doneBtn.onclick=()=>{
        li.style.textDecoration="line-through"
        doneBtn.disabled=true
    }

    const deleteBtn=document.createElement("button")
    deleteBtn.textContent="Delete"
    deleteBtn.onclick=()=>{
        li.remove();
    }

    li.appendChild(doneBtn)
    li.appendChild(deleteBtn)

    document.getElementById("taskList").appendChild(li)
    input.value=""

}