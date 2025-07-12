const fakeAPI={
    data:[],

    async getTasks(){
        return new Promise((resolve)=>{
            setTimeout(()=>{resolve([...this.data])}) //Resolves the promise with a copy of this.data
            //This uses the spread operator to return a shallow copy of the array.
            //The original this.data isn’t accidentally modified outside the fake API.
            //done for a safe copy
        },1000 )
    },
    async addTask(task){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.data.push(task);
                resolve(task)
            },1000)
        })
    },

    async deleteTask(text){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.data=this.data.filter((t)=>t.text!==text)
                resolve()
            },1000)
        })
    },
    async updateTask(text,done){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.data=this.data.map((t)=>t.text===text?{...t,done}:t)
                //Copy all properties of t
                //But override the done field with the new value
                //If it doesn’t match, we just return t unchanged.
                resolve()
            },1000)
        })

}
}

window.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    done: false
  };

  addTaskToDOM(task);
  saveTask(task);
  input.value = "";
}

async function loadTasks(){
    const tasks=await fakeAPI.getTasks();
    tasks.forEach(addTaskToDOM)
    //tasks is an array of task objects (fetched from fake API).
    //forEach(...) loops through each task and adds to the DOM
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✅ Done";
  doneBtn.onclick = () => {
    li.style.textDecoration = "line-through";
    doneBtn.disabled = true;
    updateTask(task.text, true);
  };

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
