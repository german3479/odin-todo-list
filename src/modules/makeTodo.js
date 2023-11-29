import {EditTaskModal} from "./editTask";

function makeTodo(data){
    const {title, description, dueDate, priority, checklist} = data;

    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const mainTaskInfo = document.createElement('div');
    mainTaskInfo.classList.add('task-item-main');

    const generalInfo = document.createElement('div');
    generalInfo.classList.add('task-item-geninfo');

    const titleElement = document.createElement('div');
    titleElement.classList.add('task-title-element');

    const priorityBox = document.createElement('div');
    priorityBox.classList.add(`priority`, `priority-${priority}`);
    titleElement.append(priorityBox);

    const titleText = document.createElement('div');
    titleText.classList.add('task-title');
    titleText.textContent = title;
    titleElement.appendChild(titleText);

    generalInfo.appendChild(titleElement);

    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');

    const dueElement = document.createElement('div');
    dueElement.classList.add('task-due-date');
    dueElement.textContent = dueDate;
    taskDetails.appendChild(dueElement);

    if (checklist && checklist[0] != ""){
        const stepsButton = document.createElement('button');
    stepsButton.classList.add('task-steps-button');
    stepsButton.textContent = 'STEPS';
    stepsButton.addEventListener('click', e =>{
        e.stopPropagation();
        toggleChecklist();
    });
    taskDetails.appendChild(stepsButton);
    }
    

    const {editTaskButton, editDialog} = EditTaskModal(data);
    taskDetails.appendChild(editTaskButton);
    taskDetails.appendChild(editDialog);

    dueElement.addEventListener('click', e =>{
        e.stopPropagation();
    })
    generalInfo.appendChild(taskDetails);

    mainTaskInfo.appendChild(generalInfo);

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('task-description');
    descriptionElement.textContent = description;
    mainTaskInfo.appendChild(descriptionElement);

    todoItem.appendChild(mainTaskInfo);

   if (checklist && !checklist[0] == "") {
    const hidableChecklist = document.createElement('div');
    hidableChecklist.classList.add('task-item-hidable');

    const checklistElement = document.createElement('ul');
    checklistElement.classList.add('task-checklist');

    checklist.forEach(item =>{
        const checklistItem = document.createElement('li');
        checklistItem.classList.add('task-checklist-item');

        const checklistCheckbox = document.createElement('input');
        checklistCheckbox.type = 'checkbox';
        checklistCheckbox.classList.add('checklist-checkbox');
        checklistItem.appendChild(checklistCheckbox);

        const checklistText = document.createElement('div');
        checklistText.textContent = item;
        checklistItem.appendChild(checklistText);

        checklistElement.appendChild(checklistItem);
    })

    hidableChecklist.appendChild(checklistElement);
    todoItem.appendChild(hidableChecklist);
   }

   function toggleChecklist(){
    const hidableChecklist = todoItem.querySelector('.task-item-hidable');
    if (hidableChecklist){
        hidableChecklist.style.display = hidableChecklist.style.display === "none" ? "block" : "none";
    }
   }

   generalInfo.addEventListener('click', () => toggleCompletion());

   function toggleCompletion(){
    todoItem.classList.toggle('completed');
   }

   function openEditDialog(){
    editDialog.showModal();
   }

    return todoItem;
}

export default makeTodo;