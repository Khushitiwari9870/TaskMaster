import axios from 'axios';

// Build API base URL using the current host so the frontend works when accessed
// via the machine IP (e.g. http://172.31.182.178:3000)
const backendHost = window?.location?.hostname || 'localhost';
const primaryBaseUrl = `http://${backendHost}:8000/api/`;
const fallbackBaseUrls = [
  'http://127.0.0.1:8000/api/',
  'http://localhost:8000/api/',
].filter(url => url !== primaryBaseUrl);
const API = axios.create({ baseURL: primaryBaseUrl });

function getToken(){
  return localStorage.getItem('access');
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

API.interceptors.request.use(config => {
  const token = getToken();
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function isNetworkError(error) {
  return !error.response || error.message === 'Network Error' || error.code === 'ECONNREFUSED';
}

async function tryUrls(fn) {
  const urls = [primaryBaseUrl, ...fallbackBaseUrls];
  let lastError;

  for (const baseUrl of urls) {
    try {
      return await fn(baseUrl);
    } catch (error) {
      if (!isNetworkError(error)) {
        throw error;
      }
      lastError = error;
    }
  }

  throw lastError;
}

async function postWithFallback(path, data){
  return tryUrls(baseUrl => axios.post(`${baseUrl}${path}`, data));
}

async function getWithFallback(path){
  return tryUrls(baseUrl => axios.get(`${baseUrl}${path}`, { headers: getAuthHeaders() }));
}

export async function login(username, password){
  const res = await tryUrls(baseUrl => axios.post(`${baseUrl}auth/login/`, { username, password }));
  localStorage.setItem('access', res.data.access);
  localStorage.setItem('refresh', res.data.refresh);
  return res.data;
}

export async function register(data){
  const res = await postWithFallback('auth/register/', data);
  return res.data;
}

export async function getMe(){
  const token = getToken();
  if (!token) return null;

  try{
    const res = await getWithFallback('auth/me/');
    return res.data;
  }catch(e){
    // Token invalid or expired — clear storage to force re-login
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    return null;
  }
}

export async function getProjects(){
  const res = await API.get('projects/');
  return res.data;
}

export async function getProject(id){
  const res = await API.get(`projects/${id}/`);
  return res.data;
}

export async function createProject(payload){
  const res = await API.post('projects/', payload);
  return res.data;
}

export async function getNotifications(){
  const res = await getWithFallback('notifications/');
  return res.data;
}

export async function createNotification(payload){
  const res = await postWithFallback('notifications/', payload);
  return res.data;
}

export async function createTask(payload){
  const res = await API.post('tasks/', payload);
  return res.data;
}

export async function updateTask(id, payload){
  const res = await API.patch(`tasks/${id}/`, payload);
  return res.data;
}

export async function addComment(payload){
  const res = await API.post('comments/', payload);
  return res.data;
}

export default API;
