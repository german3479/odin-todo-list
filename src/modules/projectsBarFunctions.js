import { MakeProject } from "./makeProject";
import makeTodo from "./makeTodo";
import { AddTaskModal } from "./addTask";
import {
    addProject as storageAddProject,
    getProjects,
    getTasksByProject
} from '../utils/storage';

export const addProject = projectDialog => {
    const name = projectDialog.querySelector('#projectNameSelect');
    storageAddProject(name.value);
    updateProjectsList();
    closeProjectModal(projectDialog);
};

export const openProjectModal = (modal) => {
    modal.showModal();
};

export const closeProjectModal = (modal) => {
    modal.close();
};

export const updateProjectsList = () => {
    const projectsList = document.querySelector(".projects-list");
    projectsList.innerHTML = "";
    getProjects().forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.classList.add('project-item');
        const projectButton = document.createElement('button');
        projectButton.classList.add('project-button');
        projectButton.textContent = project.name;
        projectButton.addEventListener('click', () => handleProjectButtonClick(project));
        projectItem.appendChild(projectButton);
        projectsList.appendChild(projectItem);
    });
};

export const handleProjectButtonClick = project => {
    const projectDiv = MakeProject(project);
    const listbar = document.querySelector('#list-bar');
    listbar.innerHTML = '';
    listbar.appendChild(projectDiv);

    const tasklist = document.querySelector(".project-preview-tasklist");
    tasklist.innerHTML = '';
    getTasksByProject(project.name).forEach(task => {
        const taskElement = makeTodo(task);
        tasklist.appendChild(taskElement);
    });
};