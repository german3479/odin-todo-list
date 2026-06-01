import makeTodo from "./makeTodo";
import parse from "date-fns/parse";
import {updateTask as storageUpdateTask, getTasksByProject} from '../utils/storage';
import {createFormField, createOptionsGroup, validateFormData} from '../utils/form-helpers';

export function EditTaskModal(data){
    const editTaskButton = document.createElement('button');
    editTaskButton.setAttribute('data-edit-task-modal', '');
    const editSpan = document.createElement('span');
    editSpan.textContent = 'EDIT';
    editTaskButton.appendChild(editSpan);

    const editDialog = document.createElement('dialog');
    editDialog.setAttribute('data-edit-modal', '');

    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('dialog-container');

    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');
    form.setAttribute('id', 'edit-task-from');

    const titleFormGroup = createFormField({
        labelText: 'Task Title',
        id: 'task-title-edit',
        type: 'text'
    });
    const optionsGroup = createOptionsGroup('edit');
    const descriptionFormGroup = createFormField({
        labelText: 'Description',
        id: 'task-description-edit',
        tagName: 'textarea'
    });
    const checklistFormGroup = createFormField({
        labelText: 'Checklist (optional)',
        id: 'task-checklist-edit',
        tagName: 'textarea'
    });

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
        editDialog.querySelector("#task-title-edit").value = data.title;
        editDialog.querySelector("#task-priority-edit").value = data.priority;
        editDialog.querySelector("#task-due-edit").value = data.dueDate;
        editDialog.querySelector("#task-description-edit").value = data.description;
        editDialog.querySelector("#task-checklist-edit").value = data.checklist.join(",");
    }

    editTaskButton.addEventListener('click', (e) => {
        e.stopPropagation();
        editDialog.showModal();
        populateFormFields(data);
    });

    editButton.addEventListener('click', () => handleEditButtonClick(data, editDialog));
    closeButton.addEventListener('click', () => {
        editDialog.close();
    });

    return {editTaskButton, editDialog};
}

export function handleEditButtonClick(data, editDialog){
    const refTitle = data.title;

    const formData = {
        title: editDialog.querySelector("#task-title-edit").value,
        description: editDialog.querySelector("#task-description-edit").value,
        dueDate: editDialog.querySelector("#task-due-edit").value,
        priority: editDialog.querySelector("#task-priority-edit").value,
        checklist: editDialog.querySelector("#task-checklist-edit").value.split(","),
        project: data.project
    };

    //change down to line itemsToAdd
    storageUpdateTask(refTitle, formData);

    const tasklist = document.querySelector(".project-preview-tasklist");
    tasklist.innerHTML = "";

    getTasksByProject(data.project).forEach(item => {
    tasklist.appendChild(makeTodo(item));
    });

    editDialog.close();
}