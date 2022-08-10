

//scroll top smoth
function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo (0,currentScroll - (currentScroll/5));
    }
};
// hashedit

const btnEstudiante = document.querySelector(".button-student");
btnEstudiante.addEventListener('click', () => {
    location.hash = "estudiante-login";
});
const btnProfesor = document.querySelector(".button-teacher");
btnProfesor.addEventListener('click', () => {
    location.hash = "profesor-login";
});
const btnAdministrator = document.querySelector(".button-administrador");
btnAdministrator.addEventListener('click', () => {
    location.hash = "administrador-login";
});
const backHome = document.querySelector(".backHome");
backHome.addEventListener('click', () => {
    const stateLoad = window.history.state ? window.history.state.loadUrl : '';
    if (stateLoad.includes('#')) {
        window.location.hash = "#home";
    } else if(location.hash.startsWith('#home')) {
        window.location.hash = "#home";
    } else {
        window.history.back();
    }
})

window.addEventListener('DOMContentLoaded', () => {
    navigator();
    window.history.pushState({ loadUrl: window.location.href }, null, '');
}, false);

window.addEventListener('hashchange', navigator, false);

// navigation on page

function navigator() {
    if(location.hash.startsWith('#administrador-login')) {
        administradorLogin();
    } else if(location.hash.startsWith('#administrador-menu')) {
        administradorMenu();
    } else if(location.hash.startsWith('#administrador-estudiante')) {
        administradorStudent();
    } else if(location.hash.startsWith('#administrador-profesor')) {
        administradorTeacher();
    }  else if(location.hash.startsWith('#administrador-materia')) {
        administradorMatter();
    }  else if(location.hash.startsWith('#profesor-login')) {
        profesorLogin();
    }   else if(location.hash.startsWith('#profesor-menu')) {
        profesorMenu();
    } else if(location.hash.startsWith('#estudiante-login')) {
        estudianteLogin();
    } else if(location.hash.startsWith('#estudiante-menu')) {
        estudianteMenu();
    } else {
        homePage();
    }

    smoothscroll();
}

function administradorLogin() {
    menuMain.classList.add('inactive');
    loginSection.classList.remove('inactive');
    menuButtons.classList.add('inactive');
    viewMenu.classList.add('inactive');
    changeTitle("login","administrador")
    studentsSection.classList.add('inactive');
    teachersSection.classList.add('inactive');
    mattersSection.classList.add('inactive');
}
function profesorLogin() {
    menuMain.classList.add('inactive');
    loginSection.classList.remove('inactive');
    menuButtons.classList.add('inactive');
    viewMenu.classList.add('inactive');
    changeTitle("login","profesor")
    studentsSection.classList.add('inactive');
    teachersSection.classList.add('inactive');
    mattersSection.classList.add('inactive');
}
function estudianteLogin() {
    menuMain.classList.add('inactive');
    loginSection.classList.remove('inactive');
    menuButtons.classList.add('inactive');
    viewMenu.classList.add('inactive');
    changeTitle("login","Estudiante")
    studentsSection.classList.add('inactive');
    teachersSection.classList.add('inactive');
    mattersSection.classList.add('inactive');
}
function homePage() {
    menuMain.classList.remove('inactive');
    loginSection.classList.add('inactive');
    menuButtons.classList.add('inactive');
    viewMenu.classList.add('inactive');
    studentsSection.classList.add('inactive');
    teachersSection.classList.add('inactive');
    mattersSection.classList.add('inactive');
    const title = document.querySelector('.main-title');
    const paragraph = document.querySelector('.paragraph');
    title.innerHTML = 'Bienvenido a la plataforma Condor';
    paragraph.innerHTML = `En esta plataforma podra hacer ingreso como estudiante para ver sus notas, Profesor para poder calificar o Administrador`
}
// menus
function administradorMenu() {
    menuMain.classList.add('inactive');
    loginSection.classList.add('inactive');
    menuButtons.classList.remove('inactive');
    viewMenu.classList.add('inactive');
    studentsSection.classList.add('inactive');
    teachersSection.classList.add('inactive');
    mattersSection.classList.add('inactive');
    administradorMenuButtons(); 
    changeTitle("administrador-menu");
}
function profesorMenu() {
    menuMain.classList.add('inactive');
    loginSection.classList.add('inactive');
    menuButtons.classList.remove('inactive');
    viewMenu.classList.add('inactive');
    studentsSection.classList.add('inactive');
    teachersSection.classList.add('inactive');
    mattersSection.classList.add('inactive');
    changeTitle("profesor-menu", 'Profesor');
    profesorMenuButtons(); 
}
function estudianteMenu() {
    menuMain.classList.add('inactive');
    loginSection.classList.add('inactive');
    menuButtons.classList.remove('inactive');
    viewMenu.classList.add('inactive');
    studentsSection.classList.add('inactive');
    teachersSection.classList.add('inactive');
    mattersSection.classList.add('inactive');
    studentViewNotes(); 
    changeTitle("estudiante-menu", 'Estudiante');
}
//cosas de administrador
function administradorStudent() {
    menuMain.classList.add('inactive');
    loginSection.classList.add('inactive');
    menuButtons.classList.remove('inactive');
    viewMenu.classList.remove('inactive');
    studentsSection.classList.remove('inactive');
    teachersSection.classList.add('inactive');
    mattersSection.classList.add('inactive');
}
function administradorTeacher() {
    menuMain.classList.add('inactive');
    loginSection.classList.add('inactive');
    menuButtons.classList.remove('inactive');
    viewMenu.classList.remove('inactive');
    studentsSection.classList.add('inactive');
    teachersSection.classList.remove('inactive');
    mattersSection.classList.add('inactive');
}
function administradorMatter() {
    menuMain.classList.add('inactive');
    loginSection.classList.add('inactive');
    menuButtons.classList.remove('inactive');
    viewMenu.classList.remove('inactive');
    studentsSection.classList.add('inactive');
    teachersSection.classList.add('inactive');
    mattersSection.classList.remove('inactive');
}
