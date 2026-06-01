const PROJECTS_KEY = 'projects';
const TASKS_KEY = 'tasks';

export function getProjects(){
    return JSON.parse(localStorage.getItem(PROJECTS_KEY) || []);
}

export function setProjects(projects){
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function addProject(name){
    const projects = getProjects();
    projects.push({name})
    setProjects(projects);
}

export function getTasks(){
    return JSON.parse(localStorage.getItem(TASKS_KEY) || []);
}

export function setTasks(tasks){
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function addTask(taskObj){
    const tasks = getTasks();
    tasks.push(taskObj);
    setTasks(tasks);
}

export function updateTask(originalTitle, updatedTask){
    const tasks = getTasks();
    const index = tasks.findIndex(t => t.title === originalTitle);
    if (index !== -1){
        tasks[index] = updatedTask;
        setTasks(tasks);
    }
}

export function deleteTask(title, project) {
    const tasks = getTasks().filter(t => !(t.title === title && t.project === project));
    setTasks(tasks);
}

export function getTasksByProject(projectName) {
    return getTasks().filter(t => t.project === projectName);
}

export function initStorage() {
    if (!localStorage.getItem(PROJECTS_KEY)) {
        setProjects([]);
    }
    if (!localStorage.getItem(TASKS_KEY)) {
        setTasks([]);
    }
}