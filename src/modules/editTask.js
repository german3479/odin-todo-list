import makeToDo from "./makeTodo";
import parse from "date-fns/parse";

export function EditTaskModal(data){
    const editTaskButton = document.createElement('button');
    editTaskButton.setAttribute('data-edit-task-modal', '');
    const editSpan = document.createElement('span');
    editSpan.textContent = 'EDIT'
    editTaskButton.appendChild(editSpan);

    const editDialog = document.createElement('dialog');
    editDialog.setAttribute('data-edit-modal', '');

    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('dialog-container');

    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');
    form.setAttribute('id', 'edit-task-from');

    const titleFormGroup = createFormGroup('Task Title', 'edit-task-title', 'text');
    const optionsGroup = createOptionsGroup();
    const descriptionFormGroup = createDescription();
    const checklistFormGroup = createChecklistFormGroup();

    const validationErrorDiv = document.createElement('div');
    validationErrorDiv.classList.add('edit-task-error');
    validationErrorDiv.textContent = "";

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');

    const editButton = document.createElement('button');
    editButton.classList.add('task-modal-edit');
    editButton.textContent = 'EDIT TASK';
    editButton.setAttribute('type', 'submit');

    buttonGroup.appendChild(editButton);

    const closeButton = document.createElement('button');
    closeButton.classList.add('task-modal-close');
    closeButton.textContent = 'Close/Cancel';

    buttonGroup.appendChild(closeButton);

    form.appendChild(titleFormGroup);
    form.appendChild(optionsGroup);
    form.appendChild(descriptionFormGroup);
    form.appendChild(checklistFormGroup);

    dialogContainer.appendChild(form);
    dialogContainer.appendChild(validationErrorDiv);
    dialogContainer.appendChild(buttonGroup);

    editDialog.appendChild(dialogContainer);

    function populateFormFields(data){
        editDialog.querySelector("#edit-task-title").value = data.title;
        editDialog.querySelector("#edit-task-priority").value = data.priority;
        editDialog.querySelector("#edit-task-due").value = data.dueDate;
        editDialog.querySelector("#edit-task-description").value = data.description;
        editDialog.querySelector("#edit-task-checklist").value = data.checklist.join(",");
    }
    editTaskButton.addEventListener('click', (e)=>{
        console.log(`data!: ${data}`)
        editDialog.showModal();
        populateFormFields(data);
    })
    editButton.addEventListener('click', ()=> handleEditButtonClick(data, editDialog));
    closeButton.addEventListener('click', ()=>{
        editDialog.close();
    })

    return {editTaskButton, editDialog};
}

export function handleEditButtonClick(data, editDialog){

    const refTitle = data.title;

    const formData = {
        title: editDialog.querySelector("#edit-task-title").value,
        description: editDialog.querySelector("#edit-task-description").value,
        dueDate: editDialog.querySelector("#edit-task-due").value,
        priority: editDialog.querySelector("#edit-task-priority").value,
        checklist: editDialog.querySelector("#edit-task-checklist").value.split(","),
        project: data.project
    }

    const tasks = JSON.parse(localStorage.getItem('tasks'));

    const indexToEdit = tasks.findIndex(task => task.title == refTitle);

    tasks.splice(indexToEdit, 1, formData);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    const tasklist = document.querySelector(".project-preview-tasklist");
    tasklist.innerHTML = "";

    const itemsToAdd = JSON.parse(localStorage.getItem('tasks')).filter(task => task.project == data.project);

    itemsToAdd.forEach(item =>{
        item = makeToDo(item);
        tasklist.appendChild(item);
    })

    editDialog.close();
}
export function createFormGroup(labelText, inputId, inputType) {
    const formGroupDiv = document.createElement('div');
    formGroupDiv.classList.add('form-group');

    const label = document.createElement('label');
    label.setAttribute('for', inputId);
    label.textContent = labelText;

    const input = document.createElement('input');
    input.setAttribute('type', inputType);
    input.setAttribute('id', inputId);
    input.setAttribute('name', inputId);

    formGroupDiv.appendChild(label);
    formGroupDiv.appendChild(input);

    return formGroupDiv;
}

export function createOptionsGroup() {
    const optionsFormGroup = document.createElement('div');
    optionsFormGroup.classList.add('form-group');

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'edit-task-priority');
    priorityLabel.textContent = "Priority";

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'edit-task-due');
    dueDateLabel.textContent = 'Due Date';

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('options-container');

    const prioritySelect = document.createElement('select');
    prioritySelect.setAttribute('id', 'edit-task-priority');
    prioritySelect.setAttribute('name', 'edit-task-priority');

    const priorityOptions = ['Low', 'Medium', 'High'];

    priorityOptions.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText.toLowerCase();
        option.textContent = optionText;
        prioritySelect.appendChild(option);
    })
    
    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'datetime-local');
    dueDateInput.setAttribute('id', 'edit-task-due');
    dueDateInput.setAttribute('name', 'edit-task-due');

    inputContainer.appendChild(prioritySelect);
    inputContainer.appendChild(dueDateInput);

    optionsFormGroup.appendChild(priorityLabel);
    optionsFormGroup.appendChild(dueDateLabel);
    optionsFormGroup.appendChild(inputContainer);

    return optionsFormGroup;
};

    export function createDescription() {
        const descriptionFormGroup = document.createElement('div');
        descriptionFormGroup.classList.add('form-group');
    
        const descriptionLabel = document.createElement('label');
        descriptionLabel.setAttribute('for', 'edit-task-description');
        descriptionLabel.textContent = 'Description';
    
        const description = document.createElement('textarea');
        description.setAttribute('id', 'edit-task-description');
        description.setAttribute('name', 'edit-task-description');
    
        descriptionFormGroup.appendChild(descriptionLabel);
        descriptionFormGroup.appendChild(description);
    
        return descriptionFormGroup;
    }

    export function createChecklistFormGroup() {
        const checklistFormGroup = document.createElement('div');
        checklistFormGroup.classList.add('form-group');
    
        const checklistLabel = document.createElement('label');
        checklistLabel.setAttribute('for', 'edit-task-checklist');
        checklistLabel.textContent = 'Checklist (optional)';
    
        const checklistTextarea = document.createElement('textarea');
        checklistTextarea.setAttribute('id', 'edit-task-checklist');
        checklistTextarea.setAttribute('name', 'edit-task-checklist');
    
        checklistFormGroup.appendChild(checklistLabel);
        checklistFormGroup.appendChild(checklistTextarea);
    
        return checklistFormGroup;
    }

export default EditTaskModal;