import axios from 'axios';

// const base_url = 'http://localHost:3000';
const base_url = 'https://Job-Interview-Preperation.amirangel.repl.co';

export async function getAllQuestions(session = false) {
  const headers = { session };
  const res = await axios.get(`${base_url}/info`, { headers });
  return res.data;
}

export async function postQuestion(question) {
  const res = await axios.post(`${base_url}/create`, question);
  return res;
}

export async function getLeaderboard() {
  const res = await axios.get(`${base_url}/leaderboard/get`);
  return res.data;
}

export async function sumbitScore(name, score, session) {
  const res = await axios.post(`${base_url}/leaderboard`, {
    name,
    score,
    session,
  });
  return res;
}

export async function requestAdmin(password) {
  const res = await axios.post(`${base_url}/admin`, {
    password,
  });
  return res.data.auth;
}

export async function deleteQuestion(id, auth) {
  const res = await axios.delete(`${base_url}/remove`, {
    data: { id },
    headers: { auth },
  });
  return res;
}

export async function sendAnswer(id, answer, session) {
  const res = await axios.post(`${base_url}/check`, {
    id,
    answer,
    session,
  });
  return res;
}
