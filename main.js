const task_Input = document.getElementById("taskInput");
const date_Input = document.getElementById("dateInput");
const btn_Submit = document.getElementById("btnSubmit");
const btn_Clear = document.getElementById("btnClear");
const unchecked_List = document.getElementById("uncheckedContainerList");
const checked_List = document.getElementById("checkedContainerList");

task_Input.value = "";
date_Input.value = "";

let task_List = [];

const saved_Task = localStorage.getItem("tasks");

if (saved_Task) {
  task_List = JSON.parse(saved_Task);
  renderTask();
}

btn_Submit.addEventListener("click", function (event) {
  event.preventDefault();
  addNewList();
});

btn_Clear.addEventListener("click", function (event) {
  event.preventDefault();
  clearTask();
});

function addNewList() {
  const task_Name = task_Input.value;
  let task_Date = date_Input.value;

  if (task_Name == "") {
    alert("please fill out the input!");
    return;
  }

  if (task_Date == "") {
    task_Date = new Date().toISOString().split("T")[0];
  }

  const new_Task = {
    id: +new Date(),
    name: task_Name,
    date: task_Date,
    isCompleted: false,
  };

  task_List.push(new_Task);

  localStorage.setItem("tasks", JSON.stringify(task_List));
  console.log(`Nilai yg ditambah: ${task_List}`);

  task_Input.value = "";
  date_Input.value = "";

  renderTask();
}

function removeTask(id) {
  task_List = task_List.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(task_List));

  renderTask();
}

function clearTask() {
  task_List = [];
  localStorage.removeItem("tasks");
  console.log("data has been removed!");

  renderTask();
}

function toggleCompleteTask(id) {
  task_List = task_List.map((task) => {
    if (task.id == id) {
      return { ...task, isCompleted: !task.isCompleted };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(task_List));
  renderTask();
}

function renderTask() {
  unchecked_List.innerHTML = "";
  checked_List.innerHTML = "";

  task_List.forEach((task) => {
    const div = document.createElement("div");
    div.className = "content-list";

    const textContentDiv = document.createElement("div");
    textContentDiv.className = "text-content";

    const h3 = document.createElement("h3");
    h3.textContent = task.name;

    const p = document.createElement("p");
    p.textContent = task.date;

    textContentDiv.appendChild(h3);
    textContentDiv.appendChild(p);

    const btnDelete = document.createElement("button");
    btnDelete.innerHTML = '<i class="fas fa-trash"></i>';
    btnDelete.onclick = () => removeTask(task.id);
    btnDelete.className = "btn-action";

    const btnToggle = document.createElement("button");
    btnToggle.innerHTML = task.isCompleted
      ? '<i class="fas fa-undo"></i>'
      : '<i class="fas fa-check"></i>';
    btnToggle.className = "btn-action";
    btnToggle.onclick = () => toggleCompleteTask(task.id);

    const buttonList = document.createElement("div");
    buttonList.className = "content-button-list";

    div.appendChild(textContentDiv);
    buttonList.appendChild(btnDelete);
    buttonList.appendChild(btnToggle);
    div.appendChild(buttonList);

    if (task.isCompleted) {
      checked_List.appendChild(div);
    } else {
      unchecked_List.appendChild(div);
    }
  });
}
