import CreateProjectModal from "./addProject";
import MakeProjectsList from "./makeProjectsList";
import MakeProject from "./makeProject";
import AddTaskModal from "./addTask";

import {addProject, openProjectModal, closeProjectModal, updateProjectsList, handleProjectButtonClick} from './projectsBarFunctions';

const {newProjectButton, projectDialog} = CreateProjectModal();
const ProjectsBar = () =>{
    const projectsBar = document.createElement('div');
    projectsBar.classList.add('projects-bar');

    const defaultsH2 = document.createElement('h2');
    defaultsH2.textContent = "Defaults";
    projectsBar.appendChild(defaultsH2);

    const projectsH2 = document.createElement('h2');
    projectsH2.textContent = "Projects";
    projectsBar.appendChild(projectsH2);

    const projectsList = MakeProjectsList(JSON.parse(localStorage.getItem('projects') || []));
    projectsBar.appendChild(projectsList);

    projectsBar.appendChild(newProjectButton);
    projectsBar.appendChild(projectDialog);

    setTimeout(()=>{
        newProjectButton.addEventListener('click', () => openProjectModal(projectDialog));

        const addButton = projectDialog.querySelector(".listbarDialogAdd");
        const closeButton = projectDialog.querySelector(".listbarDialogClose");

        addButton.addEventListener('click', () => addProject(projectDialog));
        closeButton.addEventListener('click', () => closeProjectModal(projectDialog));
    }, 0)

    return projectsBar;
}

export default ProjectsBar;