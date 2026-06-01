import MakeProject from "./makeProject";
import { handleProjectButtonClick, updateProjectsList } from "./projectsBarFunctions";
import { getProjects, deleteProject as storageDeleteProject} from '../utils/storage';

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

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('project-delete-icon');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            storageDeleteProject(project.name);
            updateProjectsList();
            document.querySelector('#list-bar').innerHTML = '';
        });

        projectItem.appendChild(projectButton);
        projectItem.appendChild(deleteBtn);
        projectsList.appendChild(projectItem);
    });

    return projectsList;
};

export default MakeProjectsList;