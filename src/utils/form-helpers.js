export function createFormField({labelText, id, tagName = 'input', type, options = null} = {}) {
    const formGroupDiv = document.createElement('div');
    formGroupDiv.classList.add('form-group');

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = labelText;

    let field;
    if (tagName === 'select'){
        field = document.createElement('select');
        field.setAttribute('id', id);
        field.setAttribute('name', id);
        (options || []).forEach(({value,text}) =>{
            const opt = document.createElement('option');
            opt.value = value;
            opt.textContent = text;
            field.appendChild(opt);
        });
    } else {
        field = document.createElement(tagName);
        field.setAttribute('id', id);
        field.setAttribute('name', id);
        if (type) field.setAttribute('type', type);
    }

    formGroupDiv.appendChild(label);
    formGroupDiv.appendChild(field);

    return formGroupDiv;
}

export function createOptionsGroup(idSuffix){
    const optionsFormGroup = document.createElement('div');
    optionsFormGroup.classList.add('form-group');

    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', `task-priority-${idSuffix}`);
    priorityLabel.textContent = 'Priority';

    const dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', `task-due-${idSuffix}`);
    dueDateLabel.textContent = 'Due Date';

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('options-container');

    const prioritySelect = document.createElement('select');
    prioritySelect.setAttribute('id', `task-priority-${idSuffix}`);
    prioritySelect.setAttribute('name', `task-priority-${idSuffix}`);

    [{value:'low', text:'Low'}, {value:'medium', text:'Medium'}, {value:'high', text:'High'}].forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        prioritySelect.appendChild(option);
    });
    
    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'datetime-local');
    dueDateInput.setAttribute('id', `task-due-${idSuffix}`);
    dueDateInput.setAttribute('name', `task-due-${idSuffix}`);

    inputContainer.appendChild(prioritySelect);
    inputContainer.appendChild(dueDateInput);

    optionsFormGroup.appendChild(priorityLabel);
    optionsFormGroup.appendChild(dueDateLabel);
    optionsFormGroup.appendChild(inputContainer);

    return optionsFormGroup;
}

export function validateFormData(formData, errorElement){
    if (!formData.title || !formData.dueDate){
        errorElement.textContent = "All fields except description and checklist must be filled";
        return {valid: false};
    }
    errorElement.textContent = "";
    return {valid: true};
}