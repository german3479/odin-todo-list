import './styles/styles.css';

import Header from '../src/modules/components/presentational/header';
import Main from '../src/modules/components/presentational/main';

if (Object.keys(localStorage).length < 2 && (!localStorage.getItem('projects') || !localStorage.getItem('tasks'))){
  localStorage.getItem('projects') ? null : localStorage.setItem('projects', JSON.stringify([]));
  localStorage.getItem('tasks') ? null : localStorage.setItem('tasks', JSON.stringify([]));
}

document.addEventListener('DOMContentLoaded', ()=>{
    const app = document.querySelector("#app");

    app.appendChild(Header());
    app.appendChild(Main());

})