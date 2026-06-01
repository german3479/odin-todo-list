import MakeProject from "./makeProject";
import { handleProjectButtonClick } from "./projectsBarFunctions";
import { getProjects } from '../utils/storage';

const MakeProjectsList = () => {
    const projectsList = document.createElement('ul');
    projectsList.classList.add('projects-list');

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

    return projectsList;
};

export default MakeProjectsList;