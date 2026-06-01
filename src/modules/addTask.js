import makeTodo from "./makeTodo";
import {format, parse, parseISO} from 'date-fns';
import {addTask as storageAddTask} from '../utils/storage';
import {createFormField, createOptionsGroup, validateFormData} from '../utils/form-helpers';

export function handleAddButtonClick(projectObject, taskDialog) {
    const dueDateString = document.querySelector("#task-due-add");
    const parsedString = parseISO(dueDateString.value);

    const formData = {
        title: document.querySelector("#task-title-add").value,
        description: document.querySelector("#task-description-add").value,
        dueDate: format(parsedString, "EEEEE MMM dd yyyy"),
        priority: document.querySelector("#task-priority-add").value,
        checklist: document.querySelector("#task-checklist-add").value
            .split(",")
            .map(item => item.trim()),
        project: projectObject.name,
    };

    const validationResult = validateFormData(formData, document.querySelector(".add-task-error"));

    if (!validationResult.valid) {
        return;
    }

    storageAddTask(formData);

    const taskElement = makeTodo(formData);

    const taskList = document.querySelector('.project-preview-tasklist');
    taskList.appendChild(taskElement);

    document.querySelector("#add-task-form").reset();

    taskDialog.close();
}

export function AddTaskModal(projectObject) {
    const addTaskButton = document.createElement('button');
    addTaskButton.setAttribute('data-open-task-modal', '');
    const plusIcon = document.createElement('i');
    plusIcon.classList.add('fa', 'fa-solid', 'fa-plus');
    const addTaskSpan = document.createElement('span');
    addTaskSpan.textContent = 'Add Task';
    addTaskButton.appendChild(plusIcon);
    addTaskButton.appendChild(addTaskSpan);

    const taskDialog = document.createElement('dialog');
    taskDialog.setAttribute('data-task-modal', '');

    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('dialog-container');

    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');
    form.setAttribute('id', 'add-task-form');

    const titleFormGroup = createFormField({
        labelText: 'Task Title',
        id: 'task-title-add',
        type: 'text'
    });
    const optionsGroup = createOptionsGroup('add');
    const descriptionFormGroup = createFormField({
        labelText: 'Description',
        id: 'task-description-add',
        tagName: 'textarea'
    });
    const checklistFormGroup = createFormField({
        labelText: 'Checklist (optional)',
        id: 'task-checklist-add',
        tagName: 'textarea'
    });

    const validationErrorDiv = document.createElement('div');
    validationErrorDiv.classList.add('add-task-error');
    validationErrorDiv.textContent = "";

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');

    const addButton = document.createElement('button');
    addButton.classList.add('task-modal-add');
    addButton.textContent = 'Add Task';
    addButton.setAttribute('type', 'submit');

    buttonGroup.appendChild(addButton);

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

    taskDialog.appendChild(dialogContainer);

    addTaskButton.addEventListener('click', () => {
        taskDialog.showModal();
    });
    addButton.addEventListener('click', () => handleAddButtonClick(projectObject, taskDialog));
    closeButton.addEventListener('click', () => {
        taskDialog.close();
    });

    return { addTaskButton, taskDialog };
}