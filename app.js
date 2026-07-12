/* ===== DATABASE SIMULATION ===== */
const DB = {
    users: [],
    questions: [],
    careers: [],
    universities: [],
    senecytScores: [],
    testResults: [],
    accessLogs: [],
    recoveryTokens: []
};

/* ===== SEED DATA ===== */
function seedData() {
    // Admin user
    DB.users.push({
        id: 1, name: 'Administrador', email: 'admin@orientau.com',
        password: 'admin123', role: 'admin', createdAt: new Date().toISOString()
    });
    DB.users.push({
        id: 2, name: 'María López', email: 'orientador@orientau.com',
        password: 'orient123', role: 'counselor', createdAt: new Date().toISOString()
    });
    DB.users.push({
        id: 3, name: 'Carlos Pérez', email: 'carlos@correo.com',
        password: 'carlos123', role: 'postulante', createdAt: new Date().toISOString()
    });

    // Questions - Verbal
    const verbalQuestions = [
        { q: '¿Cuál es el sinónimo de "Efímero"?', options: ['Duradero', 'Breve', 'Permanente', 'Eterno'], answer: 1 },
        { q: 'Complete la analogía: Libro : Lectura :: Cuchillo : ?', options: ['Cocina', 'Cortar', 'Filoso', 'Metal'], answer: 1 },
        { q: '¿Cuál palabra completa: "El_____del proyecto sorprendió a todos"?', options: ['Resultado', 'Resultando', 'Resultar', 'Resultante'], answer: 0 },
        { q: '¿Cuál es el antónimo de "Generoso"?', options: ['Amable', 'Parco', 'Amplio', 'Noble'], answer: 1 },
        { q: 'Identifique el sinónimo de "Precario":', options: ['Estable', 'Frágil', 'Sólido', 'Seguro'], answer: 1 },
        { q: '"Aprehender" significa:', options: ['Entender', 'Tocar', 'Correr', 'Dormir'], answer: 0 },
        { q: '¿Cuál es el significado de "Ubicuo"?', options: ['Exclusivo', 'Presente en todas partes', 'Oculto', 'Distante'], answer: 1 },
        { q: 'La palabra "Acervado" se refiere a:', options: ['Escaso', 'Amontonado', 'Limpio', 'Rápido'], answer: 1 },
        { q: 'Sinónimo de "Conciso":', options: ['Largo', 'Breve', 'Amplio', 'Vago'], answer: 1 },
        { q: '"Ineludible" significa:', options: ['Opcional', 'Evitable', 'Imprescindible', 'Irrelevante'], answer: 2 }
    ];

    const numericaQuestions = [
        { q: '¿Cuánto es 47 + 38?', options: ['75', '85', '84', '95'], answer: 1 },
        { q: 'Si un artículo cuesta $150 con 20% de descuento, ¿cuánto pagas?', options: ['$110', '$130', '$120', '$125'], answer: 2 },
        { q: '¿Cuál es el 15% de 240?', options: ['30', '36', '40', '32'], answer: 1 },
        { q: 'Completa la serie: 2, 6, 18, 54, ?', options: ['108', '162', '144', '72'], answer: 1 },
        { q: 'Si 3x + 7 = 22, ¿cuánto vale x?', options: ['3', '5', '4', '6'], answer: 1 },
        { q: '¿Cuánto es 144 ÷ 12?', options: ['14', '11', '13', '12'], answer: 3 },
        { q: 'Un auto viaja 240 km en 3 horas. ¿Cuál es su velocidad promedio?', options: ['70 km/h', '90 km/h', '80 km/h', '85 km/h'], answer: 2 },
        { q: '¿Cuál es la raíz cuadrada de 196?', options: ['12', '16', '13', '14'], answer: 3 },
        { q: 'Si el doble de un número es 34, ¿cuál es el número?', options: ['17', '18', '16', '15'], answer: 0 },
        { q: '¿Cuánto es 25 × 25?', options: ['600', '625', '650', '575'], answer: 1 }
    ];

    const logicaQuestions = [
        { q: 'Si todos los A son B, y todos los B son C, entonces:', options: ['Algunos A son C', 'Todos los A son C', 'Algunos C son A', 'Ninguna'], answer: 1 },
        { q: '¿Qué sigue en la secuencia? △, □, ○, △, □, ?', options: ['△', '□', '○', '☆'], answer: 2 },
        { q: 'Si "Marte" es a "Planeta" como "Luna" es a:', options: ['Sol', 'Satélite', 'Estrella', 'Asteroide'], answer: 1 },
        { q: 'Encuentre el patrón: 1, 1, 2, 3, 5, 8, ?', options: ['10', '12', '11', '13'], answer: 3 },
        { q: 'Si P → Q es verdadero y Q es falso, ¿qué se puede concluir?', options: ['P es verdadero', 'P es falso', 'No se puede determinar', 'Q es verdadero'], answer: 1 },
        { q: '¿Cuántos triángulos hay en una figura con 4 triángulos pequeños formando uno grande?', options: ['4', '5', '6', '8'], answer: 1 },
        { q: 'En un grupo de 20 personas, si 12 son hombres y 5 son profesores hombre, ¿cuántas mujeres NO son profesoras?', options: ['No se puede saber', '8', '5', '3'], answer: 0 },
        { q: '¿Qué figura completa el patrón? ⬡, ⬡, ⬢, ⬡, ⬡, ?', options: ['⬡', '⬢', '⬠', '△'], answer: 1 },
        { q: 'Si ayer fue martes, ¿qué día será dentro de 3 días?', options: ['Viernes', 'Sábado', 'Jueves', 'Lunes'], answer: 2 },
        { q: '¿Cuál es la siguiente figura lógica? ◇, ○, □, ◇, ○, ?', options: ['◇', '○', '□', '△'], answer: 2 }
    ];

    const memoriaQuestions = [
        { q: 'Observe la secuencia por 10 segundos. ¿Cuál fue el tercer número? Secuencia: 7, 3, 9, 1, 5', options: ['3', '9', '1', '7'], answer: 1 },
        { q: 'Recuerde las palabras: "Casa, Perro, Árbol, Sol, Lago". ¿Cuál era la cuarta palabra?', options: ['Árbol', 'Sol', 'Lago', 'Perro'], answer: 1 },
        { q: '¿Cuántos cuadrados había en la imagen mostrada por 5 segundos? (5 cuadrados)', options: ['3', '4', '5', '6'], answer: 2 },
        { q: '¿Cuál era la segunda letra de la secuencia: A, M, T, R, B?', options: ['A', 'M', 'T', 'R'], answer: 1 },
        { q: 'Recuerde los colores: Rojo, Azul, Verde, Amarillo. ¿Cuál era el último?', options: ['Rojo', 'Azul', 'Verde', 'Amarillo'], answer: 3 },
        { q: '¿Cuál número faltaba? 10, 20, __, 40, 50', options: ['25', '30', '35', '20'], answer: 1 },
        { q: 'En la secuencia ABCDE, ¿cuál era la letra en posición 3?', options: ['B', 'C', 'D', 'A'], answer: 1 },
        { q: '¿Cuántos asteriscos había? ***** (5 asteriscos)', options: ['3', '4', '5', '6'], answer: 2 },
        { q: 'Recuerde: Lunes, Miércoles, Viernes. ¿Cuál era el segundo día?', options: ['Lunes', 'Miércoles', 'Viernes', 'Domingo'], answer: 1 },
        { q: '¿Cuál era el número del medio: 4, 8, 12, 8, 4?', options: ['8', '12', '4', '10'], answer: 1 }
    ];

    const atencionQuestions = [
        { q: 'Cuente cuántas veces aparece la letra "a" en: " banana amarilla atlas ancla"', options: ['6', '7', '8', '9'], answer: 2 },
        { q: '¿Cuántos errores hay? "El gato caminaba por la calle verde"', options: ['0', '1', '2', '3'], answer: 0 },
        { q: 'Encuentre el número diferente: 3, 3, 3, 5, 3, 3', options: ['Primer 3', '3 del medio', '5', 'Último 3'], answer: 2 },
        { q: 'Cuente las vocales: "AeIoUaeiou"', options: ['5', '6', '7', '10'], answer: 3 },
        { q: '¿Cuántos círculos hay en la palabra "COORDENADA"?', options: ['1', '2', '3', '4'], answer: 2 },
        { q: 'Encuentre el símbolo diferente: ★ ☆ ★ ★ ☆ ★ ★ ☆', options: ['Primer ★', 'Primer ☆', 'Todos son iguales', 'Último ☆'], answer: 1 },
        { q: 'Cuente las letras "s" en: "Sesenta y seis veces suena su salsa"', options: ['5', '6', '7', '8'], answer: 2 },
        { q: '¿Cuántos números pares hay? 1, 2, 3, 4, 5, 6, 7', options: ['2', '3', '4', '5'], answer: 1 },
        { q: 'Encuentre el patrón de errores: A-B-C-B-A-B-C-B-?', options: ['A', 'C', 'B', 'D'], answer: 0 },
        { q: 'Cuente las palabras con 4 letras: "el gato come pescado y duerme"', options: ['2', '3', '4', '5'], answer: 2 }
    ];

    const areas = ['verbal', 'numerica', 'logica', 'memoria', 'atencion'];
    const areaData = [verbalQuestions, numericaQuestions, logicaQuestions, memoriaQuestions, atencionQuestions];

    areas.forEach((area, ai) => {
        areaData[ai].forEach((item, i) => {
            DB.questions.push({
                id: DB.questions.length + 1,
                area: area,
                text: item.q,
                options: item.options,
                correctAnswer: item.answer,
                active: true
            });
        });
    });

    // Universities
    const unis = [
        { id: 1, name: 'Universidad de las Fuerzas Armadas (ESPE)', type: 'public' },
        { id: 2, name: 'Escuela Politécnica Nacional (EPN)', type: 'public' },
        { id: 3, name: 'Universidad Central del Ecuador (UCE)', type: 'public' },
        { id: 4, name: 'Universidad Técnica de Ambato (UTA)', type: 'public' },
        { id: 5, name: 'Universidad de Guayaquil (UG)', type: 'public' },
        { id: 6, name: 'Universidad Católica de Santiago de Guayaquil', type: 'private' },
        { id: 7, name: 'Universidad San Francisco de Quito (USFQ)', type: 'private' },
        { id: 8, name: 'Pontificia Universidad Católica del Ecuador (PUCE)', type: 'private' },
        { id: 9, name: 'Universidad de las Américas (UDLA)', type: 'private' },
        { id: 10, name: 'Universidad Indoamérica', type: 'private' }
    ];
    DB.universities = unis;

    // Careers
    const careerDefs = [
        { name: 'Ingeniería en Sistemas Computacionales', affinityAreas: { verbal: 0.5, numerica: 0.9, logica: 1.0, memoria: 0.6, atencion: 0.7 } },
        { name: 'Medicina', affinityAreas: { verbal: 0.6, numerica: 0.7, logica: 0.8, memoria: 0.9, atencion: 1.0 } },
        { name: 'Derecho', affinityAreas: { verbal: 1.0, numerica: 0.4, logica: 0.8, memoria: 0.7, atencion: 0.6 } },
        { name: 'Psicología', affinityAreas: { verbal: 0.9, numerica: 0.3, logica: 0.7, memoria: 0.8, atencion: 0.8 } },
        { name: 'Ingeniería Civil', affinityAreas: { verbal: 0.3, numerica: 0.9, logica: 0.9, memoria: 0.5, atencion: 0.6 } },
        { name: 'Administración de Empresas', affinityAreas: { verbal: 0.7, numerica: 0.8, logica: 0.6, memoria: 0.5, atencion: 0.5 } },
        { name: 'Arquitectura', affinityAreas: { verbal: 0.4, numerica: 0.7, logica: 0.8, memoria: 0.6, atencion: 0.9 } },
        { name: 'Contabilidad', affinityAreas: { verbal: 0.4, numerica: 1.0, logica: 0.7, memoria: 0.6, atencion: 0.8 } },
        { name: 'Comunicación Social', affinityAreas: { verbal: 1.0, numerica: 0.2, logica: 0.5, memoria: 0.6, atencion: 0.7 } },
        { name: 'Enfermería', affinityAreas: { verbal: 0.5, numerica: 0.5, logica: 0.6, memoria: 0.8, atencion: 0.9 } },
        { name: 'Economía', affinityAreas: { verbal: 0.5, numerica: 0.9, logica: 0.8, memoria: 0.4, atencion: 0.5 } },
        { name: 'Ingeniería Industrial', affinityAreas: { verbal: 0.4, numerica: 0.9, logica: 0.9, memoria: 0.5, atencion: 0.7 } },
        { name: 'Odontología', affinityAreas: { verbal: 0.3, numerica: 0.4, logica: 0.5, memoria: 0.7, atencion: 1.0 } },
        { name: 'Educación', affinityAreas: { verbal: 0.9, numerica: 0.4, logica: 0.6, memoria: 0.7, atencion: 0.8 } },
        { name: 'Bioquímica y Farmacia', affinityAreas: { verbal: 0.4, numerica: 0.7, logica: 0.8, memoria: 0.9, atencion: 0.7 } },
        { name: 'Ingeniería Electrónica', affinityAreas: { verbal: 0.3, numerica: 0.9, logica: 1.0, memoria: 0.5, atencion: 0.6 } },
        { name: 'Turismo', affinityAreas: { verbal: 0.8, numerica: 0.3, logica: 0.4, memoria: 0.6, atencion: 0.7 } },
        { name: 'Diseño Gráfico', affinityAreas: { verbal: 0.6, numerica: 0.3, logica: 0.6, memoria: 0.5, atencion: 0.9 } },
        { name: 'Ingeniería Ambiental', affinityAreas: { verbal: 0.4, numerica: 0.8, logica: 0.8, memoria: 0.6, atencion: 0.7 } },
        { name: 'Trabajo Social', affinityAreas: { verbal: 0.9, numerica: 0.2, logica: 0.5, memoria: 0.7, atencion: 0.8 } }
    ];

    let cId = 1;
    careerDefs.forEach(career => {
        const assignedUnis = unis.filter(() => Math.random() > 0.3);
        assignedUnis.forEach(uni => {
            DB.careers.push({
                id: cId++,
                name: career.name,
                universityId: uni.id,
                universityName: uni.name,
                universityType: uni.type,
                affinityAreas: career.affinityAreas
            });
        });
    });

    // Senecyt scores
    const periods = ['2023-I', '2023-II', '2024-I', '2024-II', '2025-I'];
    const careerNames = careerDefs.map(c => c.name);
    careerNames.forEach(career => {
        unis.forEach(uni => {
            periods.forEach(period => {
                DB.senecytScores.push({
                    career: career,
                    university: uni.name,
                    universityType: uni.type,
                    period: period,
                    minScore: Math.floor(Math.random() * 300) + 700,
                    maxScore: Math.floor(Math.random() * 200) + 900,
                    avgScore: Math.floor(Math.random() * 200) + 780
                });
            });
        });
    });

    // Save to localStorage
    saveDB();
}

/* ===== PERSISTENCE ===== */
function saveDB() {
    localStorage.setItem('orientau_db', JSON.stringify(DB));
}

function loadDB() {
    const data = localStorage.getItem('orientau_db');
    if (data) {
        const parsed = JSON.parse(data);
        Object.assign(DB, parsed);
        return true;
    }
    return false;
}

function resetDB() {
    localStorage.removeItem('orientau_db');
    DB.users = []; DB.questions = []; DB.careers = []; DB.universities = [];
    DB.senecytScores = []; DB.testResults = []; DB.accessLogs = []; DB.recoveryTokens = [];
    seedData();
}

/* ===== AUTH STATE ===== */
let currentUser = null;
let currentToken = null;

function getSession() {
    const token = sessionStorage.getItem('orientau_token');
    const userId = sessionStorage.getItem('orientau_user_id');
    if (token && userId) {
        const user = DB.users.find(u => u.id === parseInt(userId));
        if (user) {
            currentUser = user;
            currentToken = token;
            return true;
        }
    }
    return false;
}

function createSession(user) {
    const token = 'tok_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    currentUser = user;
    currentToken = token;
    sessionStorage.setItem('orientau_token', token);
    sessionStorage.setItem('orientau_user_id', user.id.toString());
}

function destroySession() {
    currentUser = null;
    currentToken = null;
    sessionStorage.removeItem('orientau_token');
    sessionStorage.removeItem('orientau_user_id');
}

/* ===== UTILITIES ===== */
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = `notification ${type}`;
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}

function hashPassword(pw) {
    let hash = 0;
    for (let i = 0; i < pw.length; i++) {
        const char = pw.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return 'h_' + Math.abs(hash).toString(36);
}

/* ===== INIT ===== */
function init() {
    if (!loadDB()) {
        seedData();
    }

    if (getSession()) {
        showApp();
    } else {
        showAuth();
    }

    setupAuthListeners();
}

/* ===== AUTH VIEWS ===== */
function showAuth() {
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('app-layout').classList.add('hidden');
    showView('view-login');
}

function showView(viewId) {
    document.querySelectorAll('#auth-container .auth-view').forEach(v => v.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
}

function setupAuthListeners() {
    // Navigation links
    document.getElementById('link-to-register').addEventListener('click', e => { e.preventDefault(); showView('view-register'); });
    document.getElementById('link-to-login').addEventListener('click', e => { e.preventDefault(); showView('view-login'); });
    document.getElementById('link-forgot-password').addEventListener('click', e => { e.preventDefault(); showView('view-recover'); });
    document.getElementById('link-back-login').addEventListener('click', e => { e.preventDefault(); showView('view-login'); });

    // Login
    document.getElementById('form-login').addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;
        const errorEl = document.getElementById('login-error');
        errorEl.classList.add('hidden');

        const user = DB.users.find(u => u.email.toLowerCase() === email);
        if (!user) {
            errorEl.textContent = 'Correo no registrado.';
            errorEl.classList.remove('hidden');
            return;
        }

        // Check lockout
        if (user.lockoutUntil && new Date(user.lockoutUntil) > new Date()) {
            const mins = Math.ceil((new Date(user.lockoutUntil) - new Date()) / 60000);
            errorEl.textContent = `Cuenta bloqueada. Intenta de nuevo en ${mins} minuto(s).`;
            errorEl.classList.remove('hidden');
            return;
        }

        if (user.password !== hashPassword(password)) {
            user.loginAttempts = (user.loginAttempts || 0) + 1;
            if (user.loginAttempts >= 3) {
                user.lockoutUntil = new Date(Date.now() + 10 * 60000).toISOString();
                user.loginAttempts = 0;
                errorEl.textContent = 'Demasiados intentos. Bloqueado por 10 minutos.';
            } else {
                errorEl.textContent = `Credenciales incorrectas. Intento ${user.loginAttempts}/3.`;
            }
            errorEl.classList.remove('hidden');
            saveDB();
            return;
        }

        user.loginAttempts = 0;
        user.lockoutUntil = null;
        saveDB();
        createSession(user);
        showApp();
        showNotification('Bienvenido, ' + user.name, 'success');
    });

    // Register
    document.getElementById('form-register').addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim().toLowerCase();
        const password = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-password-confirm').value;
        const errorEl = document.getElementById('register-error');
        const successEl = document.getElementById('register-success');
        errorEl.classList.add('hidden');
        successEl.classList.add('hidden');

        if (!validateEmail(email)) {
            errorEl.textContent = 'El correo no tiene un formato válido.';
            errorEl.classList.remove('hidden');
            return;
        }
        if (DB.users.find(u => u.email.toLowerCase() === email)) {
            errorEl.textContent = 'Este correo ya está registrado.';
            errorEl.classList.remove('hidden');
            return;
        }
        if (!validatePassword(password)) {
            errorEl.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.';
            errorEl.classList.remove('hidden');
            return;
        }
        if (password !== confirm) {
            errorEl.textContent = 'Las contraseñas no coinciden.';
            errorEl.classList.remove('hidden');
            return;
        }

        const newUser = {
            id: DB.users.length + 1,
            name, email,
            password: hashPassword(password),
            role: 'postulante',
            createdAt: new Date().toISOString()
        };
        DB.users.push(newUser);
        saveDB();

        successEl.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
        successEl.classList.remove('hidden');
        document.getElementById('form-register').reset();
        setTimeout(() => showView('view-login'), 2000);
    });

    // Recover password
    document.getElementById('form-recover').addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('recover-email').value.trim().toLowerCase();
        const errorEl = document.getElementById('recover-error');
        const successEl = document.getElementById('recover-success');
        errorEl.classList.add('hidden');
        successEl.classList.add('hidden');

        const user = DB.users.find(u => u.email.toLowerCase() === email);
        if (!user) {
            errorEl.textContent = 'No se encontró una cuenta con ese correo.';
            errorEl.classList.remove('hidden');
            return;
        }

        const token = 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        DB.recoveryTokens.push({
            token, userId: user.id,
            expiresAt: new Date(Date.now() + 30 * 60000).toISOString()
        });
        saveDB();

        successEl.textContent = 'Enlace de recuperación enviado (simulado). Redirigiendo...';
        successEl.classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('view-reset').dataset.token = token;
            showView('view-reset');
        }, 1500);
    });

    // Reset password
    document.getElementById('form-reset').addEventListener('submit', e => {
        e.preventDefault();
        const token = document.getElementById('view-reset').dataset.token;
        const newPass = document.getElementById('reset-new-password').value;
        const confirmPass = document.getElementById('reset-confirm-password').value;
        const errorEl = document.getElementById('reset-error');
        const successEl = document.getElementById('reset-success');
        errorEl.classList.add('hidden');
        successEl.classList.add('hidden');

        const tokenData = DB.recoveryTokens.find(t => t.token === token && new Date(t.expiresAt) > new Date());
        if (!tokenData) {
            errorEl.textContent = 'El enlace ha expirado o no es válido.';
            errorEl.classList.remove('hidden');
            return;
        }
        if (!validatePassword(newPass)) {
            errorEl.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.';
            errorEl.classList.remove('hidden');
            return;
        }
        if (newPass !== confirmPass) {
            errorEl.textContent = 'Las contraseñas no coinciden.';
            errorEl.classList.remove('hidden');
            return;
        }

        const user = DB.users.find(u => u.id === tokenData.userId);
        user.password = hashPassword(newPass);
        DB.recoveryTokens = DB.recoveryTokens.filter(t => t.token !== token);
        saveDB();

        successEl.textContent = 'Contraseña actualizada. Redirigiendo al login...';
        successEl.classList.remove('hidden');
        setTimeout(() => showView('view-login'), 2000);
    });

    // Logout
    document.getElementById('btn-logout').addEventListener('click', () => {
        destroySession();
        showAuth();
        showNotification('Sesión cerrada', 'info');
    });
}

/* ===== APP LAYOUT ===== */
function showApp() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-layout').classList.remove('hidden');

    document.getElementById('user-name-display').textContent = currentUser.name;
    document.getElementById('user-role-display').textContent = getRoleLabel(currentUser.role);

    buildNavigation();
    navigateTo(getDefaultPage());
}

function getRoleLabel(role) {
    const labels = { postulante: 'Postulante', counselor: 'Orientador', admin: 'Administrador' };
    return labels[role] || role;
}

function getDefaultPage() {
    switch (currentUser.role) {
        case 'postulante': return 'dashboard';
        case 'counselor': return 'counselor-dashboard';
        case 'admin': return 'admin-dashboard';
    }
}

function buildNavigation() {
    const menu = document.getElementById('nav-menu');
    menu.innerHTML = '';

    const navItems = {
        postulante: [
            { id: 'dashboard', label: 'Inicio', icon: '🏠' },
            { section: 'Evaluación' },
            { id: 'test', label: 'Test de Aptitudes', icon: '📝' },
            { id: 'grade', label: 'Ingresar Promedio', icon: '📊' },
            { section: 'Resultados' },
            { id: 'report', label: 'Informe de Afinidad', icon: '🎯' },
            { id: 'senecyt', label: 'Puntajes Senecyt', icon: '📈' }
        ],
        counselor: [
            { id: 'counselor-dashboard', label: 'Inicio', icon: '🏠' },
            { id: 'counselor-results', label: 'Resultados Estudiantes', icon: '👥' }
        ],
        admin: [
            { id: 'admin-dashboard', label: 'Inicio', icon: '🏠' },
            { section: 'Gestión' },
            { id: 'admin-questions', label: 'Preguntas del Test', icon: '❓' },
            { id: 'admin-careers', label: 'Carreras y Universidades', icon: '🎓' },
            { section: 'Usuarios' },
            { id: 'admin-users', label: 'Usuarios', icon: '👤' }
        ]
    };

    const items = navItems[currentUser.role] || [];
    items.forEach(item => {
        if (item.section) {
            const li = document.createElement('li');
            li.innerHTML = `<span class="nav-section-title">${item.section}</span>`;
            menu.appendChild(li);
        } else {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" data-page="${item.id}"><span>${item.icon}</span> ${item.label}</a>`;
            menu.appendChild(li);
        }
    });

    menu.querySelectorAll('a[data-page]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });

    document.getElementById('menu-toggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });
}

function navigateTo(page) {
    // Highlight nav
    document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-menu a[data-page="${page}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Render page
    const main = document.getElementById('main-content');
    switch (page) {
        case 'dashboard': renderStudentDashboard(main); break;
        case 'test': renderTest(main); break;
        case 'grade': renderGradeInput(main); break;
        case 'report': renderReport(main); break;
        case 'senecyt': renderSenecyt(main); break;
        case 'counselor-dashboard': renderCounselorDashboard(main); break;
        case 'counselor-results': renderCounselorResults(main); break;
        case 'admin-dashboard': renderAdminDashboard(main); break;
        case 'admin-questions': renderAdminQuestions(main); break;
        case 'admin-careers': renderAdminCareers(main); break;
        case 'admin-users': renderAdminUsers(main); break;
        default: renderStudentDashboard(main);
    }

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
}

/* ===== HELPER: Get user results ===== */
function getUserResults() {
    return DB.testResults.filter(r => r.userId === currentUser.id);
}

function getLatestResult() {
    const results = getUserResults();
    return results.length > 0 ? results[results.length - 1] : null;
}

function calculateAreaScore(area, answers) {
    const questions = DB.questions.filter(q => q.area === area && q.active);
    if (questions.length === 0) return 0;
    let correct = 0;
    questions.forEach((q, i) => {
        if (answers[i] === q.correctAnswer) correct++;
    });
    return Math.round((correct / questions.length) * 100);
}

/* ===== PAGE: STUDENT DASHBOARD ===== */
function renderStudentDashboard(container) {
    const results = getUserResults();
    const latest = getLatestResult();

    let html = `
        <div class="page-header">
            <h1>Mi Panel</h1>
            <p>Bienvenido, ${currentUser.name}</p>
        </div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Tests realizados</div>
                <div class="stat-value">${results.length}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Último puntaje</div>
                <div class="stat-value">${latest ? latest.totalScore + '%' : '—'}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Promedio de grado</div>
                <div class="stat-value">${latest && latest.gradeAverage ? latest.gradeAverage : '—'}</div>
            </div>
        </div>`;

    if (latest) {
        html += `
            <div class="card">
                <div class="card-header"><h2>Mi Último Resultado</h2></div>
                <div class="score-grid">
                    <div class="score-card verbal">
                        <div class="score-area">Verbal</div>
                        <div class="score-value">${latest.scores.verbal}</div>
                        <div class="score-max">/100</div>
                    </div>
                    <div class="score-card numerica">
                        <div class="score-area">Numérica</div>
                        <div class="score-value">${latest.scores.numerica}</div>
                        <div class="score-max">/100</div>
                    </div>
                    <div class="score-card logica">
                        <div class="score-area">Lógica</div>
                        <div class="score-value">${latest.scores.logica}</div>
                        <div class="score-max">/100</div>
                    </div>
                    <div class="score-card memoria">
                        <div class="score-area">Memoria</div>
                        <div class="score-value">${latest.scores.memoria}</div>
                        <div class="score-max">/100</div>
                    </div>
                    <div class="score-card atencion">
                        <div class="score-area">Atención</div>
                        <div class="score-value">${latest.scores.atencion}</div>
                        <div class="score-max">/100</div>
                    </div>
                </div>
            </div>`;
    } else {
        html += `
            <div class="card">
                <div class="empty-state">
                    <div class="empty-icon">📋</div>
                    <h3>Aún no has realizado el test</h3>
                    <p>Comienza tu test de aptitudes para ver tus resultados aquí.</p>
                    <br>
                    <button class="btn btn-primary" onclick="navigateTo('test')">Comenzar Test</button>
                </div>
            </div>`;
    }
    container.innerHTML = html;
}

/* ===== PAGE: TEST ===== */
let testState = {
    currentArea: null,
    currentQuestionIndex: 0,
    answers: {},  // { area: [answers] }
    completed: {},
    startTime: null
};

function renderTest(container) {
    const areas = [
        { id: 'verbal', name: 'Verbal', icon: '📖' },
        { id: 'numerica', name: 'Numérica', icon: '🔢' },
        { id: 'logica', name: 'Lógica', icon: '🧩' },
        { id: 'memoria', name: 'Memoria', icon: '🧠' },
        { id: 'atencion', name: 'Atención', icon: '👁️' }
    ];

    // Check if test was already completed
    const existingResult = DB.testResults.find(r => r.userId === currentUser.id);
    if (existingResult && existingResult.finalized) {
        container.innerHTML = `
            <div class="page-header">
                <h1>Test de Aptitudes</h1>
            </div>
            <div class="warning-box">
                Ya has finalizado el test. No es posible volver a realizarlo sin autorización del administrador.
            </div>
            <div class="card">
                <div class="empty-state">
                    <div class="empty-icon">🔒</div>
                    <h3>Test finalizado</h3>
                    <p>Consulta tu informe de afinidad académica para ver tus resultados.</p>
                    <br>
                    <button class="btn btn-primary" onclick="navigateTo('report')">Ver Informe</button>
                </div>
            </div>`;
        return;
    }

    // Initialize answers if not set
    areas.forEach(a => {
        if (!testState.answers[a.id]) testState.answers[a.id] = [];
    });

    if (!testState.currentArea) {
        // Show area selection
        renderTestSelection(container, areas);
    } else {
        renderTestQuestion(container, areas);
    }
}

function renderTestSelection(container, areas) {
    let html = `
        <div class="page-header">
            <h1>Test de Aptitudes</h1>
            <p>Selecciona un área para comenzar. Puedes completarlas en el orden que prefieras.</p>
        </div>
        <div class="info-box">
            El test consta de 5 áreas con 10 preguntas cada una. Tus respuestas se guardan automáticamente por sección.
        </div>
        <div class="test-area-selector">`;

    areas.forEach(area => {
        const questions = DB.questions.filter(q => q.area === area.id && q.active);
        const answered = testState.answers[area.id] ? testState.answers[area.id].filter(a => a !== undefined).length : 0;
        const isComplete = answered >= questions.length && questions.length > 0;

        if (isComplete) testState.completed[area.id] = true;

        html += `
            <div class="area-card ${testState.currentArea === area.id ? 'active' : ''} ${isComplete ? 'completed' : ''}" 
                 onclick="selectTestArea('${area.id}')">
                <div class="area-icon">${area.icon}</div>
                <div class="area-name">${area.name}</div>
                <div class="area-status">${isComplete ? '✅ Completado' : `${answered}/${questions.length} respondidas`}</div>
            </div>`;
    });

    html += `</div>`;

    const completedCount = Object.keys(testState.completed).length;
    if (completedCount === 5) {
        html += `
            <div class="card" style="text-align:center;">
                <h2 style="margin-bottom:12px;">¡Todas las áreas completadas!</h2>
                <p style="margin-bottom:20px;color:var(--gray-500);">Puedes finalizar el test para obtener tu puntaje.</p>
                <button class="btn btn-success btn-lg" onclick="finalizeTest()">Finalizar Test</button>
            </div>`;
    }

    html += `<br><button class="btn btn-outline" onclick="navigateTo('dashboard')">Volver al Panel</button>`;
    container.innerHTML = html;
}

function selectTestArea(areaId) {
    testState.currentArea = areaId;
    testState.currentQuestionIndex = 0;
    // Find first unanswered question
    const answers = testState.answers[areaId] || [];
    const questions = DB.questions.filter(q => q.area === areaId && q.active);
    const firstUnanswered = answers.findIndex((a, i) => a === undefined && i < questions.length);
    if (firstUnanswered >= 0) {
        testState.currentQuestionIndex = firstUnanswered;
    }
    navigateTo('test');
}

function renderTestQuestion(container, areas) {
    const area = areas.find(a => a.id === testState.currentArea);
    const questions = DB.questions.filter(q => q.area === testState.currentArea && q.active);
    const qi = testState.currentQuestionIndex;

    if (qi >= questions.length) {
        // Area completed
        testState.completed[testState.currentArea] = true;
        testState.currentArea = null;
        navigateTo('test');
        showNotification(`¡Área de ${area.name} completada!`, 'success');
        return;
    }

    const question = questions[qi];
    const answers = testState.answers[testState.currentArea];
    const progress = ((qi) / questions.length) * 100;

    let html = `
        <div class="page-header">
            <h1>${area.icon} Área ${area.name}</h1>
            <div style="display:flex;align-items:center;gap:16px;margin-top:8px;">
                <button class="btn btn-outline btn-sm" onclick="testState.currentArea=null;testState.currentQuestionIndex=0;navigateTo('test');">← Volver a áreas</button>
            </div>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
        <p style="text-align:center;color:var(--gray-500);margin-bottom:16px;">Pregunta ${qi + 1} de ${questions.length}</p>
        <div class="question-card">
            <div class="question-number">${area.name} — Pregunta ${qi + 1}</div>
            <div class="question-text">${question.text}</div>
            <div class="options-list">`;

    question.options.forEach((opt, i) => {
        const selected = answers[qi] === i;
        html += `
            <label class="option-item ${selected ? 'selected' : ''}">
                <input type="radio" name="q_${qi}" value="${i}" ${selected ? 'checked' : ''} 
                       onchange="saveAnswer('${testState.currentArea}', ${qi}, ${i})">
                <span>${opt}</span>
            </label>`;
    });

    html += `</div></div>
        <div style="display:flex;justify-content:space-between;margin-top:16px;">`;

    if (qi > 0) {
        html += `<button class="btn btn-outline" onclick="navigatePrevQuestion()">← Anterior</button>`;
    } else {
        html += `<div></div>`;
    }

    if (qi < questions.length - 1) {
        html += `<button class="btn btn-primary" onclick="navigateNextQuestion()">Siguiente →</button>`;
    } else {
        html += `<button class="btn btn-success" onclick="completeArea('${testState.currentArea}')">Finalizar área ✓</button>`;
    }

    html += `</div>`;
    container.innerHTML = html;
}

function saveAnswer(area, questionIndex, answer) {
    if (!testState.answers[area]) testState.answers[area] = [];
    testState.answers[area][questionIndex] = answer;
}

function navigateNextQuestion() {
    testState.currentQuestionIndex++;
    navigateTo('test');
}

function navigatePrevQuestion() {
    if (testState.currentQuestionIndex > 0) {
        testState.currentQuestionIndex--;
        navigateTo('test');
    }
}

function completeArea(areaId) {
    testState.completed[areaId] = true;
    testState.currentArea = null;
    navigateTo('test');
}

function finalizeTest() {
    const areas = ['verbal', 'numerica', 'logica', 'memoria', 'atencion'];
    const scores = {};

    areas.forEach(area => {
        scores[area] = calculateAreaScore(area, testState.answers[area] || []);
    });

    const totalScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 5);

    const result = {
        id: DB.testResults.length + 1,
        userId: currentUser.id,
        userName: currentUser.name,
        scores: scores,
        totalScore: totalScore,
        answers: JSON.parse(JSON.stringify(testState.answers)),
        finalized: true,
        gradeAverage: null,
        date: new Date().toISOString()
    };

    DB.testResults.push(result);
    saveDB();

    testState = { currentArea: null, currentQuestionIndex: 0, answers: {}, completed: {}, startTime: null };
    showNotification('¡Test finalizado! Revisa tu informe de afinidad.', 'success');
    navigateTo('report');
}

/* ===== PAGE: GRADE INPUT ===== */
function renderGradeInput(container) {
    const latest = getLatestResult();

    let html = `
        <div class="page-header">
            <h1>Ingresar Promedio de Grado</h1>
            <p>Ingresa tu promedio final para calcular tu puntaje referencial de postulación.</p>
        </div>
        <div class="warning-box">
            ⚠️ Este cálculo es referencial y no reemplaza el puntaje oficial obtenido en un examen de admisión institucional.
        </div>
        <div class="card">
            <div class="grade-input-section">
                <div class="form-group">
                    <label for="grade-input">Promedio final de grado (0 - 10)</label>
                    <input type="number" id="grade-input" min="0" max="10" step="0.01" 
                           placeholder="Ej: 8.50" value="${latest && latest.gradeAverage ? latest.gradeAverage : ''}">
                </div>
                <div id="grade-error" class="form-error hidden"></div>
                <button class="btn btn-primary btn-block" onclick="saveGradeAverage()">Calcular Puntaje Referencial</button>
            </div>
        </div>`;

    if (latest && latest.gradeAverage) {
        const refScore = calculateReferenceScore(latest.totalScore, latest.gradeAverage);
        html += `
            <div class="card">
                <div class="card-header"><h2>Puntaje Referencial</h2></div>
                <div class="grade-display">
                    <div class="grade-value">${refScore}</div>
                    <div class="grade-label">Puntaje referencial de postulación</div>
                </div>
                <p style="text-align:center;color:var(--gray-500);font-size:13px;margin-top:8px;">
                    Promedio: ${latest.gradeAverage} | Test: ${latest.totalScore}%
                </p>
            </div>`;
    }

    container.innerHTML = html;
}

function saveGradeAverage() {
    const input = document.getElementById('grade-input');
    const errorEl = document.getElementById('grade-error');
    const value = parseFloat(input.value);
    errorEl.classList.add('hidden');

    if (isNaN(value) || value < 0 || value > 10) {
        errorEl.textContent = 'El promedio debe estar entre 0 y 10.';
        errorEl.classList.remove('hidden');
        return;
    }

    const result = DB.testResults.find(r => r.userId === currentUser.id && r.finalized);
    if (!result) {
        errorEl.textContent = 'Primero debes completar el test de aptitudes.';
        errorEl.classList.remove('hidden');
        return;
    }

    result.gradeAverage = value;
    saveDB();
    showNotification('Promedio guardado correctamente.', 'success');
    navigateTo('grade');
}

function calculateReferenceScore(testPct, grade) {
    const gradePoints = grade * 100;
    return Math.round((testPct * 0.5) + (gradePoints * 0.5));
}

/* ===== PAGE: REPORT ===== */
function renderReport(container) {
    const latest = getLatestResult();

    if (!latest || !latest.finalized) {
        container.innerHTML = `
            <div class="page-header"><h1>Informe de Afinidad Académica</h1></div>
            <div class="card">
                <div class="empty-state">
                    <div class="empty-icon">📊</div>
                    <h3>Sin resultados disponibles</h3>
                    <p>Debes completar el test de aptitudes para generar tu informe.</p>
                    <br>
                    <button class="btn btn-primary" onclick="navigateTo('test')">Ir al Test</button>
                </div>
            </div>`;
        return;
    }

    // Calculate career affinities
    const recommendations = DB.careers.map(career => {
        let totalAffinity = 0;
        const areas = ['verbal', 'numerica', 'logica', 'memoria', 'atencion'];
        areas.forEach(area => {
            totalAffinity += (latest.scores[area] / 100) * career.affinityAreas[area];
        });
        const pct = Math.round((totalAffinity / 5) * 100);
        return { ...career, affinity: pct };
    }).sort((a, b) => b.affinity - a.affinity);

    const topRecommendations = recommendations.slice(0, 10);

    let html = `
        <div class="page-header">
            <h1>Informe de Afinidad Académica</h1>
            <p>Carreras y universidades recomendadas según tus resultados</p>
        </div>
        <div class="info-box">
            📋 Este informe es referencial y tiene como objetivo orientar tu decisión académica.
        </div>
        <div class="card">
            <div class="card-header"><h2>Tus Puntuaciones por Área</h2></div>
            <div class="score-grid">
                <div class="score-card verbal"><div class="score-area">Verbal</div><div class="score-value">${latest.scores.verbal}</div><div class="score-max">/100</div></div>
                <div class="score-card numerica"><div class="score-area">Numérica</div><div class="score-value">${latest.scores.numerica}</div><div class="score-max">/100</div></div>
                <div class="score-card logica"><div class="score-area">Lógica</div><div class="score-value">${latest.scores.logica}</div><div class="score-max">/100</div></div>
                <div class="score-card memoria"><div class="score-area">Memoria</div><div class="score-value">${latest.scores.memoria}</div><div class="score-max">/100</div></div>
                <div class="score-card atencion"><div class="score-area">Atención</div><div class="score-value">${latest.scores.atencion}</div><div class="score-max">/100</div></div>
            </div>
            <div class="bar-chart">
                ${['verbal', 'numerica', 'logica', 'memoria', 'atencion'].map(a => {
                    const colors = { verbal: '#2563eb', numerica: '#059669', logica: '#7c3aed', memoria: '#d97706', atencion: '#dc2626' };
                    return `<div class="bar-wrapper">
                        <div class="bar-value">${latest.scores[a]}</div>
                        <div class="bar" style="height:${latest.scores[a]}%;background:${colors[a]}"></div>
                        <div class="bar-label">${a.charAt(0).toUpperCase() + a.slice(1)}</div>
                    </div>`;
                }).join('')}
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h2>Carreras Recomendadas</h2>
                ${latest.gradeAverage ? `<span class="badge badge-primary">Puntaje referencial: ${calculateReferenceScore(latest.totalScore, latest.gradeAverage)}</span>` : ''}
            </div>
            <div class="recommendation-list">`;

    topRecommendations.forEach((rec, i) => {
        const unisForCareer = DB.universities.filter(u => {
            return DB.careers.some(c => c.name === rec.name && c.universityId === u.id);
        });
        html += `
            <div class="recommendation-item">
                <div class="recommendation-rank">${i + 1}</div>
                <div class="recommendation-info">
                    <h3>${rec.name}</h3>
                    <p>${unisForCareer.slice(0, 3).map(u => u.name).join(' • ')}</p>
                </div>
                <div class="recommendation-score">
                    <div class="score-label">Afinidad</div>
                    <div class="score-pct">${rec.affinity}%</div>
                </div>
            </div>`;
    });

    html += `</div></div>
        <div style="display:flex;gap:12px;">
            <button class="btn btn-primary" onclick="window.print()">🖨️ Imprimir Informe</button>
            <button class="btn btn-outline" onclick="downloadReport()">📥 Descargar</button>
        </div>`;

    container.innerHTML = html;
}

function downloadReport() {
    const latest = getLatestResult();
    if (!latest) return;

    let content = `INFORME DE AFINIDAD ACADÉMICA\n`;
    content += `Estudiante: ${currentUser.name}\n`;
    content += `Fecha: ${new Date(latest.date).toLocaleDateString()}\n\n`;
    content += `PUNTUACIONES POR ÁREA:\n`;
    content += `Verbal: ${latest.scores.verbal}/100\n`;
    content += `Numérica: ${latest.scores.numerica}/100\n`;
    content += `Lógica: ${latest.scores.logica}/100\n`;
    content += `Memoria: ${latest.scores.memoria}/100\n`;
    content += `Atención: ${latest.scores.atencion}/100\n`;
    content += `Total: ${latest.totalScore}%\n`;
    if (latest.gradeAverage) {
        content += `Promedio de grado: ${latest.gradeAverage}\n`;
        content += `Puntaje referencial: ${calculateReferenceScore(latest.totalScore, latest.gradeAverage)}\n`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `informe_afinidad_${currentUser.name.replace(/\s/g, '_')}.txt`;
    a.click();
}

/* ===== PAGE: SENECYT ===== */
function renderSenecyt(container) {
    const uniqueCareers = [...new Set(DB.senecytScores.map(s => s.career))];
    const uniqueUnis = [...new Set(DB.senecytScores.map(s => s.university))];
    const periods = [...new Set(DB.senecytScores.map(s => s.period))];

    let html = `
        <div class="page-header">
            <h1>Puntajes Referenciales Senecyt</h1>
            <p>Consulta los puntajes de ciclos anteriores por carrera e institución</p>
        </div>
        <div class="card">
            <div class="filters-bar">
                <div class="form-group">
                    <label>Carrera</label>
                    <select id="senecyt-career">
                        <option value="">Todas las carreras</option>
                        ${uniqueCareers.map(c => `<option value="${c}">${c}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Institución</label>
                    <select id="senecyt-uni">
                        <option value="">Todas las instituciones</option>
                        ${uniqueUnis.map(u => `<option value="${u}">${u}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Período</label>
                    <select id="senecyt-period">
                        <option value="">Todos los períodos</option>
                        ${periods.map(p => `<option value="${p}">${p}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" onclick="filterSenecyt()">Buscar</button>
                </div>
            </div>
            <div id="senecyt-results">
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Carrera</th>
                                <th>Institución</th>
                                <th>Tipo</th>
                                <th>Período</th>
                                <th>Mínimo</th>
                                <th>Promedio</th>
                                <th>Máximo</th>
                            </tr>
                        </thead>
                        <tbody id="senecyt-tbody">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;

    container.innerHTML = html;
    filterSenecyt();
}

function filterSenecyt() {
    const career = document.getElementById('senecyt-career').value;
    const uni = document.getElementById('senecyt-uni').value;
    const period = document.getElementById('senecyt-period').value;

    let filtered = DB.senecytScores.filter(s => {
        if (career && s.career !== career) return false;
        if (uni && s.university !== uni) return false;
        if (period && s.period !== period) return false;
        return true;
    });

    const tbody = document.getElementById('senecyt-tbody');

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--gray-500);">
            No se encontraron datos para la búsqueda realizada.
        </td></tr>`;
        return;
    }

    // Limit to 50 rows for performance
    const display = filtered.slice(0, 50);
    tbody.innerHTML = display.map(s => `
        <tr>
            <td>${s.career}</td>
            <td>${s.university}</td>
            <td><span class="badge ${s.universityType === 'public' ? 'badge-primary' : 'badge-warning'}">${s.universityType === 'public' ? 'Pública' : 'Privada'}</span></td>
            <td>${s.period}</td>
            <td>${s.minScore}</td>
            <td><strong>${s.avgScore}</strong></td>
            <td>${s.maxScore}</td>
        </tr>
    `).join('');

    if (filtered.length > 50) {
        tbody.innerHTML += `<tr><td colspan="7" style="text-align:center;padding:12px;color:var(--gray-400);">
            Mostrando 50 de ${filtered.length} resultados
        </td></tr>`;
    }
}

/* ===== PAGE: COUNSELOR DASHBOARD ===== */
function renderCounselorDashboard(container) {
    const allResults = DB.testResults.filter(r => r.finalized);

    container.innerHTML = `
        <div class="page-header">
            <h1>Panel del Orientador</h1>
            <p>Consulta y orienta a tus estudiantes</p>
        </div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Estudiantes con test</div>
                <div class="stat-value">${allResults.length}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Promedio general</div>
                <div class="stat-value">${allResults.length > 0 ? Math.round(allResults.reduce((a, r) => a + r.totalScore, 0) / allResults.length) + '%' : '—'}</div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h2>Últimos Resultados</h2></div>
            ${allResults.length === 0 ? '<div class="empty-state"><p>No hay resultados disponibles aún.</p></div>' : `
            <div class="table-container">
                <table>
                    <thead><tr><th>Estudiante</th><th>Fecha</th><th>Puntaje</th><th>Acciones</th></tr></thead>
                    <tbody>
                        ${allResults.slice(-10).reverse().map(r => `
                            <tr>
                                <td>${r.userName}</td>
                                <td>${new Date(r.date).toLocaleDateString()}</td>
                                <td><strong>${r.totalScore}%</strong></td>
                                <td><button class="btn btn-sm btn-outline" onclick="viewStudentReport(${r.id})">Ver informe</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>`}
        </div>`;
}

/* ===== PAGE: COUNSELOR RESULTS ===== */
function renderCounselorResults(container) {
    let html = `
        <div class="page-header">
            <h1>Resultados de Estudiantes</h1>
            <p>Busca por nombre o correo para ver los resultados de un estudiante</p>
        </div>
        <div class="card">
            <div class="form-group">
                <label for="counselor-search">Buscar estudiante (nombre o correo)</label>
                <div style="display:flex;gap:12px;">
                    <input type="text" id="counselor-search" placeholder="Escribe el nombre o correo...">
                    <button class="btn btn-primary" onclick="searchStudents()">Buscar</button>
                </div>
            </div>
            <div id="counselor-search-results"></div>
        </div>
        <div id="counselor-student-detail"></div>`;

    container.innerHTML = html;
}

function searchStudents() {
    const query = document.getElementById('counselor-search').value.trim().toLowerCase();
    const resultsEl = document.getElementById('counselor-search-results');

    if (!query) {
        resultsEl.innerHTML = '<p style="color:var(--gray-500);margin-top:12px;">Escribe un nombre o correo para buscar.</p>';
        return;
    }

    const results = DB.testResults.filter(r => {
        const user = DB.users.find(u => u.id === r.userId);
        if (!user) return false;
        return user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    });

    if (results.length === 0) {
        resultsEl.innerHTML = '<p style="color:var(--gray-500);margin-top:12px;">No se encontraron resultados para esa búsqueda.</p>';
        return;
    }

    resultsEl.innerHTML = `
        <div class="table-container" style="margin-top:16px;">
            <table>
                <thead><tr><th>Estudiante</th><th>Correo</th><th>Puntaje</th><th>Fecha</th><th>Acción</th></tr></thead>
                <tbody>
                    ${results.map(r => {
                        const user = DB.users.find(u => u.id === r.userId);
                        logAccess(`Orientador consultó resultados de ${user.name}`);
                        return `<tr>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td><strong>${r.totalScore}%</strong></td>
                            <td>${new Date(r.date).toLocaleDateString()}</td>
                            <td><button class="btn btn-sm btn-primary" onclick="viewStudentReport(${r.id})">Ver informe</button></td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>`;
}

function viewStudentReport(resultId) {
    const result = DB.testResults.find(r => r.id === resultId);
    if (!result) return;

    const detailEl = document.getElementById('counselor-student-detail') || document.getElementById('main-content');
    const user = DB.users.find(u => u.id === result.userId);

    // Calculate recommendations
    const recommendations = DB.careers.map(career => {
        let totalAffinity = 0;
        ['verbal', 'numerica', 'logica', 'memoria', 'atencion'].forEach(area => {
            totalAffinity += (result.scores[area] / 100) * career.affinityAreas[area];
        });
        return { ...career, affinity: Math.round((totalAffinity / 5) * 100) };
    }).sort((a, b) => b.affinity - a.affinity).slice(0, 5);

    let html = `
        <div class="card" style="margin-top:24px;">
            <div class="card-header">
                <h2>Informe de ${user.name}</h2>
                <span class="badge badge-primary">${user.email}</span>
            </div>
            <div class="score-grid">
                <div class="score-card verbal"><div class="score-area">Verbal</div><div class="score-value">${result.scores.verbal}</div></div>
                <div class="score-card numerica"><div class="score-area">Numérica</div><div class="score-value">${result.scores.numerica}</div></div>
                <div class="score-card logica"><div class="score-area">Lógica</div><div class="score-value">${result.scores.logica}</div></div>
                <div class="score-card memoria"><div class="score-area">Memoria</div><div class="score-value">${result.scores.memoria}</div></div>
                <div class="score-card atencion"><div class="score-area">Atención</div><div class="score-value">${result.scores.atencion}</div></div>
            </div>
            <h3 style="margin:16px 0 12px;">Top 5 Carreras Recomendadas</h3>
            <div class="recommendation-list">
                ${recommendations.map((rec, i) => `
                    <div class="recommendation-item">
                        <div class="recommendation-rank">${i + 1}</div>
                        <div class="recommendation-info">
                            <h3>${rec.name}</h3>
                            <p>${rec.universityName || ''}</p>
                        </div>
                        <div class="recommendation-score">
                            <div class="score-label">Afinidad</div>
                            <div class="score-pct">${rec.affinity}%</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>`;

    if (document.getElementById('counselor-student-detail')) {
        document.getElementById('counselor-student-detail').innerHTML = html;
    }
}

function logAccess(message) {
    DB.accessLogs.push({
        id: DB.accessLogs.length + 1,
        userId: currentUser.id,
        userName: currentUser.name,
        message: message,
        timestamp: new Date().toISOString()
    });
    saveDB();
}

/* ===== PAGE: ADMIN DASHBOARD ===== */
function renderAdminDashboard(container) {
    const totalUsers = DB.users.length;
    const totalQuestions = DB.questions.length;
    const activeQuestions = DB.questions.filter(q => q.active).length;
    const totalCareers = new Set(DB.careers.map(c => c.name)).size;
    const totalUnis = DB.universities.length;
    const totalResults = DB.testResults.length;

    container.innerHTML = `
        <div class="page-header">
            <h1>Panel de Administración</h1>
            <p>Vista general del sistema</p>
        </div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Usuarios registrados</div>
                <div class="stat-value">${totalUsers}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Preguntas activas</div>
                <div class="stat-value">${activeQuestions}/${totalQuestions}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Carreras</div>
                <div class="stat-value">${totalCareers}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Universidades</div>
                <div class="stat-value">${totalUnis}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Tests realizados</div>
                <div class="stat-value">${totalResults}</div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h2>Accesos Recientes</h2></div>
            ${DB.accessLogs.length === 0 ? '<p style="color:var(--gray-500);">No hay registros de acceso.</p>' : `
            <div class="table-container">
                <table>
                    <thead><tr><th>Usuario</th><th>Acción</th><th>Fecha/Hora</th></tr></thead>
                    <tbody>
                        ${DB.accessLogs.slice(-10).reverse().map(log => `
                            <tr>
                                <td>${log.userName}</td>
                                <td>${log.message}</td>
                                <td>${new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>`}
        </div>`;
}

/* ===== PAGE: ADMIN QUESTIONS ===== */
function renderAdminQuestions(container) {
    const areas = [
        { id: 'verbal', name: 'Verbal' },
        { id: 'numerica', name: 'Numérica' },
        { id: 'logica', name: 'Lógica' },
        { id: 'memoria', name: 'Memoria' },
        { id: 'atencion', name: 'Atención' }
    ];

    let html = `
        <div class="page-header">
            <h1>Gestión de Preguntas</h1>
            <p>Administra el banco de evaluaciones del test de aptitudes</p>
        </div>
        <div class="card">
            <div class="card-header">
                <h2>Preguntas del Test</h2>
                <button class="btn btn-primary" onclick="showQuestionModal()">+ Nueva Pregunta</button>
            </div>
            <div class="filters-bar">
                <div class="form-group">
                    <label>Filtrar por área</label>
                    <select id="filter-area" onchange="renderQuestionsTable()">
                        <option value="">Todas las áreas</option>
                        ${areas.map(a => `<option value="${a.id}">${a.name}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Área</th>
                            <th>Pregunta</th>
                            <th>Opciones</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="questions-tbody"></tbody>
                </table>
            </div>
        </div>`;

    container.innerHTML = html;
    renderQuestionsTable();
}

function renderQuestionsTable() {
    const filter = document.getElementById('filter-area').value;
    let questions = DB.questions.filter(q => !filter || q.area === filter);
    const tbody = document.getElementById('questions-tbody');

    const areaNames = { verbal: 'Verbal', numerica: 'Numérica', logica: 'Lógica', memoria: 'Memoria', atencion: 'Atención' };
    const hasBeenAnswered = (qId) => DB.testResults.some(r => r.answers && Object.values(r.answers).some(areaAnswers => areaAnswers[qId] !== undefined));

    tbody.innerHTML = questions.map(q => {
        const answered = hasBeenAnswered(q.id);
        return `<tr>
            <td>${q.id}</td>
            <td><span class="badge badge-primary">${areaNames[q.area]}</span></td>
            <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${q.text}</td>
            <td>${q.options.join(' | ')}</td>
            <td><span class="badge ${q.active ? 'badge-success' : 'badge-danger'}">${q.active ? 'Activa' : 'Inactiva'}</span></td>
            <td class="action-btns">
                <button class="btn btn-sm btn-outline" onclick="editQuestion(${q.id})">✏️</button>
                ${answered 
                    ? `<button class="btn btn-sm btn-outline" onclick="toggleQuestion(${q.id})" title="Desactivar">${q.active ? '🚫' : '✅'}</button>`
                    : `<button class="btn btn-sm btn-danger" onclick="deleteQuestion(${q.id})">🗑️</button>`
                }
            </td>
        </tr>`;
    }).join('');
}

function showQuestionModal(questionId = null) {
    const q = questionId ? DB.questions.find(x => x.id === questionId) : null;
    const areas = [
        { id: 'verbal', name: 'Verbal' },
        { id: 'numerica', name: 'Numérica' },
        { id: 'logica', name: 'Lógica' },
        { id: 'memoria', name: 'Memoria' },
        { id: 'atencion', name: 'Atención' }
    ];

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'question-modal';
    modal.innerHTML = `
        <div class="modal">
            <h2>${q ? 'Editar' : 'Nueva'} Pregunta</h2>
            <form id="form-question">
                <div class="form-group">
                    <label>Área de evaluación</label>
                    <select id="q-area" required>
                        <option value="">Seleccionar área...</option>
                        ${areas.map(a => `<option value="${a.id}" ${q && q.area === a.id ? 'selected' : ''}>${a.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Texto de la pregunta</label>
                    <textarea id="q-text" rows="2" required placeholder="Escribe la pregunta...">${q ? q.text : ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Opción 1</label>
                    <input type="text" id="q-opt0" required value="${q ? q.options[0] : ''}" placeholder="Opción correcta">
                </div>
                <div class="form-group">
                    <label>Opción 2</label>
                    <input type="text" id="q-opt1" required value="${q ? q.options[1] : ''}" placeholder="Opción 2">
                </div>
                <div class="form-group">
                    <label>Opción 3</label>
                    <input type="text" id="q-opt2" required value="${q ? q.options[2] : ''}" placeholder="Opción 3">
                </div>
                <div class="form-group">
                    <label>Opción 4</label>
                    <input type="text" id="q-opt3" required value="${q ? q.options[3] : ''}" placeholder="Opción 4">
                </div>
                <div class="form-group">
                    <label>Respuesta correcta</label>
                    <select id="q-correct" required>
                        <option value="0" ${q && q.correctAnswer === 0 ? 'selected' : ''}>Opción 1</option>
                        <option value="1" ${q && q.correctAnswer === 1 ? 'selected' : ''}>Opción 2</option>
                        <option value="2" ${q && q.correctAnswer === 2 ? 'selected' : ''}>Opción 3</option>
                        <option value="3" ${q && q.correctAnswer === 3 ? 'selected' : ''}>Opción 4</option>
                    </select>
                </div>
                <div class="form-error hidden" id="q-error"></div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">${q ? 'Guardar Cambios' : 'Crear Pregunta'}</button>
                </div>
            </form>
        </div>`;

    document.body.appendChild(modal);

    document.getElementById('form-question').addEventListener('submit', e => {
        e.preventDefault();
        const area = document.getElementById('q-area').value;
        const text = document.getElementById('q-text').value.trim();
        const opts = [0,1,2,3].map(i => document.getElementById(`q-opt${i}`).value.trim());
        const correct = parseInt(document.getElementById('q-correct').value);
        const errorEl = document.getElementById('q-error');
        errorEl.classList.add('hidden');

        if (!area || !text || opts.some(o => !o)) {
            errorEl.textContent = 'Todos los campos son obligatorios.';
            errorEl.classList.remove('hidden');
            return;
        }

        if (q) {
            q.area = area;
            q.text = text;
            q.options = opts;
            q.correctAnswer = correct;
        } else {
            DB.questions.push({
                id: DB.questions.length + 1,
                area, text, options: opts, correctAnswer: correct, active: true
            });
        }
        saveDB();
        closeModal();
        renderQuestionsTable();
        showNotification(q ? 'Pregunta actualizada.' : 'Pregunta creada.', 'success');
    });

    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

function editQuestion(id) {
    showQuestionModal(id);
}

function deleteQuestion(id) {
    if (confirm('¿Estás seguro de eliminar esta pregunta?')) {
        DB.questions = DB.questions.filter(q => q.id !== id);
        saveDB();
        renderQuestionsTable();
        showNotification('Pregunta eliminada.', 'info');
    }
}

function toggleQuestion(id) {
    const q = DB.questions.find(x => x.id === id);
    if (q) {
        q.active = !q.active;
        saveDB();
        renderQuestionsTable();
        showNotification(`Pregunta ${q.active ? 'activada' : 'desactivada'}.`, 'info');
    }
}

function closeModal() {
    const modal = document.getElementById('question-modal');
    if (modal) modal.remove();
}

/* ===== PAGE: ADMIN CAREERS ===== */
function renderAdminCareers(container) {
    const uniqueCareers = [...new Set(DB.careers.map(c => c.name))];
    const uniqueUnis = DB.universities;

    let html = `
        <div class="page-header">
            <h1>Gestión de Carreras y Universidades</h1>
            <p>Administra la oferta académica del sistema</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
            <div class="card">
                <div class="card-header">
                    <h2>Universidades</h2>
                    <button class="btn btn-primary btn-sm" onclick="showUniversityModal()">+ Nueva</button>
                </div>
                <div class="table-container">
                    <table>
                        <thead><tr><th>Nombre</th><th>Tipo</th><th>Acciones</th></tr></thead>
                        <tbody>
                            ${uniqueUnis.map(u => `
                                <tr>
                                    <td>${u.name}</td>
                                    <td><span class="badge ${u.type === 'public' ? 'badge-primary' : 'badge-warning'}">${u.type === 'public' ? 'Pública' : 'Privada'}</span></td>
                                    <td class="action-btns">
                                        <button class="btn btn-sm btn-outline" onclick="editUniversity(${u.id})">✏️</button>
                                        <button class="btn btn-sm btn-danger" onclick="deleteUniversity(${u.id})">🗑️</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2>Carreras</h2>
                    <button class="btn btn-primary btn-sm" onclick="showCareerModal()">+ Nueva</button>
                </div>
                <div class="table-container">
                    <table>
                        <thead><tr><th>Carrera</th><th>Universidad</th><th>Acciones</th></tr></thead>
                        <tbody>
                            ${DB.careers.slice(0, 30).map(c => `
                                <tr>
                                    <td>${c.name}</td>
                                    <td>${c.universityName}</td>
                                    <td class="action-btns">
                                        <button class="btn btn-sm btn-outline" onclick="editCareer(${c.id})">✏️</button>
                                        <button class="btn btn-sm btn-danger" onclick="deleteCareer(${c.id})">🗑️</button>
                                    </td>
                                </tr>
                            `).join('')}
                            ${DB.careers.length > 30 ? `<tr><td colspan="3" style="text-align:center;color:var(--gray-400);">Mostrando 30 de ${DB.careers.length}</td></tr>` : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;

    container.innerHTML = html;
}

function showUniversityModal(uniId = null) {
    const u = uniId ? DB.universities.find(x => x.id === uniId) : null;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'uni-modal';
    modal.innerHTML = `
        <div class="modal">
            <h2>${u ? 'Editar' : 'Nueva'} Universidad</h2>
            <form id="form-uni">
                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" id="uni-name" required value="${u ? u.name : ''}" placeholder="Nombre de la universidad">
                </div>
                <div class="form-group">
                    <label>Tipo</label>
                    <select id="uni-type" required>
                        <option value="public" ${u && u.type === 'public' ? 'selected' : ''}>Pública</option>
                        <option value="private" ${u && u.type === 'private' ? 'selected' : ''}>Privada</option>
                    </select>
                </div>
                <div class="form-error hidden" id="uni-error"></div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">${u ? 'Guardar' : 'Crear'}</button>
                </div>
            </form>
        </div>`;

    document.body.appendChild(modal);
    document.getElementById('form-uni').addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('uni-name').value.trim();
        const type = document.getElementById('uni-type').value;
        const errorEl = document.getElementById('uni-error');
        errorEl.classList.add('hidden');

        if (!name) {
            errorEl.textContent = 'El nombre es obligatorio.';
            errorEl.classList.remove('hidden');
            return;
        }

        if (u) {
            u.name = name;
            u.type = type;
        } else {
            DB.universities.push({ id: DB.universities.length + 1, name, type });
        }
        saveDB();
        closeModal();
        navigateTo('admin-careers');
        showNotification(u ? 'Universidad actualizada.' : 'Universidad creada.', 'success');
    });
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

function editUniversity(id) { showUniversityModal(id); }

function deleteUniversity(id) {
    if (confirm('¿Eliminar esta universidad y todas sus carreras asociadas?')) {
        DB.universities = DB.universities.filter(u => u.id !== id);
        DB.careers = DB.careers.filter(c => c.universityId !== id);
        saveDB();
        navigateTo('admin-careers');
        showNotification('Universidad eliminada.', 'info');
    }
}

function showCareerModal(careerId = null) {
    const c = careerId ? DB.careers.find(x => x.id === careerId) : null;
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'career-modal';
    modal.innerHTML = `
        <div class="modal">
            <h2>${c ? 'Editar' : 'Nueva'} Carrera</h2>
            <form id="form-career">
                <div class="form-group">
                    <label>Nombre de la carrera</label>
                    <input type="text" id="career-name" required value="${c ? c.name : ''}" placeholder="Ej: Ingeniería en Sistemas">
                </div>
                <div class="form-group">
                    <label>Universidad</label>
                    <select id="career-uni" required>
                        <option value="">Seleccionar universidad...</option>
                        ${DB.universities.map(u => `<option value="${u.id}" ${c && c.universityId === u.id ? 'selected' : ''}>${u.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-error hidden" id="career-error"></div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">${c ? 'Guardar' : 'Crear'}</button>
                </div>
            </form>
        </div>`;

    document.body.appendChild(modal);
    document.getElementById('form-career').addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('career-name').value.trim();
        const uniId = parseInt(document.getElementById('career-uni').value);
        const errorEl = document.getElementById('career-error');
        errorEl.classList.add('hidden');

        if (!name || !uniId) {
            errorEl.textContent = 'Todos los campos son obligatorios.';
            errorEl.classList.remove('hidden');
            return;
        }

        // Check duplicate
        const exists = DB.careers.some(x => x.name.toLowerCase() === name.toLowerCase() && x.universityId === uniId && (!c || x.id !== c.id));
        if (exists) {
            errorEl.textContent = 'Esta carrera ya existe en la universidad seleccionada.';
            errorEl.classList.remove('hidden');
            return;
        }

        const uni = DB.universities.find(u => u.id === uniId);
        if (c) {
            c.name = name;
            c.universityId = uniId;
            c.universityName = uni.name;
            c.universityType = uni.type;
        } else {
            DB.careers.push({
                id: DB.careers.length + 1,
                name, universityId: uniId,
                universityName: uni.name, universityType: uni.type,
                affinityAreas: { verbal: 0.5, numerica: 0.5, logica: 0.5, memoria: 0.5, atencion: 0.5 }
            });
        }
        saveDB();
        closeModal();
        navigateTo('admin-careers');
        showNotification(c ? 'Carrera actualizada.' : 'Carrera creada.', 'success');
    });
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

function editCareer(id) { showCareerModal(id); }

function deleteCareer(id) {
    if (confirm('¿Eliminar esta carrera?')) {
        DB.careers = DB.careers.filter(c => c.id !== id);
        saveDB();
        navigateTo('admin-careers');
        showNotification('Carrera eliminada.', 'info');
    }
}

/* ===== PAGE: ADMIN USERS ===== */
function renderAdminUsers(container) {
    let html = `
        <div class="page-header">
            <h1>Gestión de Usuarios</h1>
            <p>Administra los usuarios del sistema</p>
        </div>
        <div class="card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${DB.users.map(u => `
                            <tr>
                                <td>${u.id}</td>
                                <td>${u.name}</td>
                                <td>${u.email}</td>
                                <td><span class="badge ${u.role === 'admin' ? 'badge-danger' : u.role === 'counselor' ? 'badge-warning' : 'badge-primary'}">${getRoleLabel(u.role)}</span></td>
                                <td>${new Date(u.createdAt).toLocaleDateString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;

    container.innerHTML = html;
}

/* ===== START ===== */
init();
