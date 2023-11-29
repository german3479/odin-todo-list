function CreateProjectModal() {
    //button
    const newProjectButton = document.createElement('button');
    newProjectButton.setAttribute('data-open-listbar-modal', '');
    const folderIcon = document.createElement('i');
    folderIcon.classList.add('fa', 'fa-solid', 'fa-folder');
    const newProjectSpan = document.createElement('span');
    newProjectSpan.textContent = "New Project";
    newProjectButton.appendChild(folderIcon);
    newProjectButton.appendChild(newProjectSpan);
    // dialog
    const projectDialog = document.createElement('dialog');
    projectDialog.setAttribute('data-listbar-modal', '');

    const dialogContainer = document.createElement('div');
    dialogContainer.classList.add('dialog-container');

    // form
    const form = document.createElement('form');
    form.setAttribute('method', 'dialog');

    const infoGroupsDiv = document.createElement('div');
    infoGroupsDiv.classList.add('info-groups');

    const formGroupDiv = document.createElement('div');
    formGroupDiv.classList.add('form-group');

    const projectNameLabel = document.createElement('label');
    projectNameLabel.setAttribute('for', 'projectNameSelect');
    projectNameLabel.textContent = 'List Name: ';

    const projectNameInput = document.createElement('input');
    projectNameInput.setAttribute('type', 'text');
    projectNameInput.setAttribute('id', 'projectNameSelect');
    projectNameInput.setAttribute('name', 'projectNameSelect');
    projectNameInput.setAttribute('placeholder', 'Name here:');

    formGroupDiv.appendChild(projectNameLabel);
    formGroupDiv.appendChild(projectNameInput);

    infoGroupsDiv.appendChild(formGroupDiv);

    // dialog options
    const dialogOptionsDiv = document.createElement('div');
    dialogOptionsDiv.classList.add('listbarDialogOptions');

    const addButton = document.createElement('button');
    addButton.classList.add('listbarDialogAdd');
    addButton.textContent = 'Add';

    const closeButton = document.createElement('button');
    closeButton.classList.add('listbarDialogClose');
    closeButton.textContent = 'Close';

    dialogOptionsDiv.appendChild(addButton);
    dialogOptionsDiv.appendChild(closeButton);

    form.appendChild(infoGroupsDiv);
    form.appendChild(dialogOptionsDiv);

    dialogContainer.appendChild(form);

    projectDialog.appendChild(dialogContainer);

    return {newProjectButton, projectDialog};
}

export default CreateProjectModal;
