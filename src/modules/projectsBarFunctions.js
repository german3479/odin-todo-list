import {MakeProject} from "./makeProject";
import makeTodo from "./makeTodo";
import { AddTaskModal } from "./addTask";

export const addProject = projectDialog =>{
    const name = projectDialog.querySelector('#projectNameSelect');

    const projectData = {
        name: name.value,
    }

    const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];
    existingProjects.push(projectData);

    localStorage.setItem('projects', JSON.stringify(existingProjects));

    updateProjectsList(existingProjects);
    
    closeProjectModal(projectDialog);
}

export const openProjectModal = (modal) =>{
    modal.showModal();
}
export const closeProjectModal = (modal) =>{
    modal.close();
}

export const updateProjectsList = projects =>{
    const projectsList = document.querySelector(".projects-list");

    projectsList.innerHTML = "";

    projects.forEach(project =>{
        const projectItem = document.createElement('li');
        projectItem.classList.add('project-item');

        const projectButton = document.createElement('button');
        projectButton.classList.add('project-button');
        projectButton.textContent = project.name;

        projectButton.addEventListener('click', () => handleProjectButtonClick(project));

        projectItem.appendChild(projectButton);
        projectsList.appendChild(projectItem);
    })
}
export const handleProjectButtonClick = project =>{
    const projectDiv = MakeProject(project)

    const listbar = document.querySelector('#list-bar');

    listbar.innerHTML = '';

    listbar.appendChild(projectDiv);

    const projectName = project.name;

    const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

    const projectTasks = tasks.filter(task => task.project == projectName);

    const tasklist = document.querySelector(".project-preview-tasklist");
    tasklist.innerHTML = '';

    projectTasks.forEach(task =>{
        const taskElement = makeTodo(task);
        tasklist.appendChild(taskElement);
    })
}
