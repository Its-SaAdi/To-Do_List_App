let addBtn = document.querySelector("#addBtn");
let addPopUp = document.querySelector("#pop-up");
let addPopUpCloseBtn = document.querySelector("#close");
let addPopUpSubmitBtn = document.querySelector("#submit");
let addInpuField = document.querySelector("#task");
let taskArea = document.querySelector(".taskArea");
let hideElement = document.querySelector("#empty");
let delAllBtn = document.querySelector("#deleteAll");

addBtn.addEventListener("click", () => {
    addPopUp.style.display = "block";
})

addPopUpCloseBtn.addEventListener('click', () => {
    addPopUp.style.display = "none";
})

function saveTasksToLocalStorage() {
    const tasks = document.querySelectorAll('.task');
    const taskData = [];

    tasks.forEach(task => {
        const para = task.querySelector('p');
        taskData.push(para.innerText);
    });

    localStorage.setItem('tasks', JSON.stringify(taskData));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(taskText => {
        addItem(taskText);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.length <= 0) {
        hideElement.style.display = "block";
    } else if (localStorage.getItem("tasks").length <= "0") {
        hideElement.style.display = "block";
    } else {
        loadTasksFromLocalStorage();
    }

})

addPopUpSubmitBtn.addEventListener('click', () => {
    let data = addInpuField.value;
    if (data === "") {
        alert("Please enter something...");
        return;
    }
    addItem(data);
    addInpuField.value = "";
    addPopUp.style.display = "none";
})

function addItem(data) {
    //create elements
    let div = document.createElement('div');
    let para = document.createElement('p');
    let innerDiv = document.createElement('div');
    let editBtn = document.createElement('button');
    let delBtn = document.createElement('button');

    //set elements
    para.innerHTML = data;
    editBtn.textContent = "edit";
    delBtn.textContent = "delete";

    //set attributes
    div.setAttribute("class", "task");
    innerDiv.setAttribute("class", "btns")
    editBtn.setAttribute("class", "material-symbols-outlined");
    delBtn.setAttribute("class", "material-symbols-outlined red");

    //append elements
    innerDiv.append(editBtn, delBtn);
    div.append(para, innerDiv);
    taskArea.appendChild(div);

    applyDeleteEvent(delBtn);
    applyEditEvent(editBtn);

    saveTasksToLocalStorage();

    if (localStorage.length > 0) {
        hideElement.style.display = "none";
    }
}

function applyDeleteEvent(delBtn) {
    delBtn.addEventListener('click', (e) => {
        let delElement = delBtn.parentElement.parentElement;
        delElement.remove();

        saveTasksToLocalStorage();

        if (JSON.parse(localStorage.getItem('tasks')).length <= "0") {
            hideElement.style.display = "block";
        }
    });
}

function applyEditEvent(editButton) {
    editButton.addEventListener('click', function () {
        const task = editButton.parentElement.parentElement;
        const para = task.querySelector('p');

        if (editButton.innerText == "edit") {
            para.contentEditable = "true";
            para.focus();
            editButton.textContent = "save";
        } else {
            editButton.textContent = "edit";
            para.contentEditable = "false";
        }
        saveTasksToLocalStorage();
    });
}

delAllBtn.addEventListener("click", () => {
    if (localStorage.length > 0) {
        if (confirm("Warning: Pressing 'Clear All' will delete all items. Are you sure you want to proceed?")) {
            localStorage.clear();
            let tasks = document.querySelectorAll(".task");
            Array.from(tasks).forEach((task) => {
                task.remove();
            })
            hideElement.style.display = "block";
        }
    } else {
        alert("Their is no item available for deletion.")
    }
});






// function applyEditEvent(editButton) {
//     editButton.addEventListener('click', function () {
//         const task = editButton.parentElement.parentElement;
//         const para = task.querySelector('p');

//         const container = document.createElement("div");
//         container.setAttribute("class", "box");

//         const editInput = document.createElement('input');
//         editInput.setAttribute("class", "editInput")
//         editInput.value = para.innerText;

//         const saveBtn = document.createElement('button');
//         saveBtn.textContent = 'Save';
//         saveBtn.setAttribute("class", "save");

//         saveBtn.addEventListener('click', function () {
//             para.innerText = editInput.value;
//             task.removeChild(container);
//         });

//         container.append(editInput, saveBtn);
//         task.appendChild(container);
//     });
// }


// function applyEditEvent(editBtn) {
//     editBtn.addEventListener('click', (e) => {
//         let newTask = prompt("What to edit?..");
//         if (newTask === "" || newTask === null) {
//             alert("Enter something!");
//             return;
//         }
//         let editElement = e.target.parentElement.previousElementSibling;
//         editElement.innerText = newTask;
//     })
// }

// function applyEditEvent(editBtn) {
//     editBtn.addEventListener('click', (e) => {
//         // let newTask = prompt("What to edit?..");
//         // if (newTask === "" || newTask === null) {
//         //     alert("Enter something!");
//         //     return;
//         // }
//         let editElement = e.target.parentElement.previousElementSibling;
//         editElement.contentEditable = "true";
//         editElement.focus();

//         let fullElement = e.target.parentElement.parentElement;
//         let parent = fullElement.lastElementChild;
//         let btsnData = parent.innerHTML;
//         parent.innerHTML = "";
//         let data;
//         let saveBtn = document.createElement("button")
//         saveBtn.textContent = "Save";
//         saveBtn.setAttribute("class", "save");
//         parent.append(saveBtn);

//         saveBtn.addEventListener("click", () => {
//             data = editElement.textContent;
//             editElement.contentEditable = "false";
//             editElement.innerHTML = data;
//             parent.innerHTML = btsnData;
//         })
//         applyDeleteEvent(parent.lastElementChild);
//         applyEditEvent(parent.firstElementChild);
//     })
// }

//local storage implementation

/**
 * // Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = document.querySelectorAll('.task');
    const taskData = [];

    tasks.forEach(task => {
        const para = task.querySelector('p');
        taskData.push(para.innerText);
    });

    localStorage.setItem('tasks', JSON.stringify(taskData));
}

// Function to load tasks from local storage and display them
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(taskText => {
        addItem(taskText);
    });
}

// Call this function after defining your addItem function
loadTasksFromLocalStorage();

// Update your addItem function to save tasks after adding
function addItem(data) {
    // ... (your existing code for creating elements)

    // Append elements
    innerDiv.append(editBtn, delBtn);
    div.append(para, innerDiv);
    taskArea.appendChild(div);

    applyDeleteEvent(delBtn);
    applyEditEvent(editBtn);

    // Save tasks to local storage after adding a new task
    saveTasksToLocalStorage();
}

// Update your delete and edit event listeners to save tasks after modifications
function applyDeleteEvent(deleteButton) {
    deleteButton.addEventListener('click', function() {
        // ... (your existing code for delete event)

        // Save tasks to local storage after deletion
        saveTasksToLocalStorage();
    });
}

function applyEditEvent(editButton) {
    editButton.addEventListener('click', function() {
        // ... (your existing code for edit event)

        // Save tasks to local storage after editing
        saveTasksToLocalStorage();
    });
}

-- check if items available in local Storage
    if yes then check how many are available
        get each item and display on page
    if not present
        display  nothing

-- add each item when added by user on local storage

-- delete each item

-- delete all

-- edit each item in local storage

 */