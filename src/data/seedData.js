import { hashPassword } from '../utils/helpers';

export const seedUsers = [
  {
    id: 1,
    name: 'Administrador',
    email: 'admin@orientau.com',
    password: hashPassword('admin123'),
    role: 'admin'
  },
  {
    id: 2,
    name: 'María López',
    email: 'orientador@orientau.com',
    password: hashPassword('orient123'),
    role: 'counselor'
  },
  {
    id: 3,
    name: 'Carlos Pérez',
    email: 'carlos@correo.com',
    password: hashPassword('carlos123'),
    role: 'postulante'
  }
];

export const seedQuestions = [
  // ==================== VERBAL (10 questions) ====================
  {
    id: 1,
    area: 'verbal',
    text: '¿Cuál es el sinónimo de "efímero"?',
    options: ['Duradero', 'Breve', 'Brillante', 'Amplio'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 2,
    area: 'verbal',
    text: 'Completar la analogía: Médico es a hospital como profesor es a ____.',
    options: ['Estudiante', 'Escuela', 'Libro', 'Conocimiento'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 3,
    area: 'verbal',
    text: '¿Cuál es el antónimo de "abundante"?',
    options: ['Escaso', 'Amplio', 'Numeroso', 'Suficiente'],
    correctAnswer: 0,
    active: true
  },
  {
    id: 4,
    area: 'verbal',
    text: '¿Qué significa la palabra "lucidez"?',
    options: ['Confusión', 'Claridad mental', 'Oscuridad', 'Velocidad'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 5,
    area: 'verbal',
    text: 'Completar: "No por mucho madrugar amanece más ____."',
    options: ['Rápido', 'Temprano', 'Claro', 'Caliente'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 6,
    area: 'verbal',
    text: '¿Cuál es el sinónimo de "meticuloso"?',
    options: ['Despreocupado', 'Detallista', 'Rápido', 'Simple'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 7,
    area: 'verbal',
    text: 'Completar la analogía: Calor es a frío como alegría es a ____.',
    options: ['Feliz', 'Tristeza', 'Risa', 'Diversión'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 8,
    area: 'verbal',
    text: '¿Qué significa "pragmático"?',
    options: ['Idealista', 'Práctico y realista', 'Poético', 'Temeroso'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 9,
    area: 'verbal',
    text: '¿Cuál es el antónimo de "generoso"?',
    options: ['Amable', 'Miserable', 'Bondadoso', 'Solidario'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 10,
    area: 'verbal',
    text: 'Completar la analogía: Avión es a cielo como submarino es a ____.',
    options: ['Tierra', 'Agua', 'Fuego', 'Arena'],
    correctAnswer: 1,
    active: true
  },

  // ==================== NUMÉRICA (10 questions) ====================
  {
    id: 11,
    area: 'numerica',
    text: '¿Cuál es el 25% de 280?',
    options: ['56', '70', '80', '65'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 12,
    area: 'numerica',
    text: 'Si un artículo cuesta $150 y tiene un descuento del 20%, ¿cuál es el precio final?',
    options: ['$130', '$120', '$125', '$115'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 13,
    area: 'numerica',
    text: '¿Qué número completa la secuencia: 3, 6, 12, 24, ____?',
    options: ['36', '48', '30', '42'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 14,
    area: 'numerica',
    text: 'Un triángulo tiene ángulos de 45° y 70°. ¿Cuál es el tercer ángulo?',
    options: ['65°', '75°', '55°', '80°'],
    correctAnswer: 0,
    active: true
  },
  {
    id: 15,
    area: 'numerica',
    text: 'Si 3x + 7 = 22, ¿cuál es el valor de x?',
    options: ['3', '5', '7', '4'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 16,
    area: 'numerica',
    text: '¿Cuánto es 1.5 × 2.4?',
    options: ['3.2', '3.6', '3.4', '3.8'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 17,
    area: 'numerica',
    text: 'Un auto viaja a 80 km/h. ¿Qué distancia recorre en 2.5 horas?',
    options: ['180 km', '200 km', '220 km', '150 km'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 18,
    area: 'numerica',
    text: '¿Cuál es el resultado de: (-5) + 8 - 3 + (-2)?',
    options: ['-2', '0', '2', '-1'],
    correctAnswer: 0,
    active: true
  },
  {
    id: 19,
    area: 'numerica',
    text: 'Si la relación es 3:5, ¿cuánto es el valor de x cuando 3/5 = x/45?',
    options: ['25', '27', '30', '35'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 20,
    area: 'numerica',
    text: '¿Cuál es la raíz cuadrada de 144?',
    options: ['14', '12', '11', '13'],
    correctAnswer: 1,
    active: true
  },

  // ==================== LÓGICA (10 questions) ====================
  {
    id: 21,
    area: 'logica',
    text: 'Si todos los gatos son animales ySome animals son perros, ¿puede concluirse que todos los gatos son perros?',
    options: ['Sí, siempre', 'No, nunca', 'Solo algunos', 'No se puede concluir'],
    correctAnswer: 3,
    active: true
  },
  {
    id: 22,
    area: 'logica',
    text: 'En una carrera, si Ana está adelante de Luis, Luis está adelante de Pedro, y Pedro está adelante de María. ¿Quién va último?',
    options: ['Ana', 'Luis', 'Pedro', 'María'],
    correctAnswer: 3,
    active: true
  },
  {
    id: 23,
    area: 'logica',
    text: '¿Qué patrón sigue la secuencia: J, F, M, A, M, J, ____?',
    options: ['J (Julio)', 'A (Agosto)', 'S (Septiembre)', 'J (Junio)'],
    correctAnswer: 0,
    active: true
  },
  {
    id: 24,
    area: 'logica',
    text: 'Si "A" = 1, "B" = 2, etc., ¿cuál es la suma de las posiciones de las letras de "CASA"?',
    options: ['38', '40', '36', '42'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 25,
    area: 'logica',
    text: 'Un reloj se atrasa 3 minutos cada hora. Si está bien a las 12:00, ¿qué hora marcará a las 18:00?',
    options: ['17:42', '17:45', '17:48', '17:30'],
    correctAnswer: 0,
    active: true
  },
  {
    id: 26,
    area: 'logica',
    text: 'Si hoy es martes, ¿qué día será dentro de 100 días?',
    options: ['Martes', 'Miércoles', 'Jueves', 'Lunes'],
    correctAnswer: 2,
    active: true
  },
  {
    id: 27,
    area: 'logica',
    text: '¿Qué figura completa el patrón: △, □, ○, △, □, ____?',
    options: ['△', '□', '○', '◇'],
    correctAnswer: 2,
    active: true
  },
  {
    id: 28,
    area: 'logica',
    text: 'Si el doble de un número menos 4 es igual a 10, ¿cuál es el número?',
    options: ['7', '9', '5', '6'],
    correctAnswer: 0,
    active: true
  },
  {
    id: 29,
    area: 'logica',
    text: 'En una mesa hay 5 vasos boca abajo. Si le das la vuelta a 3, ¿cuántos vasos quedan boca abajo?',
    options: ['2', '3', '5', '8'],
    correctAnswer: 0,
    active: true
  },
  {
    id: 30,
    area: 'logica',
    text: '¿Qué número falta: 2, 6, 12, 20, 30, ____?',
    options: ['40', '42', '36', '44'],
    correctAnswer: 1,
    active: true
  },

  // ==================== MEMORIA (10 questions) ====================
  {
    id: 31,
    area: 'memoria',
    text: 'Observa la secuencia por 10 segundos: 7-3-9-1-5. ¿Cuál era el tercer número?',
    options: ['3', '9', '1', '7'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 32,
    area: 'memoria',
    text: 'Observa: rojo-azul-verde-amarillo-blanco. ¿Qué color estaba en la posición 2?',
    options: ['Rojo', 'Azul', 'Verde', 'Amarillo'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 33,
    area: 'memoria',
    text: 'Lee la lista: mesa, silla, lámpara, reloj, flor. Sin mirar, ¿cuál era el último objeto?',
    options: ['Reloj', 'Lámpara', 'Flor', 'Silla'],
    correctAnswer: 2,
    active: true
  },
  {
    id: 34,
    area: 'memoria',
    text: 'Observa: Madrid-Bogotá-Lima-Quito-Caracas. ¿Qué ciudad estaba entre Lima y Caracas?',
    options: ['Bogotá', 'Quito', 'Madrid', 'Lima'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 35,
    area: 'memoria',
    text: 'Secuencia de números: 45-12-78-34-56. ¿Cuál es la suma del primero y el último?',
    options: ['90', '101', '78', '89'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 36,
    area: 'memoria',
    text: 'Observa: perro-gato-pájaro-tortuga-pez. Si eliminas el segundo, ¿cuál queda en su lugar?',
    options: ['Pájaro', 'Gato', 'Tortuga', 'Perro'],
    correctAnswer: 0,
    active: true
  },
  {
    id: 37,
    area: 'memoria',
    text: 'Secuencia: ♠-♥-♦-♣-♠. ¿Qué palo aparece dos veces?',
    options: ['Corazón', 'Diamante', 'Trebol', 'Pica'],
    correctAnswer: 3,
    active: true
  },
  {
    id: 38,
    area: 'memoria',
    text: 'Lista de colores: cyan-magenta-amarillo-negro-blanco. ¿Cuál es el color en posición 3?',
    options: ['Magenta', 'Cyan', 'Amarillo', 'Negro'],
    correctAnswer: 2,
    active: true
  },
  {
    id: 39,
    area: 'memoria',
    text: 'Observa: Enero-Marzo-Mayo-Julio-Septiembre. ¿Qué mes falta en la secuencia de impares?',
    options: ['Febrero', 'Noviembre', 'Junio', 'Ninguno'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 40,
    area: 'memoria',
    text: 'Secuencia: 10-20-40-80-160. ¿Cuál era el valor del tercer número?',
    options: ['20', '40', '80', '160'],
    correctAnswer: 1,
    active: true
  },

  // ==================== ATENCIÓN (10 questions) ====================
  {
    id: 41,
    area: 'atencion',
    text: '¿Cuántas veces aparece la letra "r" en: "María corre rápidamente por el río"?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    active: true
  },
  {
    id: 42,
    area: 'atencion',
    text: 'Encuentra el error: 3, 6, 9, 12, 14, 18, 21. ¿Qué número está mal?',
    options: ['6', '12', '14', '21'],
    correctAnswer: 2,
    active: true
  },
  {
    id: 43,
    area: 'atencion',
    text: '¿Cuántos triángulos hay en una estrella de 5 puntas formada por líneas que conectan los vértices?',
    options: ['5', '10', '15', '20'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 44,
    area: 'atencion',
    text: '¿Cuántas vocales hay en la frase: "Ecuador es un país hermoso"?',
    options: ['10', '11', '12', '13'],
    correctAnswer: 2,
    active: true
  },
  {
    id: 45,
    area: 'atencion',
    text: 'Secuencia con error: A-B-C-D-F-G-H. ¿Qué letra falta?',
    options: ['C', 'E', 'D', 'F'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 46,
    area: 'atencion',
    text: 'En la serie 2-4-6-8-10-11-14-16, ¿cuál es el número incorrecto?',
    options: ['6', '10', '11', '14'],
    correctAnswer: 2,
    active: true
  },
  {
    id: 47,
    area: 'atencion',
    text: '¿Cuántas palabras hay en: "El estudiante brillante aprobó el examen difícil de matemáticas"?',
    options: ['7', '8', '9', '10'],
    correctAnswer: 1,
    active: true
  },
  {
    id: 48,
    area: 'atencion',
    text: 'Observa: 1-1-2-3-5-8-13. ¿Qué número está fuera de la secuencia de Fibonacci?',
    options: ['1', '5', '8', 'Ninguno'],
    correctAnswer: 3,
    active: true
  },
  {
    id: 49,
    area: 'atencion',
    text: '¿Cuántas consonantes tiene la palabra "INSTITUTO"?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 3,
    active: true
  },
  {
    id: 50,
    area: 'atencion',
    text: 'Secuencia con error: lunes-martes-miércoles-jueves-viernes-domingo. ¿Qué día falta?',
    options: ['Lunes', 'Sábado', 'Domingo', 'Miércoles'],
    correctAnswer: 1,
    active: true
  }
];

export const seedUniversities = [
  { id: 1, name: 'ESPE', type: 'public' },
  { id: 2, name: 'EPN', type: 'public' },
  { id: 3, name: 'UCE', type: 'public' },
  { id: 4, name: 'UTA', type: 'public' },
  { id: 5, name: 'UG', type: 'public' },
  { id: 6, name: 'UCSG', type: 'private' },
  { id: 7, name: 'USFQ', type: 'private' },
  { id: 8, name: 'PUCE', type: 'private' },
  { id: 9, name: 'UDLA', type: 'private' },
  { id: 10, name: 'Indoamérica', type: 'private' }
];

export const seedCareers = [
  {
    id: 1,
    name: 'Ingeniería en Sistemas',
    affinityAreas: { verbal: 0.4, numerica: 0.9, logica: 0.95, memoria: 0.6, atencion: 0.7 },
    universities: [1, 2, 4, 6, 9]
  },
  {
    id: 2,
    name: 'Medicina',
    affinityAreas: { verbal: 0.5, numerica: 0.7, logica: 0.8, memoria: 0.95, atencion: 0.9 },
    universities: [1, 3, 6, 7, 8]
  },
  {
    id: 3,
    name: 'Derecho',
    affinityAreas: { verbal: 0.95, numerica: 0.3, logica: 0.85, memoria: 0.8, atencion: 0.7 },
    universities: [3, 5, 7, 8, 10]
  },
  {
    id: 4,
    name: 'Psicología',
    affinityAreas: { verbal: 0.9, numerica: 0.4, logica: 0.75, memoria: 0.85, atencion: 0.8 },
    universities: [3, 7, 8, 10]
  },
  {
    id: 5,
    name: 'Ingeniería Civil',
    affinityAreas: { verbal: 0.3, numerica: 0.95, logica: 0.9, memoria: 0.5, atencion: 0.6 },
    universities: [1, 2, 4, 5, 6]
  },
  {
    id: 6,
    name: 'Administración',
    affinityAreas: { verbal: 0.7, numerica: 0.75, logica: 0.7, memoria: 0.6, atencion: 0.65 },
    universities: [1, 3, 5, 6, 9, 10]
  },
  {
    id: 7,
    name: 'Arquitectura',
    affinityAreas: { verbal: 0.5, numerica: 0.8, logica: 0.85, memoria: 0.6, atencion: 0.75 },
    universities: [2, 5, 6, 7, 9]
  },
  {
    id: 8,
    name: 'Contabilidad',
    affinityAreas: { verbal: 0.4, numerica: 0.9, logica: 0.8, memoria: 0.7, atencion: 0.85 },
    universities: [1, 3, 5, 6, 9, 10]
  },
  {
    id: 9,
    name: 'Comunicación Social',
    affinityAreas: { verbal: 0.95, numerica: 0.3, logica: 0.5, memoria: 0.6, atencion: 0.7 },
    universities: [3, 7, 8, 10]
  },
  {
    id: 10,
    name: 'Enfermería',
    affinityAreas: { verbal: 0.5, numerica: 0.6, logica: 0.65, memoria: 0.9, atencion: 0.95 },
    universities: [1, 3, 4, 8]
  },
  {
    id: 11,
    name: 'Economía',
    affinityAreas: { verbal: 0.6, numerica: 0.9, logica: 0.85, memoria: 0.5, atencion: 0.6 },
    universities: [3, 5, 6, 7]
  },
  {
    id: 12,
    name: 'Ingeniería Industrial',
    affinityAreas: { verbal: 0.4, numerica: 0.9, logica: 0.9, memoria: 0.55, atencion: 0.7 },
    universities: [1, 2, 4, 5, 6, 9]
  },
  {
    id: 13,
    name: 'Odontología',
    affinityAreas: { verbal: 0.4, numerica: 0.6, logica: 0.7, memoria: 0.85, atencion: 0.95 },
    universities: [1, 3, 8]
  },
  {
    id: 14,
    name: 'Educación',
    affinityAreas: { verbal: 0.9, numerica: 0.5, logica: 0.65, memoria: 0.8, atencion: 0.75 },
    universities: [3, 4, 5, 8, 10]
  },
  {
    id: 15,
    name: 'Bioquímica',
    affinityAreas: { verbal: 0.45, numerica: 0.8, logica: 0.85, memoria: 0.8, atencion: 0.7 },
    universities: [1, 3, 7]
  },
  {
    id: 16,
    name: 'Electrónica',
    affinityAreas: { verbal: 0.3, numerica: 0.9, logica: 0.95, memoria: 0.55, atencion: 0.8 },
    universities: [2, 4, 6]
  },
  {
    id: 17,
    name: 'Turismo',
    affinityAreas: { verbal: 0.8, numerica: 0.5, logica: 0.5, memoria: 0.65, atencion: 0.7 },
    universities: [3, 5, 10]
  },
  {
    id: 18,
    name: 'Diseño Gráfico',
    affinityAreas: { verbal: 0.65, numerica: 0.55, logica: 0.7, memoria: 0.6, atencion: 0.85 },
    universities: [7, 9, 10]
  },
  {
    id: 19,
    name: 'Ingeniería Ambiental',
    affinityAreas: { verbal: 0.4, numerica: 0.85, logica: 0.8, memoria: 0.6, atencion: 0.75 },
    universities: [1, 2, 4, 5]
  },
  {
    id: 20,
    name: 'Trabajo Social',
    affinityAreas: { verbal: 0.85, numerica: 0.35, logica: 0.6, memoria: 0.7, atencion: 0.8 },
    universities: [3, 5, 8, 10]
  }
];

export const seedSenecytScores = (() => {
  const scores = [];
  const periods = ['2023-I', '2023-II', '2024-I', '2024-II', '2025-I'];
  const careers = seedCareers;
  let id = 1;

  careers.forEach(career => {
    career.universities.forEach(uniId => {
      const university = seedUniversities.find(u => u.id === uniId);
      const baseMin = 700 + Math.floor(Math.random() * 50);
      const baseMax = 850 + Math.floor(Math.random() * 50);

      periods.forEach(period => {
        const variance = Math.floor(Math.random() * 20) - 10;
        const minScore = baseMin + variance;
        const maxScore = baseMax + variance;
        const avgScore = Math.round((minScore + maxScore) / 2);

        scores.push({
          id: id++,
          careerId: career.id,
          universityId: uniId,
          universityName: university.name,
          period,
          minScore,
          maxScore,
          avgScore
        });
      });
    });
  });

  return scores;
})();

export function getSeedData() {
  return {
    users: [...seedUsers],
    questions: [...seedQuestions],
    careers: [...seedCareers],
    universities: [...seedUniversities],
    senecytScores: [...seedSenecytScores],
    testResults: [],
    accessLogs: [],
    recoveryTokens: []
  };
}
