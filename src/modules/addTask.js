import makeTodo from "./makeTodo";
import {format, parse, parseISO} from 'date-fns';

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

export function createDescription() {
    const descriptionFormGroup = document.createElement('div');
    descriptionFormGroup.classList.add('form-group');

    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'add-task-description');
    descriptionLabel.textContent = 'Description';

    const description = document.createElement('textarea');
    description.setAttribute('id', 'add-task-description');
    description.setAttribute('name', 'add-task-description');

    descriptionFormGroup.appendChild(descriptionLabel);
    descriptionFormGroup.appendChild(description);

    return descriptionFormGroup;
}

export function createOptionsGroup() {
    const optionsFormGroup = document.createElement('div');
    optionsFormGroup.classList.add('form-group');

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'add-task-priority');
    priorityLabel.textContent = "Priority";

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'add-task-due');
    dueDateLabel.textContent = 'Due Date';

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('options-container');

    const prioritySelect = document.createElement('select');
    prioritySelect.setAttribute('id', 'add-task-priority');
    prioritySelect.setAttribute('name', 'add-task-priority');

    const priorityOptions = ['Low', 'Medium', 'High'];

    priorityOptions.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText.toLowerCase();
        option.textContent = optionText;
        prioritySelect.appendChild(option);
    });

    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'datetime-local');
    dueDateInput.setAttribute('id', 'add-task-due');
    dueDateInput.setAttribute('name', 'add-task-due');

    inputContainer.appendChild(prioritySelect);
    inputContainer.appendChild(dueDateInput);

    optionsFormGroup.appendChild(priorityLabel);
    optionsFormGroup.appendChild(dueDateLabel);
    optionsFormGroup.appendChild(inputContainer);

    return optionsFormGroup;
}

export function createChecklistFormGroup() {
    const checklistFormGroup = document.createElement('div');
    checklistFormGroup.classList.add('form-group');

    const checklistLabel = document.createElement('label');
    checklistLabel.setAttribute('for', 'add-task-checklist');
    checklistLabel.textContent = 'Checklist (optional)';

    const checklistTextarea = document.createElement('textarea');
    checklistTextarea.setAttribute('id', 'add-task-checklist');
    checklistTextarea.setAttribute('name', 'add-task-checklist');

    checklistFormGroup.appendChild(checklistLabel);
    checklistFormGroup.appendChild(checklistTextarea);

    return checklistFormGroup;
}

export function validateFormData(formData) {
    if (!formData.title || !formData.dueDate) {
        const validationErrorSpan = document.querySelector(".add-task-error");
        validationErrorSpan.textContent = "All fields except description and checklist must be filled";

        return {
            valid: false,
            message: "All fields except description and checklist must be filled"
        };
    }

    return {
        valid: true,
        message: "Validation passed."
    };
}


export function handleAddButtonClick(projectObject, taskDialog) {
    const dueDateString = document.querySelector("#add-task-due");
    const parsedString = parseISO(dueDateString.value);

    const formData = {
        title: document.querySelector("#add-task-title").value,
        description: document.querySelector("#add-task-description").value,
        dueDate: format(parsedString, "EEEEE MMM dd yyyy"),
        priority: document.querySelector("#add-task-priority").value,
        checklist: document.querySelector("#add-task-checklist").value
            .split(",")
            .map(item => item.trim()),
        project: projectObject.name,
    };

    const validationResult = validateFormData(formData);

    if (!validationResult.valid) {
        const validationErrorSpan = document.querySelector(".add-task-error");
        validationErrorSpan.textContent = validationResult.message;

        return;
    }

    const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    tasks.push(formData);

    localStorage.setItem('tasks', JSON.stringify(tasks));

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

    const titleFormGroup = createFormGroup('Task Title', 'add-task-title', 'text');
    const optionsGroup = createOptionsGroup();
    const descriptionFormGroup = createDescription();
    const checklistFormGroup = createChecklistFormGroup();

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
