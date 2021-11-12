import axios from 'axios';

const base_url = 'http://localHost:3000';

export async function getAllQuestions() {
  const res = await axios.get(`${base_url}/info`);
  return res.data;
}
