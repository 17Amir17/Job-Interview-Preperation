import axios from 'axios';

// const base_url = 'http://localHost:3000';
const base_url = 'https://fsinterview.herokuapp.com';

export async function getAllQuestions() {
  const res = await axios.get(`${base_url}/info`);
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

export async function sumbitScore(name, score) {
  const res = await axios.post(`${base_url}/leaderboard`, {
    name,
    score,
  });
  return res;
}

export async function requestAdmin(password) {
  const res = await axios.post(`${base_url}/admin`, {
    password,
  });
  return res.data.auth;
}

export async function deleteQuestion(id) {
  const res = await axios.delete(`${base_url}/remove`, {
    data: { id },
  });
  return res;
}
