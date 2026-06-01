import makeTodo from "./makeTodo";
import {AddTaskModal} from "./addTask";
import {deleteProject as storageDeleteProject} from '../utils/storage';
import {updateProjectsList} from './projectsBarFunctions';

export function MakeProject(projectObject){
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-preview');

    const headerRow = document.createElement('div');
    headerRow.classList.add('project-preview-header');

    const title = document.createElement('h3');
    title.classList.add('project-preview-title');
    title.textContent = projectObject.name;

    const actions = document.createElement('div');
    actions.classList.add('project-preview-actions');

    const {addTaskButton, taskDialog} = AddTaskModal(projectObject);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'DELETE PROJECT';
    deleteButton.classList.add('project-delete-button');
    deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        storageDeleteProject(projectObject.name);
        document.querySelector('#list-bar').innerHTML = '';
        updateProjectsList();
    });

    actions.appendChild(addTaskButton);
    actions.appendChild(deleteButton);

    headerRow.appendChild(title);
    headerRow.appendChild(actions);

    const taskList = document.createElement('ul');
    taskList.classList.add('project-preview-tasklist');

    projectDiv.appendChild(headerRow);
    projectDiv.appendChild(taskList);
    projectDiv.appendChild(taskDialog);

    return projectDiv;
}