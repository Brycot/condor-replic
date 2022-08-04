class Administrator {
    constructor ({
        user,
        password,
    }) {
        this.user = user;
        this.password = password;
    }
}
class Student {
    constructor({
        name,
        password,
        code,
        carrier,
        semester,
        matters = [],
    }) {
        this.name = name;
        this.password = password;
        this.code = code;
        this.carrier = carrier;
        this.semester = semester;
        this.matters = matters;
        this.notes = [];
    }
}
class Teacher {
    constructor({
        name,
        password,
        code,
        matters = [],
    }) {
        this.name = name;
        this.password = password;
        this.code = code;
        this.matters = matters;
    }
}
class Matter {
    constructor({
        name,
        code,
        teacher,
    }) {
        this.name = name;
        this.code = code;
        this.teacher = teacher;
    }
}
const administrador = new Administrator({
    user: "admin",
    password: "admin",
})


document.getElementById('login-form')
    .addEventListener('submit', (e) => {
        
        const inputUser = document.getElementById('user').value;
        const inputPassword = document.getElementById('password').value;
        
        if(inputUser === administrador.user && inputPassword === administrador.password) {
            console.log('bienvenido');
            location.hash = "administrador-menu";
        } else {
            console.log('usuario incorrecto');
        }

        document.getElementById('login-form').reset();
        e.preventDefault();
    });

function viewStudent(student) {
    const div = document.createElement('div');
    div.classList.add('menu-view-student')
    const name = document.createElement('p');
    const code = document.createElement('p');
    const carrier = document.createElement('p');
    const semester = document.createElement('p');
    name.classList.add('menu-view-student__name')
    code.classList.add('menu-view-student__name')
    carrier.classList.add('menu-view-student__name')
    semester.classList.add('menu-view-student__name')
    const textName = document.createTextNode(`Nombre: ${student.name}`);
    const textcode = document.createTextNode(`Codigo de Estudiante: ${student.code}`);
    const textCarrier = document.createTextNode(`Carrera: ${student.carrier}`);
    const textSemester = document.createTextNode(`Semestre: ${student.semester}`);

    const botonE = document.createElement('button');
    const botonD = document.createElement('button');
    botonE.classList.add('menu-view-student__edite');
    botonD.classList.add('menu-view-student__delete');
    const textE = document.createTextNode('Editar');
    const textD = document.createTextNode('Eliminar');
    botonE.appendChild(textE);
    botonD.appendChild(textD);

    name.appendChild(textName);
    code.appendChild(textcode);
    carrier.appendChild(textCarrier);
    semester.appendChild(textSemester);
    div.appendChild(name);
    div.appendChild(code);
    div.appendChild(carrier);
    div.appendChild(semester);
    div.appendChild(botonE);
    div.appendChild(botonD);
    studentsSection.appendChild(div);

    botonE.addEventListener('click', () => {
        const form = document.createElement('form');
        const inputName = document.createElement('input');
        const inputCode = document.createElement('input');
        const inputCarrier = document.createElement('input');
        const inputSemester = document.createElement('input');
        const submit = document.createElement('input');
        inputName.setAttribute('placeholder', "Nuevo Nombre");
        inputCode.setAttribute('placeholder', "Nuevo Codigo");
        inputCarrier.setAttribute('placeholder', "Nueva Carrera");
        inputSemester.setAttribute('placeholder', "Nuevo Semestre");
        submit.setAttribute('type', "submit");
        submit.setAttribute('value', "Editar estudiante");
        inputName.classList.add('inputEdit');
        inputCode.classList.add('inputEdit');
        inputCarrier.classList.add('inputEdit');
        inputSemester.classList.add('inputEdit');
        submit.classList.add('editButton')
        form.appendChild(inputName);
        form.appendChild(inputCode);
        form.appendChild(inputCarrier);
        form.appendChild(inputSemester);
        form.appendChild(submit);
        div.appendChild(form);
        form.addEventListener('submit', (e) => {
                student.name = inputName.value;
                student.code = inputCode.value;
                student.carrier = inputCarrier.value;
                student.semester = inputSemester.value;
                textName.textContent = `Nombre: ${inputName.value}`;
                textcode.textContent = `Codigo: ${inputCode.value}`;
                textCarrier.textContent = `Carrera: ${inputCarrier.value}`;
                textSemester.textContent = `Semestre: ${inputSemester.value}`;
                form.remove();
            
                e.preventDefault();
            
        })
    })
    botonD.addEventListener('click', () => {
        div.remove();
    })
}

async function changeTitle(type,role) {
    const title = document.querySelector('.main-title');
    const paragraph = document.querySelector('.paragraph');
    if(type === "login") {
        title.innerHTML = 'Ingrese sus datos de ingreso';
    paragraph.innerHTML = `Ingrese su usuario y contraseña para poder ingresar al apartado de ${role}`
    } else if (type === "administrador-menu") {
        title.innerHTML = 'Elija la opcion que desee administrar';
        paragraph.innerHTML = '';
    } else if (type === "menssageEdite") {
        title.innerHTML = 'Elija la opcion que desee realizar';
        paragraph.innerHTML = '';
    } else if (type === "menssageCreate") {
        title.innerHTML = `Bienvenido al apartado ${role}`;
        paragraph.innerHTML = '';
    } 
}

// funcions crud
function editeStudent() {
    location.hash = "administrador-estudiante";
    menuButtons.innerHTML = "";
    changeTitle('menssageCreate',"Estudiante");
    const form = document.createElement('form');
    const inputNombre = document.createElement('input');
    const inputContraseña = document.createElement('input');
    const inputCodigo = document.createElement('input');
    const inputCarrera = document.createElement('input');
    const inputSemestre = document.createElement('input');
    const inputMaterias = document.createElement('input');
    const submit = document.createElement('input');
    form.classList.add('forms');
    inputNombre.classList.add('input-primary');
    inputContraseña.classList.add('input-primary');
    inputCodigo.classList.add('input-primary');
    inputCarrera.classList.add('input-primary');
    inputSemestre.classList.add('input-primary');
    inputMaterias.classList.add('input-primary');
    submit.classList.add('buttons-primarys');
    submit.classList.add('submit-menu');
    inputNombre.setAttribute('type', "text");
    inputContraseña.setAttribute('type', "text");
    inputCodigo.setAttribute('type', "number");
    inputCarrera.setAttribute('type', "text");
    inputSemestre.setAttribute('type', "number");
    inputMaterias.setAttribute('type', "text");
    submit.setAttribute('type', "submit");
    submit.setAttribute('value', "Crear estudiante");

    inputNombre.setAttribute('placeholder', "Nombre");
    inputContraseña.setAttribute('placeholder', "Contraseña");
    inputCodigo.setAttribute('placeholder', "Codigo");
    inputCarrera.setAttribute('placeholder', "Carrera");
    inputSemestre.setAttribute('placeholder', "Semestre");
    inputMaterias.setAttribute('placeholder', "Materias");
    form.appendChild(inputNombre);
    form.appendChild(inputContraseña);
    form.appendChild(inputCodigo);
    form.appendChild(inputCarrera);
    form.appendChild(inputSemestre);
    form.appendChild(inputMaterias);
    form.appendChild(submit);
    menuButtons.appendChild(form);

    form.addEventListener('submit', (e) => {
        const student = new Student({
            name: inputNombre.value,
            password: inputContraseña.value,
            code: inputCodigo.value,
            carrier: inputCarrera.value,
            semester: inputSemestre.value,
            matters: [inputMaterias.value],
        })
        viewStudent(student);
        console.log({student});
        e.preventDefault();
        form.reset();
    })
    }

// apartado profesor 

function viewTeacher(teacher) {
    const div = document.createElement('div');
    div.classList.add('menu-view-student')
    const name = document.createElement('p');
    const code = document.createElement('p');
    const matters = document.createElement('p');
    name.classList.add('menu-view-student__name')
    code.classList.add('menu-view-student__name')
    matters.classList.add('menu-view-student__name')
    const textName = document.createTextNode(`Nombre: ${teacher.name}`);
    const textcode = document.createTextNode(`Codigo de Profesor: ${teacher.code}`);
    const textMatters = document.createTextNode(`Materia: ${teacher.matters}`);

    const botonE = document.createElement('button');
    const botonD = document.createElement('button');
    botonE.classList.add('menu-view-student__edite');
    botonD.classList.add('menu-view-student__delete');
    const textE = document.createTextNode('Editar');
    const textD = document.createTextNode('Eliminar');
    botonE.appendChild(textE);
    botonD.appendChild(textD);

    name.appendChild(textName);
    code.appendChild(textcode);
    matters.appendChild(textMatters);

    div.appendChild(name);
    div.appendChild(code);
    div.appendChild(matters);
    div.appendChild(botonE);
    div.appendChild(botonD);
    teachersSection.appendChild(div);
    botonE.addEventListener('click', () => {
        const form = document.createElement('form');
        const inputName = document.createElement('input');
        const inputCode = document.createElement('input');
        const inputMatters = document.createElement('input');
        const submit = document.createElement('input');
        inputName.setAttribute('placeholder', "Nuevo Nombre");
        inputCode.setAttribute('placeholder', "Nuevo Codigo");
        inputMatters.setAttribute('placeholder', "Nueva Materia");
        submit.setAttribute('type', "submit");
        submit.setAttribute('value', "Editar Profesor");
        inputName.classList.add('inputEdit');
        inputCode.classList.add('inputEdit');
        inputMatters.classList.add('inputEdit');
        submit.classList.add('editButton')
        form.appendChild(inputName);
        form.appendChild(inputCode);
        form.appendChild(inputMatters);
        form.appendChild(submit);
        div.appendChild(form);
        form.addEventListener('submit', (e) => {
                teacher.name = inputName.value;
                teacher.code = inputCode.value;
                teacher.matters = inputMatters.value;
                textName.textContent = `Nombre: ${inputName.value}`;
                textcode.textContent = `Codigo: ${inputCode.value}`;
                textMatters.textContent = `Materia: ${inputMatters.value}`;

                form.remove();
            
                e.preventDefault();
            
        })
    })
    botonD.addEventListener('click', () => {
        div.remove();
    })
}

// funcions crud
function editeTeacher() {
    location.hash = "administrador-profesor";
    menuButtons.innerHTML = "";
    changeTitle('menssageCreate',"Profesor");
    const form = document.createElement('form');
    const inputNombre = document.createElement('input');
    const inputContraseña = document.createElement('input');
    const inputCodigo = document.createElement('input');
    const inputMaterias = document.createElement('input');
    const submit = document.createElement('input');
    form.classList.add('forms');
    inputNombre.classList.add('input-primary');
    inputContraseña.classList.add('input-primary');
    inputCodigo.classList.add('input-primary');
    inputMaterias.classList.add('input-primary');
    submit.classList.add('buttons-primarys');
    submit.classList.add('submit-menu');
    inputNombre.setAttribute('type', "text");
    inputContraseña.setAttribute('type', "text");
    inputCodigo.setAttribute('type', "number");
    inputMaterias.setAttribute('type', "text");
    submit.setAttribute('type', "submit");
    submit.setAttribute('value', "Crear Profesor");

    inputNombre.setAttribute('placeholder', "Nombre");
    inputContraseña.setAttribute('placeholder', "Contraseña");
    inputCodigo.setAttribute('placeholder', "Codigo");
    inputMaterias.setAttribute('placeholder', "Materias");
    form.appendChild(inputNombre);
    form.appendChild(inputContraseña);
    form.appendChild(inputCodigo);
    form.appendChild(inputMaterias);
    form.appendChild(submit);
    menuButtons.appendChild(form);

    form.addEventListener('submit', (e) => {
        const teacher = new Teacher({
            name: inputNombre.value,
            password: inputContraseña.value,
            code: inputCodigo.value,
            matters: [inputMaterias.value],
        })
        viewTeacher(teacher);
        e.preventDefault();
        form.reset();
    })
    }


// matter section edit

function viewMatter(matter) {
    const div = document.createElement('div');
    div.classList.add('menu-view-student')
    const name = document.createElement('p');
    const code = document.createElement('p');
    const teacher = document.createElement('p');
    name.classList.add('menu-view-student__name')
    code.classList.add('menu-view-student__name')
    teacher.classList.add('menu-view-student__name')
    const textName = document.createTextNode(`Nombre de la Materia: ${matter.name}`);
    const textcode = document.createTextNode(`Codigo de Materia: ${matter.code}`);
    const textTeacher = document.createTextNode(`Profesor: ${matter.teacher}`);

    const botonE = document.createElement('button');
    const botonD = document.createElement('button');
    botonE.classList.add('menu-view-student__edite');
    botonD.classList.add('menu-view-student__delete');
    const textE = document.createTextNode('Editar');
    const textD = document.createTextNode('Eliminar');
    botonE.appendChild(textE);
    botonD.appendChild(textD);

    name.appendChild(textName);
    code.appendChild(textcode);
    teacher.appendChild(textTeacher);

    div.appendChild(name);
    div.appendChild(code);
    div.appendChild(teacher);
    div.appendChild(botonE);
    div.appendChild(botonD);
    mattersSection.appendChild(div);
    botonE.addEventListener('click', () => {
        const form = document.createElement('form');
        const inputName = document.createElement('input');
        const inputCode = document.createElement('input');
        const inputTeachers = document.createElement('input');
        const submit = document.createElement('input');
        inputName.setAttribute('placeholder', "Nuevo Nombre");
        inputCode.setAttribute('placeholder', "Nuevo Codigo");
        inputTeachers.setAttribute('placeholder', "Nuevo Profesor");
        submit.setAttribute('type', "submit");
        submit.setAttribute('value', "Editar Profesor");
        inputName.classList.add('inputEdit');
        inputCode.classList.add('inputEdit');
        inputTeachers.classList.add('inputEdit');
        submit.classList.add('editButton')
        form.appendChild(inputName);
        form.appendChild(inputCode);
        form.appendChild(inputTeachers);
        form.appendChild(submit);
        div.appendChild(form);
        form.addEventListener('submit', (e) => {
                teacher.name = inputName.value;
                teacher.code = inputCode.value;
                teacher.matters = inputTeachers.value;
                textName.textContent = `Nombre de la Materia: ${inputName.value}`;
                textcode.textContent = `Codigo de Materia: ${inputCode.value}`;
                textTeacher.textContent = `Profesor: ${inputTeachers.value}`;
                form.remove();
                e.preventDefault();
        })
    })
    botonD.addEventListener('click', () => {
        div.remove();
    })
}

// funcions crud
function editeMatter() {
    location.hash = "administrador-materia";
    menuButtons.innerHTML = "";
    changeTitle('menssageCreate',"Materias");
    const form = document.createElement('form');
    const inputNombre = document.createElement('input');
    const inputCodigo = document.createElement('input');
    const inputProfesor = document.createElement('input');
    const submit = document.createElement('input');
    form.classList.add('forms');
    inputNombre.classList.add('input-primary');
    inputCodigo.classList.add('input-primary');
    inputProfesor.classList.add('input-primary');
    submit.classList.add('buttons-primarys');
    submit.classList.add('submit-menu');
    inputNombre.setAttribute('type', "text");
    inputCodigo.setAttribute('type', "number");
    inputProfesor.setAttribute('type', "text");
    submit.setAttribute('type', "submit");
    submit.setAttribute('value', "Crear Materia");

    inputNombre.setAttribute('placeholder', "Nombre");
    inputCodigo.setAttribute('placeholder', "Codigo");
    inputProfesor.setAttribute('placeholder', "Profesor de Materia");
    form.appendChild(inputNombre);
    form.appendChild(inputCodigo);
    form.appendChild(inputProfesor);
    form.appendChild(submit);
    menuButtons.appendChild(form);

    form.addEventListener('submit', (e) => {
        const matter = new Matter({
            name: inputNombre.value,
            code: inputCodigo.value,
            teacher: inputProfesor.value,
        })
        viewMatter(matter);
        e.preventDefault();
        form.reset();
    })
    }

// menu seleccion edicion

function administradorMenuButtons() {
    menuButtons.innerHTML = "";
    //crear botones
    const studentButton = document.createElement('button');
    const teacherButton = document.createElement('button');
    const matterButton = document.createElement('button');
    //añadirles clases
    studentButton.classList.add('buttons-primarys');
    studentButton.classList.add('buttons-admin__student');
    teacherButton.classList.add('buttons-primarys');
    teacherButton.classList.add('buttons-admin__teacher');
    matterButton.classList.add('buttons-primarys');
    matterButton.classList.add('buttons-admin__matter');
    //crear textos de botones
    const studentText = document.createTextNode('Estudiante');
    const teacherText = document.createTextNode('Profesor');
    const matterText = document.createTextNode('Materia');
    //añadir texto a los botones
    studentButton.appendChild(studentText);
    teacherButton.appendChild(teacherText);
    matterButton.appendChild(matterText);

    menuButtons.appendChild(studentButton);
    menuButtons.appendChild(teacherButton);
    menuButtons.appendChild(matterButton);

    studentButton.addEventListener('click', () => {
        // location.hash = "administrador-estudiante";
        editeStudent();
    })
    teacherButton.addEventListener('click', () => {
        editeTeacher();
    })
    matterButton.addEventListener('click', () => {
        editeMatter();
    })
}

