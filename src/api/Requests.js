import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:4000/api" });
const setHeaders = token => { return { headers: { authorization: `Bearer ${token}` } } };

const getChat = () => API.get("/chat")

const getNotes = (token) => API.get("/notes", setHeaders(token));
const createNote = (note, token) => API.post("/notes", note, setHeaders(token));
const deleteNote = (id, token) => API.delete(`/notes/${id}`, setHeaders(token));
const updateNote = (id, note, token) => API.put(`/notes/${id}`, note, setHeaders(token));

const getNotepad = (id, token) => API.get(`/notepad/${id}`, setHeaders(token));
const handleNotepad = (id, content, token) => API.post(`/notepad/${id}`, { content }, setHeaders(token));

const login = (form) => API.post("/users/login", form);
const signup = (form) => API.post("/users/signup", form);
const getUsers = () => API.get("/users/");

export { getChat, getNotes, createNote, deleteNote, updateNote, login, signup, getUsers, getNotepad, handleNotepad };