import makeTodo from "./makeTodo";
import {AddTaskModal} from "./addTask";

export function MakeProject(projectObject){
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-preview');

    const title = document.createElement('h3');
    title.classList.add('project-preview-title');
    title.textContent = projectObject.name;

    const taskList = document.createElement('ul');
    taskList.classList.add('project-preview-tasklist');

    const {addTaskButton, taskDialog} = AddTaskModal(projectObject);

    projectDiv.appendChild(title);
    projectDiv.appendChild(taskList);
    projectDiv.appendChild(addTaskButton); 
    projectDiv.appendChild(taskDialog);   

    return projectDiv;
}
