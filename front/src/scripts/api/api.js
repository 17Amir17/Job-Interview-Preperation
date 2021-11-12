import axios from 'axios';

const base_url = 'http://localHost:3000';

export async function getAllQuestions() {
  const res = await axios.get(`${base_url}/info`);
  return res.data;
}

export async function postQuestion(question) {
  const res = await axios.post(`${base_url}/create`, question);
  return res;
}
