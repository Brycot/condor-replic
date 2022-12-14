const studentsArray = [];
const teachersArray = [];
const mattersArray = [];
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
        type = 'student',
    }) {
        this.name = name;
        this.password = password;
        this.code = code;
        this.carrier = carrier;
        this.semester = semester;
        this.matters = matters;
        this.type = type;
    }
}
class Teacher {
    constructor({
        name,
        password,
        code,
        matters = [],
        type = 'teacher',
    }) {
        this.name = name;
        this.password = password;
        this.code = code;
        this.matters = matters;
        this.type = type;
    }
}
class Matter {
    constructor({
        name,
        code,
        notes = [0, 0, 0, 0, 0, 0],
    }) {
        this.name = name;
        this.code = code;
        this.notes = notes;
        this.average = notes.reduce((a,b)=>a+b);
    }
}
 //materias
 const algebra = new Matter({name: "Algebra Lineal", code: 1});
 const calculo = new Matter({name: "Calculo Diferencial", code: 2});
 mattersArray.push(algebra);
 mattersArray.push(calculo);
// //admin
const administrador = new Administrator({
    user: "admin",
    password: "admin",
});
// //teachers

// //students

//show alert for all accions
function showAlert(message, type) {
    const container = document.querySelector('.alert-container');
    const alert = document.createElement('div');
    alert.className = `alert-message-${type}`;
    alert.innerHTML = `
    <div class="alert-message">
    ${message}
    </div>
    `
    container.appendChild(alert)
    setTimeout(() => {
        alert.remove();
    }, 1000);
};

let actualUser = {};
let actualMatter = '';

function validationLoginTeacher(code, password) {
    const codeFind = teachersArray.find((element) => element.code == code);
    
    if(!codeFind) {
        console.log('error');
    } else {
        let userpassword = codeFind.password === password;
        if(!userpassword) {
            console.log('contrase??a equivocada');
            return false
        } else {
            actualUser = {...codeFind};
            actualMatter = codeFind.matters
            return true
        }
    }
}
function validationLoginStudent(code, password) {
    const codeFind = studentsArray.find((element) => element.code == code);
    
    if(!codeFind) {
        console.error('error');
    } else {
        let userpassword = codeFind.password === password;
        if(!userpassword) {
            console.log('contrase??a equivocada');
            return false
        } else {
            actualUser = {...codeFind};
            return true
        }
    }
}

let userPerMatterActual = [];
document.getElementById('login-form')
    .addEventListener('submit', (e) => {
        const inputCode = document.getElementById('user').value;
        const inputPassword = document.getElementById('password').value;
        if(inputCode === administrador.user && inputPassword === administrador.password) {
            console.log('bienvenido');
            location.hash = "administrador-menu";
        } else if (validationLoginTeacher(inputCode, inputPassword)) {
            userPerMatterActual = [];
            console.log('Bienvenido profesor');
            location.hash = "profesor-menu";
            studentsArray.forEach((student) => {
                const element = student.matters.find((a)=>a.name === actualMatter[0]);
                if(element) {
                userPerMatterActual.push(student);
                }
                });
                console.log(userPerMatterActual);
        } else if (validationLoginStudent(inputCode, inputPassword)) {
            console.log('Bienvenido estudiante');
            location.hash = "estudiante-menu";
        }

        document.getElementById('login-form').reset();
        e.preventDefault();
    });



function viewStudent() {
    studentsSection.innerHTML = '';
    studentsArray.forEach((student) => {
        const div = document.createElement('div');
        div.classList.add('menu-view-student')
        const name = document.createElement('p');
        const code = document.createElement('p');
        const carrier = document.createElement('p');
        const semester = document.createElement('p');
        const matter = document.createElement('p');
        name.classList.add('menu-view-student__name')
        code.classList.add('menu-view-student__name')
        carrier.classList.add('menu-view-student__name')
        semester.classList.add('menu-view-student__name')
        matter.classList.add('menu-view-student__name')
        const textName = document.createTextNode(`Nombre: ${student.name}`);
        const textcode = document.createTextNode(`Codigo de Estudiante: ${student.code}`);
        const textCarrier = document.createTextNode(`Carrera: ${student.carrier}`);
        const textSemester = document.createTextNode(`Semestre: ${student.semester}`);
        const materias = student.matters.map((a)=>a.name).join();
        const textMatter = document.createTextNode(`Materias: ${materias}`)
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
        matter.appendChild(textMatter);
        div.appendChild(name);
        div.appendChild(code);
        div.appendChild(carrier);
        div.appendChild(semester);
        div.appendChild(matter);
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
            inputName.setAttribute('value', `${student.name}`);
            inputCode.setAttribute('placeholder', "Nuevo Codigo");
            inputCode.setAttribute('value', `${student.code}`);
            inputCarrier.setAttribute('placeholder', "Nueva Carrera");
            inputCarrier.setAttribute('value', `${student.carrier}`);
            inputSemester.setAttribute('placeholder', "Nuevo Semestre");
            inputSemester.setAttribute('value', `${student.semester}`);
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
            const index = studentsArray.findIndex((element) => element.code === student.code);
            studentsArray.splice(index, 1)
            showAlert('Estudiante Eliminado Satisfactoriamente', 'info');
            div.remove();
        });
    });
}

async function changeTitle(type,role) {
    const title = document.querySelector('.main-title');
    const paragraph = document.querySelector('.paragraph');
    if(type === "login") {
        title.innerHTML = 'Ingrese sus datos de ingreso';
    paragraph.innerHTML = `Ingrese su usuario y contrase??a para poder ingresar al apartado de ${role}`
    } else if (type === "administrador-menu") {
        title.innerHTML = 'Elija la opcion que desee administrar';
        paragraph.innerHTML = '';
    } else if (type === "menssageEdite") {
        title.innerHTML = 'Elija la opcion que desee realizar';
        paragraph.innerHTML = '';
    } else if (type === "menssageCreate") {
        title.innerHTML = `Bienvenido al apartado ${role}`;
        paragraph.innerHTML = '';
    } else if (type === "profesor-menu") {
        title.innerHTML = `Bienvenido al apartado ${role}`;
        paragraph.innerHTML = 'Aqui prodra asignar, editar o eliminar notas para cada estudiante de su materia';
    } else if (type === 'estudiante-menu') {
        title.innerHTML = `Bienvenido al apartado ${role}`;
        paragraph.innerHTML = 'Aqui prodra consultar sus notas';
    }
}

// funcions crud
function editeStudent() {
    location.hash = "administrador-estudiante";
    menuButtons.innerHTML = "";
    changeTitle('menssageCreate',"Estudiante");
    const form = document.createElement('form');
    const inputNombre = document.createElement('input');
    const inputContrase??a = document.createElement('input');
    const inputCodigo = document.createElement('input');
    const inputCarrera = document.createElement('input');
    const inputSemestre = document.createElement('input');
    const inputMaterias = document.createElement('select');
    const submit = document.createElement('input');
    form.classList.add('forms');
    inputNombre.classList.add('input-primary');
    inputContrase??a.classList.add('input-primary');
    inputCodigo.classList.add('input-primary');
    inputCarrera.classList.add('input-primary');
    inputSemestre.classList.add('input-primary');
    inputMaterias.classList.add('input-primary');
    submit.classList.add('buttons-primarys');
    submit.classList.add('submit-menu');
    inputNombre.setAttribute('type', "text");
    inputContrase??a.setAttribute('type', "text");
    inputCodigo.setAttribute('type', "number");
    inputCarrera.setAttribute('type', "text");
    inputSemestre.setAttribute('type', "number");
    inputMaterias.setAttribute('multiple', "");
    submit.setAttribute('type', "submit");
    submit.setAttribute('value', "Crear estudiante");
    mattersArray.forEach((matter) => {
        const option = document.createElement('option');
        const textOption = document.createTextNode(matter.name);
        option.setAttribute('value', `${matter.name}`);
        option.classList.add('option-list')
        option.appendChild(textOption);
        inputMaterias.appendChild(option);
    });
    inputNombre.setAttribute('placeholder', "Nombre");
    inputContrase??a.setAttribute('placeholder', "Contrase??a");
    inputCodigo.setAttribute('placeholder', "Codigo");
    inputCarrera.setAttribute('placeholder', "Carrera");
    inputSemestre.setAttribute('placeholder', "Semestre");
    form.appendChild(inputNombre);
    form.appendChild(inputContrase??a);
    form.appendChild(inputCodigo);
    form.appendChild(inputCarrera);
    form.appendChild(inputSemestre);
    form.appendChild(inputMaterias);
    form.appendChild(submit);
    menuButtons.appendChild(form);
    function uniqueCode(code) {
        const codeFind = studentsArray.find(student => student.code == code);
        if(codeFind !== undefined) {
            return true
        } else {
            return false
        };
    }
    form.addEventListener('submit', (e) => {
        if(inputNombre.value === '' || inputCodigo.value === '' || inputContrase??a.value === '' || inputCodigo.value === '' ||  inputCarrera.value === '' ||  inputSemestre.value === '') {
            showAlert('Rellene todos los Datos', 'fail');
        } else {
        if(uniqueCode(inputCodigo.value) === true) {
            showAlert('El codigo ya esta registrado', 'fail');
        } else {
            const materiasOutpot = [];
            const obtenerNombre = [...inputMaterias.selectedOptions]
                .map(option => 
                    option.value);
            const materiasEstudiante = [obtenerNombre.forEach((nombre) => {
                const codeFind = mattersArray.find(matter => 
                    matter.name == nombre);
                        const materia = new Matter({name: nombre, code: codeFind.code});
                        materiasOutpot.push(materia);
                    })];
            const student = new Student({
                    name: inputNombre.value,
                    password: inputContrase??a.value,
                    code: inputCodigo.value,
                    carrier: inputCarrera.value,
                    semester: inputSemestre.value,
                    matters: materiasOutpot,
                })
                    studentsArray.push(student)
                    console.log(obtenerNombre);
                    console.log(materiasOutpot);
                    console.log(student);
                    viewStudent();
                    showAlert('Estudiante Creado Satisfactoriamente', 'success');
                    e.preventDefault();
                    form.reset();
        }
    }})
}


// apartado profesor 

function viewTeacher() {
    teachersSection.innerHTML = '';
    teachersArray.forEach((teacher) => {
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
        const inputMatters = document.createElement('select');
        const submit = document.createElement('input');
        inputName.setAttribute('placeholder', "Nuevo Nombre");
        inputName.setAttribute('value', `${teacher.name}`);
        inputCode.setAttribute('placeholder', "Nuevo Codigo");
        inputCode.setAttribute('value', `${teacher.code}`);
        inputMatters.setAttribute('placeholder', "Nueva Materia");
        submit.setAttribute('type', "submit");
        submit.setAttribute('value', "Editar Profesor");
        mattersArray.forEach((matter) => {
            const option = document.createElement('option');
            const textOption = document.createTextNode(matter.name);
            option.setAttribute('value', `${matter.name}`);
            option.classList.add('option-list')
            option.appendChild(textOption);
            inputMatters.appendChild(option);
        })
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
        const index = teachersArray.findIndex((element) => element.code === teacher.code);
        teachersArray.splice(index, 1)
        showAlert('Profesor Eliminado Satisfactoriamente', 'info');
        div.remove();
    })
    })
}

// funcions crud
function editeTeacher() {
    location.hash = "administrador-profesor";
    menuButtons.innerHTML = "";
    changeTitle('menssageCreate',"Profesor");
    const form = document.createElement('form');
    const inputNombre = document.createElement('input');
    const inputContrase??a = document.createElement('input');
    const inputCodigo = document.createElement('input');
    const inputMaterias = document.createElement('select');
    inputMaterias.innerHTML = '';
    const submit = document.createElement('input');
    form.classList.add('forms');
    inputNombre.classList.add('input-primary');
    inputContrase??a.classList.add('input-primary');
    inputCodigo.classList.add('input-primary');
    inputMaterias.classList.add('input-primary');
    submit.classList.add('buttons-primarys');
    submit.classList.add('submit-menu');
    inputNombre.setAttribute('type', "text");
    inputContrase??a.setAttribute('type', "text");
    inputCodigo.setAttribute('type', "number");
    submit.setAttribute('type', "submit");
    submit.setAttribute('value', "Crear Profesor");
    mattersArray.forEach((matter) => {
        const option = document.createElement('option');
        const textOption = document.createTextNode(matter.name);
        option.setAttribute('value', `${matter.name}`);
        option.classList.add('option-list')
        option.appendChild(textOption);
        inputMaterias.appendChild(option);
    })
    inputNombre.setAttribute('placeholder', "Nombre");
    inputContrase??a.setAttribute('placeholder', "Contrase??a");
    inputCodigo.setAttribute('placeholder', "Codigo");
    inputMaterias.setAttribute('placeholder', "Materia");
    form.appendChild(inputNombre);
    form.appendChild(inputContrase??a);
    form.appendChild(inputCodigo);
    form.appendChild(inputMaterias);
    form.appendChild(submit);
    menuButtons.appendChild(form);
    function uniqueCode(code) {
        const codeFind = teachersArray.find(teacher => teacher.code == code);
        if(codeFind !== undefined) {
            return true
        } else {
            return false
        }};
    form.addEventListener('submit', (e) => {
        if(inputNombre.value === '' || inputCodigo.value === '' || inputContrase??a.value === '') {
            showAlert('Rellene todos los Datos', 'fail');
        } else {
            if(uniqueCode(inputCodigo.value) === true) {
                showAlert('El codigo ya esta registrado', 'fail');
            } else {
                const teacher = new Teacher({
                    name: inputNombre.value,
                    password: inputContrase??a.value,
                    code: inputCodigo.value,
                    matters: [inputMaterias.value],
                })
                teachersArray.push(teacher);
                viewTeacher();
                showAlert('Profesor Creado Satisfactoriamente', 'success');
            }
        }
        
        e.preventDefault();
        form.reset();
    })
}


// matter section edit

function viewMatter() {
    mattersSection.innerHTML = '';
    mattersArray.forEach((matter) => {
        const div = document.createElement('div');
        div.classList.add('menu-view-student')
        const name = document.createElement('p');
        const code = document.createElement('p');
        name.classList.add('menu-view-student__name');
        code.classList.add('menu-view-student__name');
        const textName = document.createTextNode(`Nombre de la Materia: ${matter.name}`);
        const textcode = document.createTextNode(`Codigo de Materia: ${matter.code}`);
    
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
    
        div.appendChild(name);
        div.appendChild(code);
        div.appendChild(botonE);
        div.appendChild(botonD);
        mattersSection.appendChild(div);
        botonE.addEventListener('click', () => {
            const form = document.createElement('form');
            const inputName = document.createElement('input');
            const inputCode = document.createElement('input');
            const submit = document.createElement('input');
            inputName.setAttribute('placeholder', "Nuevo Nombre");
            inputName.setAttribute('value', `${matter.name}`);
            inputCode.setAttribute('placeholder', "Nuevo Codigo");
            inputCode.setAttribute('value', `${matter.code}`);
            submit.setAttribute('type', "submit");
            submit.setAttribute('value', "Editar Profesor");
            inputName.classList.add('inputEdit');
            inputCode.classList.add('inputEdit');
            submit.classList.add('editButton')
            form.appendChild(inputName);
            form.appendChild(inputCode)
            form.appendChild(submit);
            div.appendChild(form);
            form.addEventListener('submit', (e) => {
                    matter.name = inputName.value;
                    matter.code = inputCode.value;
                    textName.textContent = `Nombre de la Materia: ${inputName.value}`;
                    textcode.textContent = `Codigo de Materia: ${inputCode.value}`;
                    form.remove();
                    e.preventDefault();
            })
        })
        botonD.addEventListener('click', () => {
            const index = mattersArray.findIndex((element) => element.code === matter.code);
            mattersArray.splice(index, 1)
            div.remove();
            showAlert('Materia Eliminada Satisfactoriamente', 'info');
        })
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
    const submit = document.createElement('input');
    form.classList.add('forms');
    inputNombre.classList.add('input-primary');
    inputCodigo.classList.add('input-primary');
    submit.classList.add('buttons-primarys');
    submit.classList.add('submit-menu');
    inputNombre.setAttribute('type', "text");
    inputCodigo.setAttribute('type', "number");
    submit.setAttribute('type', "submit");
    submit.setAttribute('value', "Crear Materia");

    inputNombre.setAttribute('placeholder', "Nombre");
    inputCodigo.setAttribute('placeholder', "Codigo");
    form.appendChild(inputNombre);
    form.appendChild(inputCodigo);
    form.appendChild(submit);
    menuButtons.appendChild(form);
    function uniqueCode(code) {
        const codeFind = mattersArray.find(matter => matter.code == code);
        if(codeFind !== undefined) {
            return true
        } else {
            return false
        }};
    form.addEventListener('submit', (e) => {
        if(inputNombre.value === '' || inputCodigo.value === '') {
            showAlert('Rellene todos los Datos', 'fail');
        } else {
            if(uniqueCode(inputCodigo.value) === true) {
                showAlert('El codigo ya esta registrado', 'fail');
            } else {
                const matter = new Matter({
                    name: inputNombre.value,
                    code: inputCodigo.value,
                })
                showAlert('Materia Creada Satisfactoriamente', 'success');
                mattersArray.push(matter) 
                viewMatter(matter);
            }
        }
        e.preventDefault();
        form.reset();
        console.log(mattersArray);
    })
    }

// menu seleccion edicion

function administradorMenuButtons() {
    menuButtons.innerHTML = "";
    //crear botones
    const studentButton = document.createElement('button');
    const teacherButton = document.createElement('button');
    const matterButton = document.createElement('button');
    //a??adirles clases
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
    //a??adir texto a los botones
    studentButton.appendChild(studentText);
    teacherButton.appendChild(teacherText);
    matterButton.appendChild(matterText);

    menuButtons.appendChild(studentButton);
    menuButtons.appendChild(teacherButton);
    menuButtons.appendChild(matterButton);

    studentButton.addEventListener('click', () => {
        // location.hash = "administrador-estudiante";
        editeStudent();
        viewStudent();
    })
    teacherButton.addEventListener('click', () => {
        editeTeacher();
        viewTeacher();
    })
    matterButton.addEventListener('click', () => {
        editeMatter();
        viewMatter();
    })
}
function profesorMenuButtons() {
    menuButtons.innerHTML = "";
    userPerMatterActual.forEach((student) => {
        const div = document.createElement('div');
        div.classList.add('menu-view-student')
        const name = document.createElement('p');
        const code = document.createElement('p');
        const carrier = document.createElement('p');
        const semester = document.createElement('p');
        const notes = document.createElement('p');
        name.classList.add('menu-view-student__name')
        code.classList.add('menu-view-student__name')
        carrier.classList.add('menu-view-student__name')
        semester.classList.add('menu-view-student__name')
        notes.classList.add('menu-view-student__name')
        const textName = document.createTextNode(`Nombre: ${student.name}`);
        const textcode = document.createTextNode(`Codigo de Estudiante: ${student.code}`);
        const textCarrier = document.createTextNode(`Carrera: ${student.carrier}`);
        const textSemester = document.createTextNode(`Semestre: ${student.semester}`);
        let matterActual = []
        const materia = student.matters.map((matter)=> {
            const value = matter.name == actualUser.matters;
            if(value) {
                matterActual.push(matter);
            }
        })
        console.group();
        console.log(student);
        console.log(matterActual);
        const indexMateria = student.matters.findIndex((a)=>a.code == matterActual[0].code);
        console.log(indexMateria);
        console.groupEnd();
        const notas = student.matters[indexMateria].notes.join('-');
        const textNotes = document.createTextNode(`Notas: ${notas}`)
        const botonE = document.createElement('button');
        botonE.classList.add('menu-view-teacher__edite-notes');
        const textE = document.createTextNode('Editar Notas');
        botonE.appendChild(textE);
        
        name.appendChild(textName);
        code.appendChild(textcode);
        carrier.appendChild(textCarrier);
        semester.appendChild(textSemester);
        notes.appendChild(textNotes);
        div.appendChild(name);
        div.appendChild(code);
        div.appendChild(carrier);
        div.appendChild(semester);
        div.appendChild(notes);
        div.appendChild(botonE);
        menuButtons.appendChild(div);

        botonE.addEventListener('click', () => {
            const sectionBackground = document.createElement('section');
            sectionBackground.classList.add('edit-notes-background-container');
            const container = document.createElement('div');
            container.classList.add('edit-notes-container');
            //titulo
            const title = document.createElement('h2');
            title.classList.add('edit-notes-title');
            const titleText = document.createTextNode(`Editar Notas para ${student.name}`);
            title.appendChild(titleText);
            //promedio
            const notesForAverage = student.matters[indexMateria].notes;
            const sumNotes = notesForAverage.reduce((a,b)=> a+b);
            const averageCount = Math.trunc(sumNotes / 6);
            student.matters[indexMateria].average = averageCount;
            const titleAverage = document.createElement('p');
            titleAverage.classList.add('edit-notes-para');
            titleAverage.innerHTML = 'El promedio del estudiante es: '
            const containerAverage = document.createElement('div');
            containerAverage.classList.add('edit-notes-average-container');
                const average = document.createElement('p');
                const averageNum = document.createTextNode(averageCount);
                average.appendChild(averageNum);
                average.classList.add('edit-notes-average');

                const result = document.createElement('p');
                let resultNum;
                
                if(averageCount < 30) {
                    result.classList.add('edit-notes-result-reproved');
                    resultNum = document.createTextNode('Reprobado');
                } else {
                    resultNum = document.createTextNode('Aprobado');
                    result.classList.add('edit-notes-result-aproved');
                }
                result.appendChild(resultNum);
                containerAverage.appendChild(average);
                containerAverage.appendChild(result);
            //notas
            const titleNotes = document.createElement('p');
            titleNotes.classList.add('edit-notes-para');
            titleNotes.innerText = 'Las notas del estudiante son: ';
            //form-notas
            const form = document.createElement('form');
            form.classList.add('edit-notes-form');
            const inputs = document.createElement('div');
            inputs.classList.add('edit-notes-form-inputs');
            const noteOne = document.createElement('input');
            const noteTwo = document.createElement('input');
            const noteTree = document.createElement('input');
            const noteFour = document.createElement('input');
            const noteFive = document.createElement('input');
            const noteSix = document.createElement('input');
            const submit = document.createElement('input');
            noteOne.setAttribute('type', 'number');
            noteOne.setAttribute('value', `${matterActual[0].notes[0]}`);
            noteTwo.setAttribute('type', 'number');
            noteTwo.setAttribute('value', `${matterActual[0].notes[1]}`);
            noteTree.setAttribute('type', 'number');
            noteTree.setAttribute('value', `${matterActual[0].notes[2]}`);
            noteFour.setAttribute('type', 'number');
            noteFour.setAttribute('value', `${matterActual[0].notes[3]}`);
            noteFive.setAttribute('type', 'number');
            noteFive.setAttribute('value', `${matterActual[0].notes[4]}`);
            noteSix.setAttribute('type', 'number');
            noteSix.setAttribute('value', `${matterActual[0].notes[5]}`);
            submit.setAttribute('type', 'submit');
            submit.setAttribute('value', 'GUARDAR NOTAS');
            noteOne.classList.add('edit-notes-input');
            noteTwo.classList.add('edit-notes-input');
            noteTree.classList.add('edit-notes-input');
            noteFour.classList.add('edit-notes-input');
            noteFive.classList.add('edit-notes-input');
            noteSix.classList.add('edit-notes-input');
            submit.classList.add('edit-notes-submit');
            inputs.appendChild(noteOne);
            inputs.appendChild(noteTwo);
            inputs.appendChild(noteTree);
            inputs.appendChild(noteFour);
            inputs.appendChild(noteFive);
            inputs.appendChild(noteSix);
            form.appendChild(inputs);
            form.appendChild(submit);

            container.appendChild(title);
            container.appendChild(titleAverage);
            container.appendChild(containerAverage);
            container.appendChild(titleNotes);
            container.appendChild(form)
            sectionBackground.appendChild(container);
            todoElMain.appendChild(sectionBackground);
            form.addEventListener('submit', (e) => {
                student.matters[indexMateria].notes[0] = parseInt(noteOne.value);
                student.matters[indexMateria].notes[1] = parseInt(noteTwo.value);
                student.matters[indexMateria].notes[2] = parseInt(noteTree.value);
                student.matters[indexMateria].notes[3] = parseInt(noteFour.value);
                student.matters[indexMateria].notes[4] = parseInt(noteFive.value);
                student.matters[indexMateria].notes[5] = parseInt(noteSix.value);
                console.log(student);
                profesorMenuButtons();
                sectionBackground.remove();
                e.preventDefault();
            })
        })
    })
}

function studentViewNotes() {
    menuButtons.innerHTML = "";
        const div = document.createElement('div');
        div.classList.add('menu-view-student')
        const name = document.createElement('p');
        const code = document.createElement('p');
        const carrier = document.createElement('p');
        const semester = document.createElement('p');
        const notes = document.createElement('p');
        name.classList.add('menu-view-student__name');
        code.classList.add('menu-view-student__name');
        carrier.classList.add('menu-view-student__name');
        semester.classList.add('menu-view-student__name');
        notes.classList.add('menu-view-student__name');
        const textName = document.createTextNode(`Nombre: ${actualUser.name}`);
        const textcode = document.createTextNode(`Codigo de Estudiante: ${actualUser.code}`);
        const textCarrier = document.createTextNode(`Carrera: ${actualUser.carrier}`);
        const textSemester = document.createTextNode(`Semestre: ${actualUser.semester}`);
        const mattersdiv = document.createElement('div');
        actualUser.matters.forEach((matter)=>{
            const div = document.createElement('div');
            const matterName = document.createElement('p');
            const nameText = document.createTextNode(`${matter.name}`);
            const notas = document.createElement('p');
            const notasText = document.createTextNode(`Notas: ${matter.notes.join('-')}`);
            const average = document.createElement('p');
            const averageText = document.createTextNode(`Promedio Final: ${matter.average}`);
            const result = document.createElement('p');
            let resultNum;
            if(matter.average < 30) {
                result.classList.add('edit-notes-result-reproved');
                resultNum = document.createTextNode('Reprobado');
            } else {
                resultNum = document.createTextNode('Aprobado');
                result.classList.add('edit-notes-result-aproved');
            }
            result.appendChild(resultNum);
            matterName.appendChild(nameText);
            notas.appendChild(notasText);
            average.appendChild(averageText);
            div.appendChild(matterName);
            div.appendChild(notas);
            div.appendChild(average);
            div.appendChild(result);
            mattersdiv.appendChild(div)
            div.classList.add('notes-matters-final')
            matterName.classList.add('menu-view-student__name');
            notas.classList.add('menu-view-student__name');
            average.classList.add('menu-view-student__name');
        })
        name.appendChild(textName);
        code.appendChild(textcode);
        carrier.appendChild(textCarrier);
        semester.appendChild(textSemester);
        div.appendChild(name);
        div.appendChild(code);
        div.appendChild(carrier);
        div.appendChild(semester);
        div.appendChild(mattersdiv);
        menuButtons.appendChild(div);
}

