import { getSeedData } from '../data/seedData';

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

const STORAGE_KEY = 'orientau_db';

export function loadDB() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    const parsed = JSON.parse(data);
    Object.keys(DB).forEach(key => { DB[key] = parsed[key] || []; });
    return true;
  }
  return false;
}

export function saveDB() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DB));
}

export function resetDB() {
  localStorage.removeItem(STORAGE_KEY);
  Object.keys(DB).forEach(key => { DB[key] = []; });
  const seed = getSeedData();
  Object.keys(seed).forEach(key => { DB[key] = seed[key]; });
  saveDB();
}

export function initDB() {
  if (!loadDB()) {
    resetDB();
  }
}

export default DB;
