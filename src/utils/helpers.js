export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}

export function hashPassword(pw) {
  let hash = 0;
  for (let i = 0; i < pw.length; i++) {
    const char = pw.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'h_' + Math.abs(hash).toString(36);
}

export function getRoleLabel(role) {
  const labels = { postulante: 'Postulante', counselor: 'Orientador', admin: 'Administrador' };
  return labels[role] || role;
}

export function calculateAreaScore(area, answers, questions) {
  const areaQuestions = questions.filter(q => q.area === area && q.active);
  if (areaQuestions.length === 0) return 0;
  let correct = 0;
  areaQuestions.forEach((q, i) => {
    if (answers && answers[i] === q.correctAnswer) correct++;
  });
  return Math.round((correct / areaQuestions.length) * 100);
}

export function calculateReferenceScore(testPct, grade) {
  const gradePoints = grade * 100;
  return Math.round((testPct * 0.5) + (gradePoints * 0.5));
}

export function calculateCareerAffinity(scores, careerAffinity) {
  let total = 0;
  const areas = ['verbal', 'numerica', 'logica', 'memoria', 'atencion'];
  areas.forEach(area => {
    total += (scores[area] / 100) * careerAffinity[area];
  });
  return Math.round((total / 5) * 100);
}

export function logAccess(DB, currentUser, message) {
  DB.accessLogs.push({
    id: DB.accessLogs.length + 1,
    userId: currentUser.id,
    userName: currentUser.name,
    message,
    timestamp: new Date().toISOString()
  });
  saveDB();
}
