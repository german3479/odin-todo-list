import ListsBar from "./ListsBar";
import ProjectsBar from "../../projectsBar";

const Main = () =>{
    const mainElement = document.createElement('main');

    mainElement.appendChild(ProjectsBar());
    mainElement.appendChild(ListsBar());

    return mainElement;
}

export default Main;