import './styles/styles.css';
import {initStorage} from './utils/storage'

import Header from './modules/components/presentational/header';
import Main from './modules/components/presentational/main';

initStorage();

document.addEventListener('DOMContentLoaded', ()=>{
    const app = document.querySelector("#app");

    app.appendChild(Header());
    app.appendChild(Main());

})