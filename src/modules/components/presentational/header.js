import LogoImg from '../../../imgs/pallas.jpg';

function Header(){
    const header = document.createElement('header');

    const headerContent = document.createElement('div');
    headerContent.classList.add('header-content');

    const logoArea = document.createElement('div');
    logoArea.classList.add('logo-area');

    const logoImg = new Image();
    logoImg.src = LogoImg;
    logoImg.classList.add('logo-img');

    const logoSpan = document.createElement('span');
    logoSpan.textContent = "EDWARDS INDUSTRIES";
    logoSpan.classList.add('logo-span');

    logoArea.appendChild(logoImg);
    logoArea.appendChild(logoSpan);

    header.appendChild(logoArea);

    const hamburger = document.createElement('div');
    hamburger.classList.add('hamburger-button');

    hamburger.addEventListener('click', ()=>{
        hamburger.classList.toggle('active');
    })
    
    const hamburgerLine = document.createElement('div');
    hamburgerLine.classList.add('hamburger-line');

    hamburger.appendChild(hamburgerLine);

    headerContent.appendChild(logoArea);
    headerContent.appendChild(hamburger);

    header.appendChild(headerContent);

    return header;
}

export default Header;